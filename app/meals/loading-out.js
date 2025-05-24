import React from "react";
import classes from "@/app/loading.module.css";

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
