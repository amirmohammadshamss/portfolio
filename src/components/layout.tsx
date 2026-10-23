import Link from "next/link";
import { ArrowUpRight, Download, Code2, BriefcaseBusiness, Mail, Globe } from "lucide-react";
import { profile } from "@/data/profile";
import { asset } from "./asset";
export function Header() { return <header className="site-header"><div className="container header-inner"><Link href="/" className="wordmark" aria-label={`${profile.name}, home`}><span className="monogram">a<span>.</span></span><span>AMIR SHAMS<span className="wordmark-sub">SOFTWARE DEVELOPER</span></span></Link><nav aria-label="Main navigation"><Link href="/#projects">Projects</Link><Link href="/#about">About</Link><Link href="/#contact">Contact <ArrowUpRight size={14}/></Link></nav><a className="header-pdf" href={asset('/portfolio.pdf')} download><Download size={15}/> Portfolio PDF</a></div></header>; }
export function ContactLinks() {
  const links = [ { label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}`, icon: Mail }, { label: "GitHub", value: profile.contact.github, href: profile.contact.github, icon: Code2 }, { label: "LinkedIn", value: profile.contact.linkedin, href: profile.contact.linkedin, icon: BriefcaseBusiness }, { label: "Website", value: profile.contact.website, href: profile.contact.website, icon: Globe } ].filter(l => l.value);
  return links.length ? <div className="contact-links">{links.map(l => <a key={l.label} href={l.href}><l.icon size={18}/>{l.label}<ArrowUpRight size={14}/></a>)}</div> : <p className="contact-pending">Contact links are being updated.<br/><span>Email, GitHub, LinkedIn, and website can be configured in the profile data.</span></p>;
}
export function Footer() { return <footer className="container footer"><p>© {new Date().getFullYear()} {profile.name}</p><p>Thoughtfully built. Continuously evolving.</p><a href="#top">Back to top ↑</a></footer>; }
