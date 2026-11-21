import "server-only";
import { MODEL, FOCUS, LIMITS } from "@/lib/app.config";
import { PlanError, text } from "@/lib/plan-helpers";
import { langName } from "@/lib/text-presets";

const block = (v, max) => String(v || "").replace(/\r/g, "").trim().slice(0, max);

export function plan(body) {
  const name = text(body.name, 80);
  const role = text(body.role, 120);
  const experience = block(body.experience, LIMITS.experience);
  if (!name || !role || experience.length < 20) throw new PlanError("Add your name, the target job and your experience", "missing_input");
  const focus = FOCUS.find((f) => f.id === body.focus) || FOCUS[0];
  const system =
    "You are a professional resume writer. Rewrite the candidate's notes into a concise one-page resume: a 2–3 sentence " +
    "summary, experience bullets that start with a strong verb and show the result. Keep every fact the candidate gave and " +
    "NEVER invent employers, dates, degrees, numbers or achievements; if a bullet would be stronger with a number the " +
    "candidate did not give, write a placeholder like [X%]. Max 5 bullets per job.\n\n" +
    "Respond with ONLY a JSON object, no markdown fences:\n" +
    '{"name":"","title":"","contacts":["…"],"summary":"","experience":[{"role":"","company":"","period":"","bullets":["…"]}],' +
    '"education":[{"degree":"","school":"","period":""}],"skills":["…"],"projects":[{"name":"","description":""}],"languages":["…"]}';
  const parts = [
    `Name: ${name}`, `Target job: ${role}`,
    block(body.contacts, LIMITS.contacts) && `Contacts: ${block(body.contacts, LIMITS.contacts)}`,
    `Experience notes:\n${experience}`,
    block(body.education, LIMITS.education) && `Education:\n${block(body.education, LIMITS.education)}`,
    block(body.skills, LIMITS.skills) && `Skills: ${block(body.skills, LIMITS.skills)}`,
    block(body.projects, LIMITS.projects) && `Projects:\n${block(body.projects, LIMITS.projects)}`,
    block(body.vacancy, LIMITS.vacancy) && `Tailor it to this job posting:\n${block(body.vacancy, LIMITS.vacancy)}`,
    `Emphasis: ${focus.brief}.`,
    `Language: write the resume in ${langName(body.language)}.`,
  ].filter(Boolean);
  return [{ model: MODEL, prompt: parts.join("\n\n"), fields: { system_prompt: system } }];
}
