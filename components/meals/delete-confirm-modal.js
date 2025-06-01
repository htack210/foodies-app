import Image from "next/image";
import modalClasses from "./edit-meal-modal.module.css"; // reuse your modal styles

export default function DeleteConfirmModal({
  meal,
  onCancel,
  onDelete,
  pending,
}) {
  return (
    <div className={modalClasses.modalBackdrop}>
      <div className={modalClasses.modal}>
        <h2>Delete Recipe</h2>
        <p>
          Are you sure you want to delete <strong>{meal.title}</strong>?
        </p>
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <Image
            src={meal.image}
            alt={meal.title}
            width={160}
            height={160}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
        <div className={modalClasses.modalActions}>
          <button
            style={{ background: "#f9572a", color: "white" }}
            onClick={onDelete}
            disabled={pending}
          >
            {pending ? "Deleting..." : "Delete"}
          </button>
          <button type="button" onClick={onCancel} disabled={pending}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
