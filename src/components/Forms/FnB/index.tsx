"use client";

import { useState } from "react";
import Step1 from "./Steps/Step1";
import ProgressBar from "../../Common/ProgressBar";

const steps = [Step1];

export default function FnBReviewForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    rating: 0,
    name: "",
    description: "",
    food: 0,
    ambiance: 0,
    service: 0,
    vibe: 0,
    servicePerson: "",
    pricePP: "",
  });

  const CurrentStep = steps[step];

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const updateForm = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <ProgressBar currentStep={step + 1} totalSteps={steps.length} />
      <CurrentStep
        data={formData}
        updateForm={updateForm}
        next={next}
        back={back}
      />
    </div>
  );
}
