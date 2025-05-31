import crypto from "node:crypto";
import fs from "node:fs";

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

export async function saveMeal(meal) {
  // Turn meal title into a slug, and for lowercase.
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize user input to prevent cross-site scripting
  meal.instructions = xss(meal.instructions);

  // Get extension from image file using split
  const extension = meal.image.name.split(".").pop();

  // Create unique filename, not using user filename.
  // Also add universally unique ID to prevent overrides.
  const unique = crypto.randomUUID();
  const fileName = `${meal.slug}-${unique}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed saving image");
    }
  });

  // No need to include 'public' because requests for
  // images will be sent to the public folder anyway.
  // Only the path to the image will be stored because
  // databases are not built to store actual images.
  meal.image = `/images/${fileName}`;

  // Note that value order must be the same as insert order
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES(
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug)
    `
  ).run(meal);
}

export async function updateMealData(meal) {
  // If a new image was uploaded, handle it like in saveMeal
  if (meal.image && typeof meal.image !== "string" && meal.image.name) {
    const extension = meal.image.name.split(".").pop();
    const unique = crypto.randomUUID();
    const fileName = `${slugify(meal.title, {
      lower: true,
    })}-${unique}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Failed saving image");
      }
    });
    meal.image = `/images/${fileName}`;
  }

  // Sanitize instructions
  meal.instructions = xss(meal.instructions);

  // Update the meal in the database using the title and creator_email as identifiers (or use a slug if you have one)
  db.prepare(
    `UPDATE meals SET
      title = @title,
      summary = @summary,
      instructions = @instructions,
      creator = @creator,
      creator_email = @creator_email,
      image = @image
    WHERE slug = @slug`
  ).run(meal);
}

export async function deleteMealData(slug) {
  db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
}
