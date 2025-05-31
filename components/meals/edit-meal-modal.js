import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import modalClasses from "./edit-meal-modal.module.css";
import formClasses from "@/app/meals/share/page.module.css";
import ImagePicker from "@/components/meals/image-picker";
import { updateMeal } from "@/lib/actions";

export default function EditMealModal({ meal, onClose }) {
  const [state, formAction] = useFormState(updateMeal, { message: null });

  useEffect(() => {
    if (state && state.message === "success") {
      onClose();
    }
  }, [state, state?.message, onClose]);

  const [form, setForm] = useState({
    title: meal.title,
    summary: meal.summary,
    instructions: meal.instructions.replace(/<br\s*\/?>/g, "\n"),
    creator: meal.creator,
    creator_email: meal.creator_email,
    // Add other fields as needed
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className={modalClasses.modalBackdrop}>
      <div className={modalClasses.modal}>
        <h2>Edit Meal</h2>
        <form
          className={formClasses.form}
          action={formAction}
          encType="multipart/form-data"
        >
          <div className={formClasses.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="creator"
                value={form.creator}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="creator_email"
                value={form.creator_email}
                onChange={handleChange}
              />
              <input
                type="hidden"
                id="org_email"
                name="org_email"
                value={meal.creator_email}
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              type="hidden"
              id="org_title"
              name="org_title"
              value={meal.title}
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
            />
            <input
              type="hidden"
              id="org_summary"
              name="org_summary"
              value={meal.summary}
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="5"
              value={form.instructions}
              onChange={handleChange}
            ></textarea>
            <input
              type="hidden"
              id="org_instructions"
              name="org_instructions"
              value={meal.instructions}
            ></input>
          </p>
          <ImagePicker
            label="Your image"
            name="image"
            id="image"
            defaultImage={meal.image}
          />
          <input type="hidden" name="org_image" value={meal.image} />
          <div
            className={`${formClasses.actions} ${modalClasses.modalActions}`}
          >
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
