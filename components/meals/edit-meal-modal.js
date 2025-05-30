import { useState } from "react";
import modalClasses from "./edit-meal-modal.module.css";
import formClasses from "@/app/meals/share/page.module.css";
import ImagePicker from "@/components/meals/image-picker";

export default function EditMealModal({ meal, onClose }) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: Call your updateMeal API here, then close modal
    // await updateMeal(form);
    onClose();
  }

return (
    <div className={modalClasses.modalBackdrop}>
      <div className={modalClasses.modal}>
        <h2>Edit Meal</h2>
        <form className={formClasses.form} onSubmit={handleSubmit}>
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
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              value={form.instructions}
              onChange={handleChange}
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" id="image" />
          <div className={`${formClasses.actions} ${modalClasses.modalActions}`}>
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