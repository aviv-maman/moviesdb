import type { FC } from "react";
import "@/styles/spinkit.css";

const SpinnerWave: FC = () => {
  return (
    <div role="status" className="flex justify-center" aria-label="loading">
      <div className="sk-wave">
        <div className="sk-wave-rect" />
        <div className="sk-wave-rect" />
        <div className="sk-wave-rect" />
        <div className="sk-wave-rect" />
        <div className="sk-wave-rect" />
      </div>
    </div>
  );
};

export default SpinnerWave;
