# Resume Builder

Rough notes in, a polished one-page resume out: AI rewrites your experience with strong verbs and results, tailors it to a job posting, and the page lays it out as a clean sheet to print or save as PDF.

A ready-to-deploy Next.js app that runs on the [AI SKILLS](https://aiskills.team) API. One environment
variable — `AISKILLS_API_KEY` — and it works.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLibertad-Harbour-LLC%2Faiskills-resume-builder&env=AISKILLS_API_KEY&envDescription=Your%20AI%20SKILLS%20API%20key&envLink=https%3A%2F%2Faiskills.team%2Fapi-keys&project-name=aiskills-resume-builder&repository-name=aiskills-resume-builder)

## Deploy in 3 steps

1. Create an API key at https://aiskills.team/api-keys (sign in, enter a name, optionally a spending limit, click
   “Create key”, copy the `ask_…` key — it is shown once).
2. Click **Deploy with Vercel** above.
3. Paste the key into `AISKILLS_API_KEY` when Vercel asks for it — done. Open your new site.

Every generation is paid **from your AI SKILLS balance at the same prices as on aiskills.team** and appears in
“My generations” there. A failed generation is refunded automatically. Top up at https://aiskills.team/gen-ai.

## Models and prices

| Model id | What it is | Price |
|---|---|---|
| `claude-sonnet-5-5` | Claude Sonnet 5.5 | $0.12 per resume |

Prices are shown live on the page (read from `GET /v1/models`) and may change on the platform.

## How the AI text works here

Text apps use a text model of the AI SKILLS catalog through the same `POST /v1/generations` call as images and
video: the answer comes back as a small `.txt` file in `result_urls`, and the app's server route
(`src/app/api/generations/[id]/route.js`) reads it and gives the page the text. One request holds up to
4,000 characters of instructions plus 4,000 characters of message, so long inputs are trimmed to fit (the
limits are shown next to each field). A text generation usually takes 10–60 seconds.

## Protect your balance

The site spends **your** balance, and anyone who opens it can press the button. Before sharing the link:

- set a **spending limit** on the key at https://aiskills.team/api-keys (per month or in total);
- optionally set `ACCESS_CODE` in the Vercel environment — visitors will have to enter it before generating.

The key never reaches the browser: all calls to the API go through the app's server routes (`src/app/api/*`),
and the model, prompt and parameters are built on the server from the app's own presets (`src/lib/plan.js`), so a
visitor cannot run other models on your key.

## Environment variables

| Variable | Required | What it does |
|---|---|---|
| `AISKILLS_API_KEY` | yes | your `ask_…` key |
| `ACCESS_CODE` | no | a code visitors must enter before generating |
| `AISKILLS_API_BASE` | no | API base URL, default `https://aiskills.team/v1` |

## Run locally

```bash
cp .env.example .env.local   # put your key into AISKILLS_API_KEY
npm install
npm run dev                  # http://localhost:3000
```

## Customize

- `src/lib/app.config.js` — name, texts (English and Russian), presets, which models are used;
- `src/lib/plan.js` — how a visitor's choice becomes an API request (model, prompt, parameters);
- `src/app/globals.css` — colors (`theme` in `app.config.js`: `slate-indigo`, `sunset`, `emerald`,
  `midnight`, `cyberpunk`).

There is no database, sign-in or payment system: recent results are remembered in the visitor's browser. You can
add your own auth or payments later (for example NextAuth and Stripe) in front of `/api/generate`.

API reference: https://aiskills.team/api-keys (sections “Endpoints”, “Errors”).

---

## По-русски

Черновые заметки на входе — аккуратное резюме на одну страницу на выходе: ИИ переписывает опыт сильными глаголами и результатами, подстраивает под вакансию, а страница верстает лист для печати или PDF.

**Как запустить:** создайте ключ на https://aiskills.team/api-keys → нажмите **Deploy with Vercel** выше →
вставьте ключ в `AISKILLS_API_KEY` → готово. Генерации оплачиваются с вашего баланса AI SKILLS по ценам сайта,
неудачные возвращаются автоматически. Перед тем как делиться ссылкой на сайт, поставьте ключу лимит
расходов и при желании задайте `ACCESS_CODE`. Интерфейс — английский и русский (переключатель EN/RU в шапке).

## License

MIT — see [LICENSE](LICENSE). Based on an MIT-licensed open-source template, modified by AI SKILLS.
