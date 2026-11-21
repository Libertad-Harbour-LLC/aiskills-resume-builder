"use client";

import { FOCUS, LIMITS } from "@/lib/app.config";
import { useLang } from "@/lib/i18n";
import LangSelect from "./LangSelect";

export default function Options({ state, set, Chips, Field }) {
  const { lang, tx } = useLang();
  const ru = lang === "ru";
  return (
    <>
      <Field label={ru ? "Имя и фамилия" : "Full name"} required value={state.name} onChange={(v) => set({ name: v })} placeholder="Alex Morgan" />
      <Field label={ru ? "Желаемая должность" : "Target job"} required value={state.role} onChange={(v) => set({ role: v })} placeholder={ru ? "Senior продакт-менеджер" : "Senior Product Manager"} />
      <Field label={ru ? "Контакты" : "Contacts"} value={state.contacts} max={LIMITS.contacts} onChange={(v) => set({ contacts: v })}
        placeholder={ru ? "почта, телефон, город, LinkedIn" : "email, phone, city, LinkedIn"} />
      <Field label={ru ? "Опыт работы" : "Work experience"} required rows={6} max={LIMITS.experience} value={state.experience} onChange={(v) => set({ experience: v })}
        hint={ru ? "Пишите как есть: компания, годы, что делали и чего добились." : "Write it as you remember: company, years, what you did and achieved."} />
      <Field label={ru ? "Образование" : "Education"} rows={2} max={LIMITS.education} value={state.education} onChange={(v) => set({ education: v })} />
      <Field label={ru ? "Навыки" : "Skills"} rows={2} max={LIMITS.skills} value={state.skills} onChange={(v) => set({ skills: v })} />
      <Field label={ru ? "Проекты (необязательно)" : "Projects (optional)"} rows={2} max={LIMITS.projects} value={state.projects} onChange={(v) => set({ projects: v })} />
      <Field label={ru ? "Текст вакансии (необязательно)" : "Job posting (optional)"} rows={3} max={LIMITS.vacancy} value={state.vacancy} onChange={(v) => set({ vacancy: v })}
        hint={ru ? "Резюме подстроится под требования вакансии." : "The resume will be tailored to its requirements."} />
      <Chips label={ru ? "Акцент" : "Emphasis"} options={FOCUS.map((f) => f.id)} value={state.focus} onChange={(v) => set({ focus: v })}
        render={(id) => tx(FOCUS.find((f) => f.id === id).label)} />
      <LangSelect value={state.language} onChange={(v) => set({ language: v })} />
    </>
  );
}
