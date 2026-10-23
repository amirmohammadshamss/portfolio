import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Download, CodeXml, Settings, Smartphone } from 'lucide-react';
import { profile } from '@/data/profile';
import type { Project } from '@/types/portfolio';
import { asset } from './asset';
import { ScreenshotFrame } from './project-visual';
import { Gallery } from './gallery';
import { ContactLinks } from './layout';

function Slide({children,className='',id,print,number}:{children:React.ReactNode;className?:string;id?:string;print:boolean;number:number}) {return <section id={id} className={`folio-slide ${print?'pdf-page':''} ${className}`}><div className="folio-slide-inner">{children}</div><span className="folio-page-number">{String(number).padStart(2,'0')}</span></section>}
export function Presentation({projects,print=false}:{projects:Project[];print?:boolean}) {
 let number=0;
 return <div className={`folio ${print?'folio-print':'folio-web'}`}>
 <Slide print={print} number={++number} className="folio-cover"><div className="folio-cover-title"><p className="folio-kicker">SOFTWARE DEVELOPMENT PORTFOLIO</p><h1><strong>Mobility</strong><span>Projects</span></h1><p className="folio-name">{profile.name}</p><p className="folio-role">{profile.title}</p>{!print&&<div className="folio-actions"><a href="#projects">View projects <ArrowDown size={18}/></a><a href={asset('/portfolio.pdf')} download>Download PDF <Download size={18}/></a></div>}</div><div className="folio-cover-lines" aria-hidden="true"/></Slide>
 <Slide print={print} number={++number} className="folio-introduction" id="about"><div className="folio-intro-copy"><p className="folio-section-label">Introduction</p>{profile.introductionParagraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<p className="folio-signature">{profile.originalSignature}</p></div><div className="folio-illustration" aria-hidden="true"><div className="folio-phone-drawing"><Smartphone strokeWidth={.7}/><CodeXml className="folio-code-symbol" strokeWidth={1.3}/></div><Settings className="folio-gear-symbol" strokeWidth={1.2}/><span className="folio-illustration-line"/></div></Slide>
 {projects.map((project,index)=><div className="folio-project-pair" key={project.id} id={index===0?'projects':undefined}>
 <Slide print={print} number={++number} className={`folio-project-description folio-project-${project.slug}`} id={project.slug}><div className="folio-project-copy"><div className="folio-project-title">{project.logoImage&&<Image src={asset(project.logoImage)} alt="" width={86} height={86}/>}<h2>{project.title}</h2></div><p className="folio-project-category">{project.category}</p><ul className="folio-project-points">{(project.referenceParagraphs ?? [project.description, ...(project.solutions ?? [])]).map(paragraph=><li key={paragraph}>{paragraph}</li>)}</ul>{project.technologies.length>0&&<p className="folio-stack">{project.technologies.join(' · ')}</p>}{project.role&&<p className="folio-stack">{project.role}</p>}{!print&&<Link className="folio-case-link" href={`/projects/${project.slug}/`}>Explore the project <ArrowUpRight size={18}/></Link>}</div><div className="folio-feature-screen"><ScreenshotFrame screenshot={project.coverImage} eager={print}/></div></Slide>
 {(!print||project.pdfLayout==='extended')&&<Slide print={print} number={++number} className="folio-product-screens"><div className="folio-gallery-heading"><p>{project.title}</p><span>PRODUCT SCREENS</span></div>{print?<div className="folio-print-gallery">{project.screenshots.map(s=><figure key={s.src}><ScreenshotFrame screenshot={s} eager/><figcaption>{s.caption}</figcaption></figure>)}</div>:<Gallery screenshots={project.screenshots}/>}</Slide>}
 {!print&&project.screenshotText?.length ? <details className="folio-screen-transcript"><summary>Read the original screen text</summary><p>Transcription of archived product UI. Sample accounts, clinic details, and payments belong to the product screenshots.</p><ul>{project.screenshotText.map((text,i)=><li key={i}>{text}</li>)}</ul></details>:null}
 </div>)}
 {print&&projects.filter(p=>p.screenshotText?.length).map(project=><Slide key={`transcript-${project.id}`} print={print} number={++number} className="folio-transcript-page"><div className="folio-transcript-content"><p className="folio-section-label">{project.title} / Screen text</p><p className="folio-transcript-note">Original product interface transcription. Accounts, clinic contacts, and payment entries shown here are archived product examples.</p><ul>{project.screenshotText?.map((text,i)=><li key={i}>{text}</li>)}</ul></div></Slide>)}
 <Slide print={print} number={++number} className="folio-thanks" id="contact"><h2>Thank you</h2><p>{profile.name}</p><p className="folio-thanks-role">{profile.title}</p><ContactLinks/>{!print&&<a className="folio-download" href={asset('/portfolio.pdf')} download>Download portfolio <Download size={18}/></a>}</Slide>
 </div>
}
