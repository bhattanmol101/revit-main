"use server";

import { ContactForm } from "@/src/types/form";
import { i } from "framer-motion/client";
import nodemailer from "nodemailer";

export const sendEmail = async (contact: ContactForm) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_USER,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: contact.email,
    to: "aeradron@gmail.com",
    subject: contact.subject,
    html: `<p>Hi ${contact.name},</p><p>${contact.message}</p><br/></br><p>Contact: ${contact.number}</p>`,
  });

  if (info.accepted.length === 0) {
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    };
  }

  return {
    success: true,
    error: "",
  };
};
