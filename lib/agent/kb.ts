import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What SnapDemo does",
    keywords: ["SnapDemo", "screenshot-to-demo", "what", "product", "about", "Turn any screenshot into a clickable product demo"],
    body: "Turn any screenshot into a clickable product demo. SnapDemo turns a product screenshot into a clickable demo storyboard — hotspot ideas, narration beats, and a shareable walkthrough outline for PMs and marketers who need a first-pass interactive demo without a full recording studio.",
    source: "SnapDemo product definition",
    tags: [],
  },
  {
    id: "features",
    title: "SnapDemo features",
    keywords: ["features", "feature", "can", "does", "Guided click-through hotspots", "Auto-written step captions", "Shareable demo link", "Export to GIF or embed"],
    body: "SnapDemo includes: Guided click-through hotspots; Auto-written step captions; Shareable demo link; Export to GIF or embed. It does not add capabilities that are not listed here.",
    source: "SnapDemo feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "SnapDemo pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for SnapDemo: $29/month and $290/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "SnapDemo pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use SnapDemo",
    keywords: ["how", "start", "use", "tool", "run", "Build your demo"],
    body: "Open SnapDemo and use Build your demo. The form asks for: Screenshot URL or description; Audience; Demo goal; Number of steps.",
    source: "SnapDemo tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is SnapDemo?",
    keywords: ["What", "is", "SnapDemo?"],
    body: "SnapDemo drafts a clickable demo storyboard from a screenshot description.",
    source: "SnapDemo FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "Who should use it?",
    keywords: ["Who", "should", "use", "it?"],
    body: "PMs, marketers, and founders who need a first-pass interactive walkthrough.",
    source: "SnapDemo FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Does it record video for me?",
    keywords: ["Does", "it", "record", "video", "for", "me?"],
    body: "No. It plans hotspots and narration; you build the demo in your tool.",
    source: "SnapDemo FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about SnapDemo are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "SnapDemo support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
