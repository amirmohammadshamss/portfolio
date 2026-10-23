import { referenceIntroduction } from "./reference-content";
export const profile = {
  name: "Amir Mohammad Shams",
  title: "Full Stack Software Developer",
  introductionParagraphs: referenceIntroduction,
  originalSignature: "Amir mohammad shams",
  summary: "Full stack developer focused on web applications, backend systems, mobile products, and AI powered solutions.",
  // Fill these in before sharing. Empty values never create dead links.
  contact: { email: "", github: "", linkedin: "", website: "" },
  // Set your deployed origin (no trailing slash) to enable canonical URLs and sitemap.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
};
