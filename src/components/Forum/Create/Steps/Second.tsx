"use client";

import { Avatar, Select, SelectItem, SharedSelection } from "@heroui/react";
import FileInput from "../../../Common/File/Input";
import { INDUSTRIES } from "@/src/utils/constants";
import { FormProps } from "@/src/types/form";

export default function ForumCreateSecond(formProps: FormProps) {
  const { form, setForm } = formProps;

  const onLogoChange = (e: any) => {
    e.preventDefault();

    setForm({ ...form, logo: e.target.files[0] });
  };

  const setIndustry = (keys: SharedSelection) =>
    keys.currentKey &&
    setForm({ ...form, industry: keys.currentKey?.toString() });

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <p className="text-lg font-semibold">Style your review forum</p>
        <p className="text-small text-default-300 pt-1">
          Adding logo and industry will attract the right people to your forum.
        </p>
      </div>
      <div className="self-center">
        <FileInput
          accept="image/*"
          className="w-28 h-28 rounded-full"
          handleFileUpload={onLogoChange}
          icon={
            <Avatar
              className="w-28 h-28"
              src={form.logo && URL.createObjectURL(form.logo)}
            />
          }
        />
      </div>
      <Select
        isRequired
        label="Select your Industry"
        name="industry"
        variant="faded"
        form="createForum"
        onSelectionChange={setIndustry}
      >
        {INDUSTRIES.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
