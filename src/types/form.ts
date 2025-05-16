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

export type FormProps = {
  form: ForumForm;
  setForm: (form: ForumForm) => void;
};
