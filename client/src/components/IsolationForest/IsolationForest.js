import React from "react";
import "./IsolationForest.css";

import { IsolationForest } from "isolation-forest";

export default function IsolationForest() {
  const isolationForest = new IsolationForest();
  isolationForest.fit(data);
  const scores = isolationForest.scores();
  console.log(scores);
  return <div></div>;
}
