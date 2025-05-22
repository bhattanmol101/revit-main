"use client";

import FileInput from "@/src/components/Common/File/Input";
import { BusinessFormProps } from "@/src/types/form";
import { Avatar, Input, Textarea } from "@heroui/react";

export default function BusinessCreateFirst(formProps: BusinessFormProps) {
  const { form, setForm } = formProps;

  const setName = (val: string) => setForm({ ...form, name: val });
  const setOwnerName = (val: string) => setForm({ ...form, ownerName: val });
  const setDescription = (val: string) =>
    setForm({ ...form, description: val });
  const onLogoChange = (e: any) => {
    e.preventDefault();

    setForm({ ...form, logo: e.target.files[0] });
  };

  return (
    <div className="flex flex-col gap-8 w-full -mt-5">
      <div>
        <p className="text-lg font-semibold">Tell us about your business</p>
        <p className="text-small text-default-300 pt-1">
          A name and description will help people understand about your
          business.
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
      <div className="flex flex-row justify-center items-center gap-4">
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Business Name"
          name="name"
          placeholder="e.g. aeradron"
          type="text"
          value={form.name}
          variant="faded"
          onValueChange={setName}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Owner Name"
          name="ownerName"
          placeholder="e.g. Anmol Bhat"
          type="text"
          value={form.ownerName}
          variant="faded"
          onValueChange={setOwnerName}
        />
      </div>
      <Textarea
        isRequired
        label="Description"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0 whitespace-pre"
        errorMessage="Please enter valid description"
        maxRows={7}
        value={form.description}
        placeholder="Tell in brief about the forum"
        variant="faded"
        onValueChange={setDescription}
      />
    </div>
  );
}
