"use client";

import { useRef } from "react";
import classes from "./image-picker.module.css";

const { controls, picker, input, button, preview } = classes;

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={picker}>
      <label htmlFor={name}>{label}</label>
      <div className={controls}>
        <input
          className={input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />
        <button className={button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
