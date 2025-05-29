import Image from "next/image";
import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

export async function  generateMetadata({params}) {
  const meal = getMeal(params.slug);
  if (meal) {
    return {
      title: meal.title,
      description: meal.summary,};
    } else {
      notFound();
    };
  
  return{};
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.slug);

  const { header, image, headerText, creator, summary, instructions, loading } =
    classes;

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={header}>
        <div className={image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={headerText}>
          <h1>{meal.title}</h1>
          <p className={creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
