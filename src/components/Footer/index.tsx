"use client";

import { showFooter } from "@/src/utils/utils";
import { Input } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathUrl = usePathname();

  if (!showFooter(pathUrl)) {
    return;
  }

  const sendSubscribeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = Object.fromEntries(formData.entries()) as {
      email: string;
    };
  };

  return (
    <>
      <footer className="border-stroke dark:border-strokedark border-t bg-white dark:bg-slate-950 text-sm md:text-base">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="pt-15 pb-10">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <div className="w-1/2 lg:w-1/4">
                <a href="/" className="relative">
                  <Image
                    src="/images/logo/revit-logo.svg"
                    alt="logo"
                    width={120}
                    height={80}
                  />
                </a>

                <p className="mt-5 mb-10">One place for all reviews.</p>

                <p className="text-sectiontitle mb-1.5 tracking-[5px] uppercase">
                  contact
                </p>
                <a
                  href="#"
                  className="text-itemtitle font-medium text-black dark:text-white"
                >
                  aeradron@gmail.com
                </a>
              </div>
              <div className="flex flex-row justify-end gap-8 w-1/2">
                <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
                  <div>
                    <h4 className="text-itemtitle2 md:mb-9 mb-4 font-medium text-black dark:text-white">
                      Quick Links
                    </h4>

                    <ul>
                      <li>
                        <a
                          href="/#"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="/#features"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Features
                        </a>
                      </li>
                      <li>
                        <a
                          href="/#business"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Business
                        </a>
                      </li>
                      <li>
                        <a
                          href="/#pricing"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-itemtitle2 md:mb-9 mb-4 font-medium text-black dark:text-white">
                      Support
                    </h4>

                    <ul>
                      <li>
                        <a
                          href="https://aeradron.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Company
                        </a>
                      </li>

                      <li>
                        <a
                          href="/#contact"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/privacy"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="/terms"
                          className="hover:text-primary mb-3 inline-block"
                        >
                          Terms & Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="border-stroke dark:border-strokedark flex flex-col flex-wrap items-center justify-center gap-5 border-t py-7 lg:flex-row lg:justify-between lg:gap-0">
            <div>
              <ul className="flex items-center gap-8">
                <li>
                  <a href="#" className="hover:text-primary">
                    English
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p>
                &copy; {new Date().getFullYear()} aeradron. All rights reserved
              </p>
            </div>

            <div>
              <ul className="flex items-center gap-5">
                <li>
                  <a
                    href="https://www.facebook.com/aeradron"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="social icon"
                  >
                    <svg
                      className="hover:fill-primary fill-[#D1D8E0] transition-all duration-300"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1499)">
                        <path
                          d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1499">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/aeradron/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="social icon"
                  >
                    <svg
                      className="hover:fill-primary fill-[#D1D8E0] transition-all duration-300"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          fill="#D1D8E0"
                        ></path>
                        <path
                          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                          fill="#D1D8E0"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                          fill="#D1D8E0"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1502">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/aeradron"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="social icon"
                  >
                    <svg
                      className="hover:fill-primary fill-[#D1D8E0] transition-all duration-300"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1505)">
                        <path
                          d="M6.94 5.00002C6.93974 5.53046 6.72877 6.03906 6.35351 6.41394C5.97825 6.78883 5.46944 6.99929 4.939 6.99902C4.40857 6.99876 3.89997 6.78779 3.52508 6.41253C3.1502 6.03727 2.93974 5.52846 2.94 4.99802C2.94027 4.46759 3.15124 3.95899 3.5265 3.5841C3.90176 3.20922 4.41057 2.99876 4.941 2.99902C5.47144 2.99929 5.98004 3.21026 6.35492 3.58552C6.72981 3.96078 6.94027 4.46959 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.90002 14.94 7.13002 13.28 10.16L13.32 8.48002Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1505">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
