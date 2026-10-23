import { PortfolioDownload } from '@/components/portfolio-download';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Presentation } from '@/components/presentation';
import { pdfProjects } from '@/data/projects';
export const metadata: Metadata={title:'Portfolio presentation',robots:{index:false,follow:false}};
export default function PrintPortfolio(){return <main id="main" className="print-portfolio bg-[#dce9ef] pb-[30px] [@media_screen_and_(max-width:1440px)]:w-[max-content] [@media_screen_and_(max-width:1440px)]:min-w-full print:p-0 print:bg-white"><nav className="print-toolbar flex justify-between [padding:22px_35px] text-[13px] print:hidden!"><Link href="/">← Back to website</Link><span>Portfolio presentation</span><PortfolioDownload>Download PDF ↓</PortfolioDownload></nav><Presentation projects={pdfProjects} print/></main>}
