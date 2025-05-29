import { Suspense } from "react";
import Link from "next/link";

import mealClasses from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description: "Browse thg delicious meals, shared by a food-loving community.",
};


const { header, highlight, cta, loading, main } = mealClasses;

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={header}>
        <h1>
          Delicious meals, created <span className={highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun.
          (Plus, I ain&apos;t your mama!)
        </p>
        <p className={cta}>
          <Link href="/meals/share">Share your favorite recipes</Link>
        </p>
      </header>
      <main className={main}>
        <Suspense fallback={<p className={loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
