import { Input, Slider, SliderValue, Textarea } from "@heroui/react";

export default function Step1({ data, updateForm, next }: any) {
  const handleRating = (value: SliderValue) => {
    updateForm({ rating: Array.isArray(value) ? value[0] : value });
  };

  const handleName = (value: string) => {
    updateForm({ name: value });
  };
  const handleDescription = (value: string) => {
    updateForm({ description: value });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-xl mb-4">How would you rate your experience?</h2>
      <div className="flex flex-row gap-2 items-center w-full">
        <Slider
          color="primary"
          maxValue={5}
          minValue={0}
          step={0.5}
          label="Overall Rating?"
          value={data.rating}
          onChange={handleRating}
        />
        <Input
          errorMessage="Please enter a valid name"
          label="Name"
          variant="faded"
          placeholder="Ram Bhat"
          type="text"
          onValueChange={handleName}
        />
      </div>
      <Textarea
        aria-label="review"
        errorMessage="Please enter a valid review"
        minRows={3}
        maxRows={5}
        value={data.description}
        placeholder="Explain about your expirence..."
        type="text"
        onValueChange={handleDescription}
      />
    </div>
  );
}
