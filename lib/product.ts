export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  priceMonthly: 29,
  priceYearly: 290,
  name: "SnapDemo",
  slug: "screenshot-to-demo",
  productId: "PROD_0px6nFFBmt2zOjZE6L9pZe",
  yearlyProductId: "PROD_2OX6NPruR50wm9Ybj3iel2",
  checkoutUrl: "",
  tagline: "Turn any screenshot into a clickable product demo",
  description: "Upload a screenshot of your app and SnapDemo generates a guided, step-by-step product walkthrough with hotspots, captions, and a shareable link  -  no video editing, no code.",
  toolTitle: "Build your demo",
  resultLabel: "Your demo script",
  ctaLabel: "Generate demo",
  features: [
  "Guided click-through hotspots",
  "Auto-written step captions",
  "Shareable demo link",
  "Export to GIF or embed"
],
  inputs: [
  {
    "key": "screenshot",
    "label": "Screenshot URL or description",
    "type": "textarea",
    "placeholder": "Paste an image link or describe the screen you want to turn into a demo"
  },
  {
    "key": "audience",
    "label": "Audience",
    "type": "select",
    "options": [
      "New users",
      "Enterprise buyers",
      "Investors"
    ]
  },
  {
    "key": "goal",
    "label": "Demo goal",
    "type": "input",
    "placeholder": "e.g. show how to invite a teammate"
  },
  {
    "key": "steps",
    "label": "Number of steps",
    "type": "select",
    "options": [
      "3 steps",
      "5 steps",
      "8 steps"
    ]
  }
] as InputField[],
  definitionLead: "SnapDemo turns a product screenshot into a clickable demo storyboard — hotspot ideas, narration beats, and a shareable walkthrough outline for PMs and marketers who need a first-pass interactive demo without a full recording studio.",
  geoFaq: [
    { q: "What is SnapDemo?", a: "SnapDemo drafts a clickable demo storyboard from a screenshot description." },
    { q: "Who should use it?", a: "PMs, marketers, and founders who need a first-pass interactive walkthrough." },
    { q: "Does it record video for me?", a: "No. It plans hotspots and narration; you build the demo in your tool." },
    { q: "What inputs do I need?", a: "What the screenshot shows, audience, and the action you want viewers to take." },
    { q: "Does it guarantee conversion?", a: "No. It is decision-support storyboarding, not a growth guarantee." },
    { q: "Can it invent UI that is not in the shot?", a: "No. Stay honest to the screenshot; flag missing screens separately." },
  ],
  systemPrompt: "You are an expert product-demonstration copywriter. Based on the provided screenshot URL or description, write a guided, step-by-step product walkthrough. Use the given audience and goal to set the tone, and produce the requested number of clearly numbered steps. Each step must name the screen element to highlight and a short caption explaining the action and its benefit. End with a one-line call to action. Output only the walkthrough, no preamble.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "2 demos/month, watermarked, shareable link"
  },
  {
    "tier": "Starter",
    "price": "$29/mo",
    "desc": "Unlimited demos, no watermark, hotspots & captions"
  },
  {
    "tier": "Pro",
    "price": "$59/mo",
    "desc": "Everything in Starter + GIF export, embeds, team workspace"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const screen = inputs['screenshot'] || 'your app screenshot'
  const aud = inputs['audience'] || 'New users'
  const goal = inputs['goal'] || 'show the core workflow'
  const steps = inputs['steps'] || '5 steps'
  return `Demo walkthrough - ${goal}

Based on: ${screen}
Audience: ${aud} | Length: ${steps}

Step 1  -  Open the dashboard. Point to the top nav and welcome the viewer.
Step 2  -  Trigger the action. Highlight the primary button and explain what happens next.
Step 3  -  Show the result. Caption the confirmation screen and note the key benefit.
Step 4  -  Share or export. Offer the copy link so the viewer can replay anytime.
Step 5  -  Call to action. End with the exact next step you want them to take.

Tip: add hotspots on each step so viewers click through at their own pace.

---
(Audience: ${aud} | This is a mock demo. Add OPENAI_API_KEY for real generation.)`
}
}
