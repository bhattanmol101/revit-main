"use client";

import { FormProps } from "@/src/types/form";
import { Input, Textarea } from "@heroui/react";

export default function ForumCreateFirst(formProps: FormProps) {
  const { form, setForm } = formProps;

  const setName = (val: string) => setForm({ ...form, name: val });
  const setDescription = (val: string) =>
    setForm({ ...form, description: val });

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <p className="text-lg font-semibold">Tell us about your review forum</p>
        <p className="text-small text-default-300 pt-1">
          A name and description will help people understand about your forum.
        </p>
      </div>
      <Input
        isRequired
        errorMessage="Please enter a valid name"
        label="Forum Name"
        name="name"
        placeholder="e.g. aeradron"
        type="text"
        variant="faded"
        onValueChange={setName}
      />
      <Textarea
        isRequired
        label="Description"
        form="createForum"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0 whitespace-pre"
        errorMessage="Please enter valid description"
        maxRows={7}
        placeholder="Tell in brief about the forum"
        variant="faded"
        onValueChange={setDescription}
      />
    </div>
  );
}
