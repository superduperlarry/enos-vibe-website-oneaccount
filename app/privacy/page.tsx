import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy — ENOS (draft)" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How ENOS collects, uses and protects personal information. This page is a placeholder while the policy is drafted."
      sections={[
        { id: "who-we-are", title: "Who we are" },
        {
          id: "what-we-collect",
          title: "What we collect",
          note: "The sign-up form on this site asks for an email address, a WhatsApp number (optional), where you're based, what kind of business you run and the money you receive each month.",
        },
        { id: "how-we-use-it", title: "How we use it" },
        { id: "sharing", title: "Who we share it with" },
        { id: "transfers", title: "International transfers" },
        { id: "retention", title: "How long we keep it" },
        { id: "your-rights", title: "Your rights" },
        { id: "cookies", title: "Cookies" },
        { id: "contact", title: "Contact" },
      ]}
    />
  );
}
