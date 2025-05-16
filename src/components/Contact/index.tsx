"use client";
import { Button, Checkbox, Form, Input, Textarea } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Contact = () => {
  /**
   * Source: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
   * Reason: To fix rehydration error
   */
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="max-w-c-1390 relative mx-auto px-7.5 py-10 lg:px-15 lg:py-15 xl:px-20 xl:py-20">
          <div className="absolute top-0 left-0 -z-1 h-2/3 w-full rounded-lg"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
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
              <h2 className="mb-15 text-lg font-semibold text-black xl:text-xl dark:text-white">
                Send a message
              </h2>

              <Form
                className="flex w-full flex-col gap-2 md:gap-6"
                validationBehavior="native"
                onSubmit={() => {}}
              >
                <div className="flex w-full flex-col gap-3 lg:flex-row lg:justify-between">
                  <Input
                    errorMessage="Please enter a valid name"
                    label="Name"
                    variant="faded"
                    name="name"
                    placeholder="Ram Bhat"
                    type="text"
                  />
                  <Input
                    errorMessage="Please enter a valid email"
                    label="Email"
                    variant="faded"
                    name="email"
                    placeholder="user@aeradron.com"
                    type="email"
                  />
                </div>

                <div className="flex w-full flex-col gap-3 lg:flex-row lg:justify-between">
                  <Input
                    errorMessage="Please enter a valid subject"
                    label="Subject"
                    variant="faded"
                    name="subject"
                    placeholder="I want to grow my business"
                    type="text"
                  />
                  <Input
                    errorMessage="Please enter a valid number"
                    label="Phone Number"
                    variant="faded"
                    name="number"
                    placeholder="123456789"
                    type="text"
                  />
                </div>

                <Textarea
                  aria-label="Message"
                  className="mb-5 whitespace-pre"
                  maxRows={10}
                  name="message"
                  placeholder="Please let us know how we can help...."
                  variant="faded"
                />

                <div className="flex w-full flex-wrap items-center gap-4 xl:justify-between">
                  <div className="mb-4 flex md:mb-0">
                    <Checkbox>
                      <p className="text-sm">
                        By clicking checkbox, you agree to our terms &
                        conditions.
                      </p>
                    </Checkbox>
                  </div>

                  <Button
                    onPress={() => {}}
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
              <p className="mb-12.5 text-xl font-semibold text-black xl:text-2xl dark:text-white">
                Find us
              </p>

              <div className="5 mb-7">
                <h3 className="text-metatitle3 mb-4 font-medium text-black dark:text-white">
                  Our Loaction
                </h3>
                <p>Kundalahalli, Bangalore, Karnataka - 560037</p>
              </div>
              <div className="5 mb-7">
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
