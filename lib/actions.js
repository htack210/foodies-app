"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return typeof text !== "string" || text.trim() === "";
}

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (isInvalidText(meal.title)) {
    throw new Error("Title is required.");
  }
  if (isInvalidText(meal.summary)) {
    throw new Error("Summary is required.");
  }
  if (isInvalidText(meal.instructions)) {
    throw new Error("Instructions are required.");
  }
  if (isInvalidText(meal.creator)) {
    throw new Error("Your name is required.");
  }
  if (isInvalidText(meal.creator_email) || !meal.creator_email.includes("@")) {
    throw new Error("A valid email is required.");
  }
  if (!meal.image || meal.image.size === 0) {
    throw new Error("An image is required.");
  }

  await saveMeal(meal);
  redirect("/meals"); //Redirects user
}
