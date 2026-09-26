import type { ComponentPropsWithoutRef, FC } from "react";
import "@/styles/spinkit.css";

interface SpinnerWaveProps extends ComponentPropsWithoutRef<"div"> {}

const SpinnerWave: FC<SpinnerWaveProps> = (props) => {
  return (
    <div role="status" className="flex justify-center" aria-label="loading" {...props}>
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
