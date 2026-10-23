import Image from "next/image";
import { asset } from "./asset";
import type { Screenshot, Project } from "@/types/portfolio";
const deviceClasses: Record<Screenshot['device'], string> = {
  "mobile": "device-mobile h-full [border:6px_solid_#19212e] rounded-[27px] [box-shadow:0_25px_40px_#12264026] aspect-[auto] [&_img]:w-auto [&_img]:h-full [&_img]:object-contain [&_img]:bg-white [&_img]:max-w-none",
  "browser": "device-browser [border:1px_solid_#d6dce5] [border-top:20px_solid_#e7eaf0] rounded-[7px] [box-shadow:0_16px_35px_#1226401a] [&:before]:[content:'•••'] [&:before]:absolute [&:before]:top-[-23px] [&:before]:left-[8px] [&:before]:text-[#9faabc] [&:before]:text-[18px] [&:before]:tracking-[3px]",
  "none": "device-none bg-transparent"
};
export function ScreenshotFrame({ screenshot, eager = false }: { screenshot: Screenshot; eager?: boolean }) { return <div className={`device-frame relative bg-[#fff] overflow-hidden max-w-full inline-block align-bottom ${deviceClasses[screenshot.device]}`}><Image src={asset(screenshot.src)} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading={eager ? "eager" : "lazy"} unoptimized/>{screenshot.device === "mobile" && <span className="device-island absolute top-[5px] left-[50%] [transform:translateX(-50%)] h-[10px] w-[38%] bg-[#19212e] rounded-[20px]" aria-hidden="true"/>}</div>; }
export function ProjectVisual({ project }: { project: Project }) { return <div className="project-visual relative isolate overflow-hidden [&_.visual-device]:bottom-[22px] [&_.visual-device]:[height:calc(100%_-_44px)]"><div className="visual-brand absolute flex flex-col items-start z-[1] [&_strong]:tracking-[-.06em] [&_strong]:mt-[16px] [&_strong]:font-[650] [&_small]:text-[9px] [&_small]:mt-[6px]" aria-hidden="true"><strong>{project.title}</strong><small>{project.category}</small></div><div className="visual-device absolute [transform:rotate(9deg)]"><ScreenshotFrame screenshot={project.coverImage}/></div></div>; }
