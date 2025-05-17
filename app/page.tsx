import MainPage from "./(main)/main-page";
import { getData } from "@/active/reviews";
import { categories } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Places = await getData();
export default function Home() {
  return <MainPage Places={Places} categories={categories} />;
}
