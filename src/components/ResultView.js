"use client";
// The resume as a printable page ("Print / PDF" prints only the page).
import { FiPrinter } from "react-icons/fi";
import { useKit, parseJson } from "@/lib/kit-i18n";
import { CopyButton } from "./CopyBar";
import Markdown from "./Markdown";

const arr = (v) => (Array.isArray(v) ? v : []);
const str = (v) => (typeof v === "string" ? v : "");

function toMarkdown(d) {
  const out = [`# ${str(d.name)}`, str(d.title), arr(d.contacts).join(" · "), "", str(d.summary), ""];
  if (arr(d.experience).length) {
    out.push("## Experience");
    for (const e of arr(d.experience)) {
      out.push(`### ${str(e.role)} — ${str(e.company)} (${str(e.period)})`);
      arr(e.bullets).forEach((b) => out.push(`- ${b}`));
    }
  }
  if (arr(d.education).length) { out.push("", "## Education"); arr(d.education).forEach((e) => out.push(`- ${str(e.degree)}, ${str(e.school)} (${str(e.period)})`)); }
  if (arr(d.skills).length) out.push("", "## Skills", arr(d.skills).join(", "));
  if (arr(d.projects).length) { out.push("", "## Projects"); arr(d.projects).forEach((p) => out.push(`- **${str(p.name)}** — ${str(p.description)}`)); }
  if (arr(d.languages).length) out.push("", "## Languages", arr(d.languages).join(", "));
  return out.join("\n");
}

export default function ResultView({ text }) {
  const { k, lang } = useKit();
  const ru = lang === "ru";
  const d = parseJson(text);
  if (!d || !d.name) {
    return <div className="space-y-3"><p className="text-xs text-secondary-text">{k("rawAnswer")}</p><Markdown text={text} /><CopyButton text={text} /></div>;
  }
  const H = ({ children }) => <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 border-b border-slate-200 pb-1 mb-2 mt-5">{children}</div>;
  return (
    <div className="space-y-4">
      <style>{`@media print { body * { visibility: hidden !important; } .resume-sheet, .resume-sheet * { visibility: visible !important; }
        .resume-sheet { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; border: 0 !important; } @page { margin: 14mm; } }`}</style>
      <div className="resume-sheet rounded-2xl bg-white text-slate-800 p-6 sm:p-9 shadow-xl text-[13px] leading-relaxed" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <div className="text-2xl sm:text-3xl font-black text-slate-900 break-words">{str(d.name)}</div>
        {str(d.title) && <div className="text-base font-semibold text-indigo-600">{str(d.title)}</div>}
        {arr(d.contacts).length > 0 && <div className="mt-1 text-xs text-slate-500 break-words">{arr(d.contacts).join("  ·  ")}</div>}
        {str(d.summary) && <p className="mt-4">{str(d.summary)}</p>}
        {arr(d.experience).length > 0 && <H>{ru ? "Опыт" : "Experience"}</H>}
        {arr(d.experience).map((e, i) => (
          <div key={i} className="mb-3">
            <div className="flex flex-wrap justify-between gap-x-3">
              <div className="font-bold text-slate-900">{str(e.role)}{str(e.company) && <span className="font-normal text-slate-600"> · {str(e.company)}</span>}</div>
              <div className="text-xs text-slate-500">{str(e.period)}</div>
            </div>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">{arr(e.bullets).map((b, j) => <li key={j}>{str(b)}</li>)}</ul>
          </div>
        ))}
        {arr(d.education).length > 0 && <H>{ru ? "Образование" : "Education"}</H>}
        {arr(d.education).map((e, i) => (
          <div key={i} className="flex flex-wrap justify-between gap-x-3"><div><span className="font-semibold">{str(e.degree)}</span>{str(e.school) && `, ${str(e.school)}`}</div><div className="text-xs text-slate-500">{str(e.period)}</div></div>
        ))}
        {arr(d.skills).length > 0 && <><H>{ru ? "Навыки" : "Skills"}</H><div className="flex flex-wrap gap-1.5">{arr(d.skills).map((s, i) => <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-xs">{str(s)}</span>)}</div></>}
        {arr(d.projects).length > 0 && <><H>{ru ? "Проекты" : "Projects"}</H>{arr(d.projects).map((p, i) => <div key={i}><span className="font-semibold">{str(p.name)}</span> — {str(p.description)}</div>)}</>}
        {arr(d.languages).length > 0 && <><H>{ru ? "Языки" : "Languages"}</H><div>{arr(d.languages).join(", ")}</div></>}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover">
          <FiPrinter className="w-4 h-4" /> {k("print")}
        </button>
        <CopyButton text={toMarkdown(d)} />
      </div>
    </div>
  );
}
