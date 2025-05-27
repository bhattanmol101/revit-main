"use client";
import { sendEmail } from "@/src/app/(site)/action";
import { ContactForm } from "@/src/types/form";
import { validateContact } from "@/src/utils/validators";
import {
  addToast,
  Button,
  Checkbox,
  Form,
  Input,
  Textarea,
} from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const Contact = () => {
  /**
   * Source: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
   * Reason: To fix rehydration error
   */
  const [hasMounted, setHasMounted] = useState(false);

  const [checked, setChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const contact = Object.fromEntries(formData.entries()) as ContactForm;

    const resp = await sendEmail(contact);
    setLoading(false);
    if (resp.success) {
      addToast({
        title: "Email Sent",
        description: "Your message has been sent.",
        color: "success",
      });
    } else {
      addToast({
        title: "Email could not be sent",
        description: "Your message has not been sent, Please try again later.",
        color: "danger",
      });
    }
  };

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="contact" className="px-4 md:px-8 2xl:px-0">
        <div className="max-w-c-1390 relative mx-auto px-5 pb-12 lg:px-15 lg:py-15 xl:px-20 xl:py-20">
          <div className="absolute top-0 left-0 -z-1 h-2/3 w-full rounded-lg"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-4 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top shadow-solid-8 dark:border-strokedark w-full rounded-lg p-7.5 md:w-3/5 lg:w-3/4 xl:p-15 dark:border"
            >
              <h2 className="md:mb-15 mb-6 text-lg font-semibold text-black xl:text-xl dark:text-white">
                Send a message
              </h2>

              <Form
                id="contact-form"
                className="flex w-full flex-col gap-2 md:gap-6"
                validationBehavior="native"
                onSubmit={onSubmit}
              >
                <div className="flex w-full flex-col md:gap-3 gap-2 lg:flex-row lg:justify-between">
                  <Input
                    form="contact-form"
                    errorMessage="Please enter a valid name"
                    isRequired
                    label="Name"
                    variant="faded"
                    name="name"
                    placeholder="Ram Bhat"
                    type="text"
                  />
                  <Input
                    form="contact-form"
                    isRequired
                    errorMessage="Please enter a valid email"
                    label="Email"
                    variant="faded"
                    name="email"
                    placeholder="user@aeradron.com"
                    type="email"
                  />
                </div>

                <div className="flex w-full flex-col md:gap-3 gap-2 lg:flex-row lg:justify-between">
                  <Input
                    form="contact-form"
                    isRequired
                    errorMessage="Please enter a valid subject"
                    label="Subject"
                    variant="faded"
                    name="subject"
                    placeholder="I want to grow my business"
                    type="text"
                  />
                  <Input
                    form="contact-form"
                    isRequired
                    errorMessage="Please enter a valid number"
                    label="Phone Number"
                    variant="faded"
                    name="number"
                    placeholder="123456789"
                    validate={validateContact}
                    type="text"
                  />
                </div>

                <Textarea
                  form="contact-form"
                  isRequired
                  aria-label="Message"
                  className="mb-5 whitespace-pre"
                  maxRows={10}
                  name="message"
                  placeholder="Please let us know how we can help...."
                  variant="faded"
                />

                <div className="flex w-full flex-wrap items-center gap-4 xl:justify-between">
                  <div className="mb-4 flex md:mb-0">
                    <Checkbox isRequired form="contact-form">
                      <p className="text-sm">
                        By clicking checkbox, you agree to our terms &
                        conditions.
                      </p>
                    </Checkbox>
                  </div>

                  <Button
                    form="contact-form"
                    type="submit"
                    endContent={
                      <svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill=""
                        />
                      </svg>
                    }
                    isLoading={loading}
                    spinnerPlacement="end"
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <p className="md:mb-12.5 mb-6 text-xl font-semibold text-black xl:text-2xl dark:text-white">
                Find us
              </p>

              <div className="mb-7">
                <h3 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  Our Loaction
                </h3>
                <p>Kundalahalli, Bangalore, Karnataka - 560037</p>
              </div>
              <div className="mb-7">
                <h3 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  Email Address
                </h3>
                <p>
                  <a href="#">aeradron@gmail.com</a>
                </p>
              </div>
              <div>
                <h4 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  Phone Number
                </h4>
                <p>
                  <a href="#">+91 7899270142</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
