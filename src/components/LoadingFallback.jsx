// LoadingFallback.jsx
import React from "react";
import Spinner from "./Spinner";
import "../styles/Loading.css";
export default function LoadingFallback() {
  return (
    <div className="loading">
      <Spinner />
      <span>Loading…</span>
    </div>
  );
}