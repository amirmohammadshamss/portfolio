import type { Project, Screenshot } from "@/types/portfolio";
import { referenceProjects } from "./reference-content";
import screenshotAssets from "./screenshots.json";
const captions: Record<string, string[]> = {
 hello7: ["Vocabulary review · Word Storm", "Word meaning practice", "Learning progress and profile"],
 dido: ["Restaurant details and table selection", "Immersive restaurant exploration", "Augmented reality food preview"],
 zaryad: ["Educational activity", "Zaryad welcome screen", "Character and learning journey"],
 turlister: ["Account sign in", "Outdoor activity map", "Activity categories"],
 care4us: ["Patient account sign in", "Clinic discovery", "Payment and billing history"],
};
const images = (slug: string, title: string): Screenshot[] => screenshotAssets[slug as keyof typeof screenshotAssets].map((image, i) => ({...image, alt: `${title}: ${i === 3 ? "Original project overview screen" : captions[slug][i]}`, caption: i === 3 ? "Original overview screen · source page edge preserved" : captions[slug][i], device: i === 3 ? "none" : "mobile"}));
const seeds = [
  { slug: "hello7", title: "Hello7", subtitle: "A more visual way to learn.", category: "Language learning", summary: "English vocabulary learning through visual content and GIFs, making memorization more engaging.", description: "Hello7 is an English vocabulary learning application. Visual content and GIFs support a more engaging approach to learning and remembering new words.", context: "Making English vocabulary learning and memorization more engaging.", solutions: ["Use visual content and GIFs as part of the vocabulary learning experience."], accent: "#2878ed" },
  { slug: "dido", title: "Dido", subtitle: "Discover a different dining experience.", category: "Restaurant discovery", summary: "A restaurant discovery and advertising platform exploring AR and VR experiences.", description: "Dido brings restaurant discovery and advertising together in a single platform. The project explores augmented reality and virtual reality concepts for restaurant experiences.", context: "Restaurant discovery and advertising, with exploration of immersive experiences.", solutions: ["Bring restaurant discovery and advertising into a shared platform.", "Explore augmented reality and virtual reality concepts for restaurant experiences."], accent: "#d07744" },
  { slug: "zaryad", title: "Zaryad", subtitle: "Learning, one mission at a time.", category: "Gamified education", summary: "An educational application built around missions, progress tracking, and rewards.", description: "Zaryad is a gamified educational application. Missions, progress tracking, and rewards structure the learning experience.", context: "Organizing educational experiences around missions and visible progress.", solutions: ["Use missions, progress tracking, and rewards to structure learning."], accent: "#7b61c9" },
  { slug: "turlister", title: "turLister", subtitle: "Find your next way outside.", category: "Travel & outdoors", summary: "A map based guide to outdoor activities in the Lister region of Vest-Agder, Norway.", description: "turLister is a guide to outdoor activities in the Lister region of Vest-Agder, Norway. It covers hiking, cycling, swimming, archipelago parks, and cross country trails, with maps and activity discovery. The original portfolio identifies Ionic, Angular, TypeScript, REST APIs, and the MVC pattern.", context: "Helping people discover tourism and outdoor activities through maps.", solutions: ["Combine maps with activity discovery in an outdoor and tourism guide."], accent: "#39856b", technologies: ["Ionic", "Angular", "TypeScript", "REST APIs", "MVC"], implementation: "Built with Ionic, Angular, and TypeScript, using REST APIs and the MVC pattern as documented in the original portfolio. Specific API integrations and individual responsibilities await documentation." },
  { slug: "care4us", title: "Care4us", subtitle: "A clearer view of healthcare payments.", category: "Healthcare payments", summary: "A healthcare payment application for clinic payments, billing, and reminders.", description: "Care4us is a healthcare focused payment application for managing clinic related payments, billing, and reminders.", context: "Managing clinic related payments, billing, and payment reminders.", solutions: ["Bring clinic payments, billing, and reminders into a healthcare payment application."], accent: "#248a98" },
];
export const projects: Project[] = seeds.map((seed, index) => ({
  id: seed.slug, ...seed, logoImage: `/images/projects/${seed.slug}-logo.png`, technologies: seed.technologies ?? [],
  referenceParagraphs: referenceProjects[seed.slug].paragraphs, screenshotText: referenceProjects[seed.slug].screenText,
  coverImage: images(seed.slug, seed.title)[3], screenshots: images(seed.slug, seed.title).slice(0,3),
  editorialNotes: ["Add your verified role and responsibilities.", "Document architecture, implementation decisions, and engineering challenges.", "Add verified outcomes and external project links. Screenshots are extracted from the original portfolio."],
  featured: true, status: "published", includeInPdf: true, pdfLayout: "extended", order: index + 1,
}));
export const visibleProjects = projects.filter(p => p.status !== "hidden").sort((a, b) => a.order - b.order);
export const featuredProjects = visibleProjects.filter(p => p.featured && p.status === "published");
export const pdfProjects = visibleProjects.filter(p => p.includeInPdf);
