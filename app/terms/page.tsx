import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms — ENOS (draft)" };

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The terms that apply to this website and to ENOS services. This page is a placeholder while the terms are drafted."
      sections={[
        { id: "about", title: "About these terms" },
        { id: "eligibility", title: "Who can use ENOS" },
        { id: "services", title: "Our services and licences" },
        { id: "not-a-bank", title: "Not a bank, not advice" },
        { id: "availability", title: "Availability by jurisdiction" },
        { id: "fees", title: "Fees" },
        { id: "liability", title: "Liability" },
        { id: "law", title: "Governing law" },
        { id: "contact", title: "Contact" },
      ]}
    />
  );
}
