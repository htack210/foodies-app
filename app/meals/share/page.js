"use client";
import { useFormState } from "react-dom";

import ImagePicker from "@/components/meals/image-picker";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";

const { header, highlight, main, form, row, actions } = classes;

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={header}>
        <h1>
          Share your <span className={highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={main}>
        <form
          className={form}
          action={formAction}
          encType="multipart/form-data"
        >
          <div className={row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="creator" />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="creator_email" />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" id="image" />
          {state.message && <p className={actions}>{state.message}</p>}
          <p className={actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
