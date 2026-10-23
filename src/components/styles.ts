// Shared Tailwind utility lists; keep complete class names for build-time scanning.
export const containerClasses = "content-container [width:min(1200px,calc(100%_-_96px))] mx-auto [@media(max-width:1000px)]:[width:calc(100%_-_60px)] [@media(max-width:700px)]:[width:calc(100%_-_40px)]";
export const contactLinksClasses = "contact-links flex gap-[15px] flex-wrap [&>a]:flex [&>a]:items-center [&>a]:gap-[8px] [&>a]:text-[12px] [&>a]:text-[#2865e8]";
export const slideDecorationClasses = "[&:before]:[content:''] [&:before]:absolute [&:before]:inset-0 [&:before]:z-[-1] [&:before]:bg-[image:linear-gradient(135deg,transparent_45%,#def0f622_45%_58%,transparent_58%_78%,#def0f62a_78%)]";
export const projectStackClasses = "folio-stack text-[14px] leading-[1.7] [margin:24px_0_0_30px] text-[#21728e] [@media(max-width:700px)]:ml-[24px] [@media(max-width:700px)]:text-[12px]";
export const eyebrowClasses = "eyebrow text-[10px] font-[650] tracking-[.14em] leading-[1.5] uppercase";
export const editableNoteClasses = "editable-note text-[#87909d]! italic";
