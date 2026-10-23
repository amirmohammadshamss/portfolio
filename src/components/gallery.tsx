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
  return <><div className="screenshot-grid grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[28px] mt-[30px] [&_figure]:m-0">{screenshots.map((s, i) => <figure key={`${s.src}-${i}`}><button className="screenshot-button bg-[#f0f3f8] [border:1px_solid_#e2e6ec] w-full [padding:35px_25px] flex flex-col items-center gap-[25px] rounded-[8px] [&_.device-mobile]:h-[420px] [&_.device-mobile]:max-w-full" onClick={() => { setSelected(s); dialog.current?.showModal(); }} aria-label={`View full resolution: ${s.alt}`}><ScreenshotFrame screenshot={s}/><span className="expand flex items-center gap-[8px] text-[10px] text-[#6b7482]"><Expand size={16}/> View full resolution</span></button><figcaption>{s.caption}</figcaption></figure>)}</div><dialog ref={dialog} className="lightbox [border:0] p-0 bg-[#f7f9fc] max-w-[95vw] max-h-[92vh] rounded-[8px] [&::backdrop]:bg-[#0b1726d9] [&::backdrop]:[backdrop-filter:blur(4px)] [&_img]:max-w-[75vw] [&_img]:w-auto [&_img]:max-h-[none] [&_img]:m-auto [&_p]:text-[11px] [&_p]:mt-[20px] [@media(max-width:700px)]:[&_img]:max-w-[80vw]" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><div className="lightbox-inner p-[45px] overflow-auto [@media(max-width:700px)]:[padding:40px_20px]"><button className="close-dialog sticky top-0 float-right z-[3] [border:1px_solid_#e2e6ec] rounded-full bg-white p-[8px] grid place-items-center [margin:-30px_-30px_0_0] [@media(max-width:700px)]:[margin:-30px_-10px_0_0]" onClick={() => dialog.current?.close()} aria-label="Close full resolution image"><X/></button>{selected && <><Image src={asset(selected.src)} alt={selected.alt} width={selected.width} height={selected.height} unoptimized/><p>{selected.caption}</p></>}</div></dialog></>;
}
