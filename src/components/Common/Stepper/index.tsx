import React from "react";
import { TickIcon } from "../../Icons";

type StepperType = {
  className?: string;
  currentStep: number;
  numberOfSteps: number;
  name?: string;
};

export default function Stepper({
  className,
  currentStep,
  numberOfSteps,
  name,
}: StepperType) {
  const activeBgColor = (index: number) =>
    currentStep >= index ? "bg-primary" : "bg-default-400";

  const activeTextColor = (index: number) =>
    currentStep >= index ? "text-primary-500" : "text-default-500";

  const isDone = (index: number) =>
    currentStep > index ? (
      <TickIcon />
    ) : (
      <p className="text-white">{index + 1}</p>
    );

  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex flex-col items-center justify-center w-7 h-7 rounded-full ${activeBgColor(index)}`}
          >
            {isDone(index)}
          </div>
          {isFinalStep(index) ? null : (
            <div className="flex flex-row items-center justify-center px-2">
              <p className={`pr-2 ${activeTextColor(index)}`}>{name}</p>
              <div
                className={`w-12 h-1 rounded-full mt-0.5 ${activeBgColor(index)}`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
