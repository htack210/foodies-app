"use client";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";

import classes from "@/app/meals/[slug]/page.module.css";
import EditMealModal from "@/components/meals/edit-meal-modal";
import { deleteMeal } from "@/lib/actions";

export default function MealDetailsClient({ meal }) {
  const { header, image, headerText, creator, summary, instructions } = classes;
  const [showEditModal, setShowEditModal] = useState(false);

  // Convert instructions for display
  const displayInstructions = meal.instructions.replace(/\n/g, "<br />");
  const [deleteState, deleteAction] = useFormState(deleteMeal, null);

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
        <div className={classes.instructionsContainer}>
          <p
            className={instructions}
            dangerouslySetInnerHTML={{
              __html: displayInstructions,
            }}
          ></p>
          <div className={classes.actions}>
            <button
              className={classes.actionBtn}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
            <form action={deleteAction} style={{ display: "inline" }}>
              <input type="hidden" name="slug" value={meal.slug} />
              <button className={classes.actionBtn} type="submit">
                Delete
              </button>
            </form>
          </div>
        </div>
        {showEditModal && (
          <EditMealModal meal={meal} onClose={() => setShowEditModal(false)} />
        )}
      </main>
    </>
  );
}
