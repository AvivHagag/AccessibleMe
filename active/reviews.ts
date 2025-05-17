"use server";

import { db } from "@/lib/db";
import { Review } from "@/lib/types";

function clampRating(rating: number): number {
  const roundedToHalf = Math.round(rating * 2) / 2;
  return Math.min(Math.max(roundedToHalf, 1), 5);
}

export async function createReview(review: Review) {
  const existingPlace = await db.place.findUnique({
    where: { id: review.id },
    include: { reviews: true },
  });

  if (existingPlace) {
    const newReview = await db.review.create({
      data: {
        placeId: review.id,
        rating: clampRating(review.overallRating),
        comment: review.comment,
        author: review.author,
        createdAt: review.date,
        accessibilityFeatures: review.accessibilityFeatures,
      },
    });

    const allReviews = [...existingPlace.reviews, newReview];
    const newOverallRating = clampRating(
      allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length
    );

    await db.place.update({
      where: { id: review.id },
      data: { overallRating: newOverallRating },
    });

    return newReview;
  } else {
    const newPlace = await db.place.create({
      data: {
        id: review.id,
        name: review.placeName,
        placeTypes: [review.placeType],
        address: review.address,
        overallRating: clampRating(review.overallRating),
        description: review.description,
        image: review.image,
        reviews: {
          create: {
            rating: clampRating(review.overallRating),
            comment: review.comment,
            author: review.author,
            createdAt: review.date,
            accessibilityFeatures: review.accessibilityFeatures,
          },
        },
      },
      include: {
        reviews: true,
      },
    });

    return newPlace.reviews[0];
  }
}

export async function getData() {
  const Places = await db.place.findMany({
    include: {
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return Places;
}
