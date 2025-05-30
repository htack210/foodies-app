"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return typeof text !== "string" || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (isInvalidText(meal.title)) {
    return { message: "Please enter a title for your meal." };
  }
  if (isInvalidText(meal.summary)) {
    return { message: "Please enter a summary for your meal." };
  }
  if (isInvalidText(meal.instructions)) {
    return { message: "Please enter instructions for your meal." };
  }
  if (isInvalidText(meal.creator)) {
    return { message: "Please enter your name." };
  }
  if (isInvalidText(meal.creator_email)) {
    return { message: "Please enter your email." };
  }
  if (!meal.creator_email.includes("@")) {
    return { message: "Please enter a valid email address." };
  }
  if (!meal.image || meal.image.size === 0) {
    return { message: "Please pick an image for your meal." };
  }

  /** In production, images in the public folder are ignored. So, when a new meal is created, the image will be broken.
   * To get around this you need to use a 3rd-party solution like AWS S3, or refresh the build and start prod again.
   * That is outside the scope of this project right now.**/
  await saveMeal(meal);
  revalidatePath("/meals"); //Revalidates the meals page to show the new meal
  redirect("/meals"); //Redirects user
}

export async function updateMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  const org = {
    title: formData.get("org_title"),
    summary: formData.get("org_summary"),
    instructions: formData.get("org_instructions"),
    image: formData.get("org_image"),
    creator: formData.get("org_name"),
    creator_email: formData.get("org_email"),
  };

  // Check for blanks
  for (const key in meal) {
    if (typeof meal[key] === "string" && meal[key].trim() === "") {
      return { message: `Please enter a value for ${key}.` };
    }
  }

  // Check if anything changed
  let changed = false;
  for (const key in meal) {
    if (meal[key] !== original[key]) {
      changed = true;
      break;
    }
  }
  if (!changed) {
    return { message: "No changes detected." };
  }

  await updateMealData({ ...original, ...meal }); // Merge changes
}
