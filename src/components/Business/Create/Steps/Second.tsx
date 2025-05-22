"use client";

import { Input, Select, SelectItem, SharedSelection } from "@heroui/react";
import { INDUSTRIES } from "@/src/utils/constants";
import { BusinessFormProps } from "@/src/types/form";
import { validateContact } from "@/src/utils/validators";

export default function BusinessCreateSecond(formProps: BusinessFormProps) {
  const { form, setForm } = formProps;

  const setLocation = (val: string) => setForm({ ...form, location: val });
  const setWebsite = (val: string) => setForm({ ...form, website: val });
  const setContact = (val: string) => setForm({ ...form, contact: val });
  const setIndustry = (keys: SharedSelection) =>
    keys.currentKey &&
    setForm({ ...form, industry: keys.currentKey?.toString() });

  return (
    <div className="flex flex-col gap-8 w-full -mt-5">
      <div>
        <p className="text-lg font-semibold">How to reach your business</p>
        <p className="text-small text-default-300 pt-1">
          These details will help people to find your business easily.
        </p>
      </div>
      <Input
        isRequired
        errorMessage="Please enter a valid location"
        label="Location"
        name="location"
        placeholder="e.g. Bangalore, Karnataka"
        type="text"
        variant="faded"
        value={form.location}
        onValueChange={setLocation}
      />
      <Input
        errorMessage="Please enter a valid website"
        label="Website"
        name="website"
        placeholder="e.g. https://aeradron.in"
        type="text"
        variant="faded"
        value={form.website}
        onValueChange={setWebsite}
      />
      <Input
        isRequired
        errorMessage="Please enter a valid contact"
        label="Contact"
        name="contact"
        placeholder="e.g. 7889922321"
        type="text"
        validate={validateContact}
        variant="faded"
        value={form.contact}
        onValueChange={setContact}
      />
      <Select
        isRequired
        errorMessage="Please select a valid industry"
        label="Select your Industry"
        name="industry"
        variant="faded"
        onSelectionChange={setIndustry}
      >
        {INDUSTRIES.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
