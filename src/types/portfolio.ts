export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  device: "mobile" | "browser" | "none";
  width: number;
  height: number;
}
export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  referenceParagraphs?: string[];
  category: string;
  technologies: string[];
  context?: string;
  role?: string;
  responsibilities?: string[];
  implementation?: string;
  challenges?: string[];
  solutions?: string[];
  outcomes?: string[];
  editorialNotes: string[];
  logoImage?: string;
  coverImage: Screenshot;
  screenshots: Screenshot[];
  links?: { demo?: string; github?: string; website?: string };
  featured: boolean;
  status: "published" | "archived" | "hidden";
  includeInPdf: boolean;
  pdfLayout: "compact" | "extended";
  order: number;
}
