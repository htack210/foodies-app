"use client";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";

import classes from "@/app/meals/[slug]/page.module.css";
import EditMealModal from "@/components/meals/edit-meal-modal";
import { deleteMeal } from "@/lib/actions";
import DeleteConfirmModal from "@/components/meals/delete-confirm-modal";

export default function MealDetailsClient({ meal }) {
  const { header, image, headerText, creator, summary, instructions } = classes;
  const [showEditModal, setShowEditModal] = useState(false);

  // Convert instructions for display
  const displayInstructions = meal.instructions.replace(/\n/g, "<br />");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteState, deleteAction] = useFormState(deleteMeal, null);

  // Handler for the delete button in the modal
  function handleDelete(e) {
    e.preventDefault();
    // Submit the form programmatically
    const form = document.getElementById("delete-meal-form");
    if (form) form.requestSubmit();
  }

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
            <button
              className={classes.actionBtn}
              style={{ background: "#f9572a" }}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <>
            <form
              id="delete-meal-form"
              action={deleteAction}
              method="POST"
              style={{ display: "none" }}
            >
              <input type="hidden" name="slug" value={meal.slug} />
            </form>
            <DeleteConfirmModal
              meal={meal}
              onCancel={() => setShowDeleteModal(false)}
              onDelete={handleDelete}
              pending={deleteState?.pending}
            />
          </>
        )}
        {showEditModal && (
          <EditMealModal meal={meal} onClose={() => setShowEditModal(false)} />
        )}
      </main>
    </>
  );
}
