import type { Metadata } from 'next';
import Link from 'next/link';
import { Presentation } from '@/components/presentation';
import { pdfProjects } from '@/data/projects';
import { asset } from '@/components/asset';
import '@/styles/print.css';
export const metadata: Metadata={title:'Portfolio presentation',robots:{index:false,follow:false}};
export default function PrintPortfolio(){return <main id="main" className="print-portfolio"><nav className="print-toolbar"><Link href="/">← Back to website</Link><span>Portfolio presentation</span><a href={asset('/portfolio.pdf')} download="Amir-Mohammad-Shams-Portfolio.pdf">Download PDF ↓</a></nav><Presentation projects={pdfProjects} print/></main>}
