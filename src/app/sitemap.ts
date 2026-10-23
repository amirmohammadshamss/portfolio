import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { visibleProjects } from "@/data/projects";
import { basePath } from "@/components/asset";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { if (!profile.siteUrl) return []; return ["/", ...visibleProjects.map(p => `/projects/${p.slug}/`)].map(path => ({ url: `${profile.siteUrl}${basePath}${path}` })); }
