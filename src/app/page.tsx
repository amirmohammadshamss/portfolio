import { Presentation } from '@/components/presentation';
import { featuredProjects, visibleProjects } from '@/data/projects';
import { asset } from '@/components/asset';
import Link from 'next/link';
import { Download } from 'lucide-react';
export default function Home(){return <><header className="folio-navigation"><a href="#top" className="folio-nav-name">Amir Mohammad Shams</a><nav aria-label="Main navigation"><a href="#about">Introduction</a><a href="#projects">Projects</a><a href="#contact">Contact</a><a href={asset('/portfolio.pdf')} download aria-label="Download portfolio PDF"><Download size={18}/><span>PDF</span></a></nav></header><main id="main"><Presentation projects={featuredProjects}/>{visibleProjects.some(p=>!featuredProjects.includes(p))&&<section className="folio-archive"><h2>More projects</h2>{visibleProjects.filter(p=>!featuredProjects.includes(p)).map(p=><Link key={p.id} href={`/projects/${p.slug}/`}>{p.title} ↗</Link>)}</section>}</main></>}
