"use client";

import { useState } from "react";
import { Alert, Button, Form } from "@heroui/react";
import { EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE } from "@/src/utils/constants";
import CommonForm from "./Common";

export default function DefaultForm() {
  const [form, setForm] = useState({
    rating: 0,
    name: "",
    description: "",
  });

  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (
      form.rating === 0 &&
      pageState.error !== EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE
    ) {
      setPageState({
        ...pageState,
        error: EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE,
      });
      return;
    }
    pageState.error &&
      setPageState({
        ...pageState,
        error: "",
      });

    setPageState({
      ...pageState,
      loading: true,
      error: "",
    });

    console.log(form);

    // const res = await saveBusinessAction(businessRequest, form.logo);

    // setPageState({
    //   ...pageState,
    //   loading: false,
    //   success: res.success,
    //   error: res.error,
    // });

    // if (res.success) {
    //   router.replace(`/business/${res.id}`);
    //   onOpenChange();
    // }
  };

  return (
    <div className="flex flex-col w-full items-center py-10">
      <div className="h-[56vh] w-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {pageState.error && (
            <div>
              <Alert
                className="sm:mb-8 mb-2"
                color="warning"
                title={pageState.error}
              />
            </div>
          )}
          <Form id="defaultForm" onSubmit={onSubmit} className="w-full">
            <CommonForm formId="defaultForm" form={form} setForm={setForm} />
          </Form>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-4 w-full">
        <Button
          color="primary"
          type="submit"
          form="defaultForm"
          isLoading={pageState.loading}
          spinnerPlacement="end"
        >
          Revit ⭐
        </Button>
      </div>
    </div>
  );
}
