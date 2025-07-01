import { FormProps } from "@/src/types/form";
import { Input, Slider, SliderValue, Textarea } from "@heroui/react";

export default function CommonForm({ formId, form, setForm }: FormProps) {
  const handleRating = (value: SliderValue) => {
    setForm({ ...form, rating: Array.isArray(value) ? value[0] : value });
  };

  const handleName = (value: string) => {
    setForm({ ...form, name: value });
  };
  const handleDescription = (value: string) => {
    setForm({ ...form, description: value });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <h2 className="text-xl mb-4 text-default-600">
        How would you rate your experience?
      </h2>
      <Slider
        color="primary"
        className="text-default-600"
        classNames={{
          label: "text-md",
          value: "text-md",
        }}
        maxValue={5}
        minValue={0}
        step={0.5}
        label="Overall Rating?"
        value={form.rating}
        onChange={handleRating}
      />
      <Input
        isRequired
        form={formId}
        errorMessage="Please enter a valid name"
        label="Name"
        variant="faded"
        name="name"
        placeholder="Ram Bhat"
        value={form.name}
        type="text"
        onValueChange={handleName}
      />

      <Textarea
        label="Experience"
        isRequired
        form={formId}
        errorMessage="Please enter a valid review"
        minRows={3}
        maxRows={5}
        value={form.description}
        name="description"
        placeholder="Explain about your experience..."
        variant="faded"
        type="text"
        onValueChange={handleDescription}
      />
    </div>
  );
}
