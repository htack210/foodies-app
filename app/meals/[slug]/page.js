import Image from "next/image";
import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
import MealDetailsClient from "@/components/meals/meal-details-client";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);
  if (meal) {
    return {
      title: meal.title,
      description: meal.summary,
    };
  } else {
    notFound();
  }

  return {};
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.slug);
  const { header, image, headerText, creator, summary, instructions, loading } =
    classes;

  if (!meal) {
    notFound();
  }
  return <MealDetailsClient meal={meal} />;
}
