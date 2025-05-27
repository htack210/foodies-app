import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals where slug = ?").get(slug);
}

export function saveMeal(meal) {
  // Turn meal title into a slug, and for lowercase.
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize user input to prevent cross-site scripting
  meal.instructions = xss(meal.instructions);
}
