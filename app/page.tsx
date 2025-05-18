import MainPage from "./(main)/main-page";
import { getData } from "@/active/reviews";
import { categories } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const Places = await getData();
  return <MainPage Places={Places} categories={categories} />;
}
