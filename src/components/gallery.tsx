"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import type { Screenshot } from "@/types/portfolio";
import { ScreenshotFrame } from "./project-visual";
import { asset } from "./asset";
export function Gallery({ screenshots }: { screenshots: Screenshot[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Screenshot>(screenshots[0]);
  return <><div className="screenshot-grid">{screenshots.map((s, i) => <figure key={`${s.src}-${i}`}><button className="screenshot-button" onClick={() => { setSelected(s); dialog.current?.showModal(); }} aria-label={`View full resolution: ${s.alt}`}><ScreenshotFrame screenshot={s}/><span className="expand"><Expand size={16}/> View full resolution</span></button><figcaption>{s.caption}</figcaption></figure>)}</div><dialog ref={dialog} className="lightbox" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><div className="lightbox-inner"><button className="close-dialog" onClick={() => dialog.current?.close()} aria-label="Close full resolution image"><X/></button>{selected && <><Image src={asset(selected.src)} alt={selected.alt} width={selected.width} height={selected.height} unoptimized/><p>{selected.caption}</p></>}</div></dialog></>;
}
