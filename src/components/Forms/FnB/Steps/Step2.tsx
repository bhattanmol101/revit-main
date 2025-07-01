import { FormProps } from "@/src/types/form";
import { Input, Slider, SliderValue } from "@heroui/react";

export default function Step2({ form, setForm }: FormProps) {
  const handleFood = (value: SliderValue) => {
    setForm({ ...form, food: Array.isArray(value) ? value[0] : value });
  };
  const handleAmbiance = (value: SliderValue) => {
    setForm({ ...form, ambiance: Array.isArray(value) ? value[0] : value });
  };
  const handleService = (value: SliderValue) => {
    setForm({ ...form, service: Array.isArray(value) ? value[0] : value });
  };
  const handleVibe = (value: SliderValue) => {
    setForm({ ...form, vibe: Array.isArray(value) ? value[0] : value });
  };

  const handleServicePerson = (value: string) => {
    setForm({ ...form, servicePerson: value });
  };
  const handlePricePP = (value: string) => {
    setForm({ ...form, pricePP: value });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <h2 className="text-xl text-default-600">
        Tell us more about your experience?
      </h2>
      <div className="flex flex-row items-center gap-4 w-full">
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
          label="Food?"
          value={form.food}
          onChange={handleFood}
        />
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
          label="Ambiance?"
          value={form.ambiance}
          onChange={handleAmbiance}
        />
      </div>
      <div className="flex flex-row items-center gap-4 w-full">
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
          label="Service?"
          value={form.service}
          onChange={handleService}
        />
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
          label="Vibe?"
          value={form.vibe}
          onChange={handleVibe}
        />
      </div>

      <div className="flex flex-row items-center gap-4 w-full">
        <Input
          errorMessage="Please enter a valid name"
          label="Service Person"
          variant="faded"
          placeholder="Shyam Bhat"
          type="text"
          value={form.servicePerson}
          onValueChange={handleServicePerson}
        />

        <Input
          errorMessage="Please enter a valid name"
          label="Price Per-Person"
          variant="faded"
          placeholder="300"
          type="number"
          value={form.pricePP}
          onValueChange={handlePricePP}
        />
      </div>
    </div>
  );
}
