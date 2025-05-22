import { SharedSelection } from "@heroui/react";

export type FnBReview = {
  rating: string;
  food?: string;
  ambience?: string;
  service?: string;
  name?: string;
  text?: string;
  vibe?: string;
  price?: string;
  servicePerson?: string;
  visit?: string;
};

export type ForumForm = {
  name: string;
  industry: string;
  logo?: Blob;
  description: string;
};

export type BusinessForm = {
  name: string;
  ownerName: string;
  logo?: Blob;
  description: string;
  location: string;
  website: string;
  contact: string;
  industry: string;
};

export type ForumFormProps = {
  form: ForumForm;
  setForm: (form: ForumForm) => void;
};

export type BusinessFormProps = {
  form: BusinessForm;
  setForm: (form: BusinessForm) => void;
};

export type JsonFieldType = {
  type: string;
  title: string;
  value: string | number | boolean;
};
