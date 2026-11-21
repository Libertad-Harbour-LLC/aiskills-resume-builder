// Resume Builder — rough notes in, a polished one-page resume out (print or save as PDF).
// Model: claude-sonnet-5-5 (text, answers with structured JSON that the page lays out).

export const MODEL = "claude-sonnet-5-5";
export const FOCUS = [
  { id: "balanced", label: { en: "Balanced", ru: "Сбалансированно" }, brief: "balanced" },
  { id: "results", label: { en: "Results & numbers", ru: "Результаты и цифры" }, brief: "results-first: lead every bullet with the outcome" },
  { id: "leadership", label: { en: "Leadership", ru: "Лидерство" }, brief: "leadership and ownership" },
  { id: "technical", label: { en: "Technical", ru: "Технический" }, brief: "technical depth, tools and stack" },
  { id: "career-change", label: { en: "Career change", ru: "Смена профессии" }, brief: "a career change: highlight transferable skills" },
];
export const LIMITS = { experience: 1500, education: 300, skills: 300, projects: 500, contacts: 200, vacancy: 600 };

export const APP = {
  id: "resume-builder",
  name: "Resume Builder",
  theme: "slate-indigo",
  resultKind: "text",
  tagline: { en: "Notes in — resume out", ru: "Заметки на входе — резюме на выходе" },
  kicker: { en: "AI resume writer", ru: "ИИ-составитель резюме" },
  headline: { en: "Turn rough notes into a resume that gets interviews", ru: "Превратите черновые заметки в резюме, которое зовут на собеседования" },
  description: {
    en: "Write your experience the way you remember it — AI rewrites it with strong verbs and results, tailors it to the job you want and lays it out as a clean page to print or save as PDF.",
    ru: "Опишите опыт как помните — ИИ перепишет его сильными глаголами и результатами, подстроит под нужную вакансию и сверстает аккуратную страницу для печати или PDF.",
  },
  cta: { en: "Build resume", ru: "Собрать резюме" },
  emptyText: { en: "Fill in your name, the job you want and your experience, then press “Build resume”.", ru: "Укажите имя, желаемую должность и опыт, затем нажмите «Собрать резюме»." },
  needText: { en: "Add your name, the target job and your experience.", ru: "Укажите имя, желаемую должность и опыт." },
  models: [MODEL],
  upload: { types: ["image/jpeg", "image/png", "image/webp"], maxBytes: 20 * 1024 * 1024 },
  slots: [],
  compare: false,
  initialState: () => ({ name: "", role: "", contacts: "", experience: "", education: "", skills: "", projects: "", vacancy: "", focus: "balanced", language: "auto" }),
  ready: (s) => s.name.trim() && s.role.trim() && s.experience.trim().length >= 20,
  priceModel: () => MODEL,
  label: (s) => `${s.name} · ${s.role}`.slice(0, 60),
};
