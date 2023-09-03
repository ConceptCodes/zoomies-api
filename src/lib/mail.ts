import { Resend } from "resend";
import { env } from "@lib/env";
import path from "path";
import fs from "fs";

const resend = new Resend(env.RESEND_API_KEY);

type Data = Record<string, string>;

type EmailTemplates = {
  [key: string]: {
    subject: string;
    component: (data: Data) => string;
  };
};

const loadTemplate = (name: string, args: Record<string, string>): string => {
  const template = fs.readFileSync(
    path.join(__dirname, "..", "emails", `${name}.html`),
    "utf8"
  );
  return template.replace(/{{([^{}]*)}}/g, (a, b) => {
    const value = args[b];
    return typeof value === "string" ? value : a;
  });
};

const templates: EmailTemplates = {
  welcome: {
    subject: "Welcome to Acme",
    component: (data) => {
      return loadTemplate("welcome", data);
    },
  },
  resetPassword: {
    subject: "Reset your password",
    component: (data) => {
      return loadTemplate("reset-password", data);
    },
  },
};

export async function sendEmail<T extends keyof typeof templates>(
  email: string,
  template: T,
  data: Data
) {
  try {
    const subject = templates[template].subject;
    const html = templates[template].component(data);

    await resend.emails.send({
      from: "Zoomies <support@zoomies.dev>",
      to: [email],
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkEmailHealth() {
  try {
    const { data } = await resend.domains.list();
    return data.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
