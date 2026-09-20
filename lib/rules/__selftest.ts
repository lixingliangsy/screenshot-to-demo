/**
 * Deterministic self-test for screenshot-to-demo core logic (§5 Verify, §9.8).
 * Run: tsx lib/rules/__selftest.ts
 *
 * This product is a demo-walkthrough generator (no deterministic ruleset). The
 * §3 domain standard is real demo/sharing features: click-through hotspots,
 * step captions, shareable link, GIF/embed export. We assert the mock walkthrough
 * covers these real features and labels itself (no silent mock), and the system
 * prompt produces numbered steps with captions.
 */
import { PRODUCT } from '../product'

let passed = 0
let failed = 0
function assert(cond: boolean, msg: string) {
  if (cond) { passed++; console.log('  PASS:', msg) }
  else { failed++; console.error('  FAIL:', msg) }
}

console.log('screenshot-to-demo selftest')

const mockOut = (PRODUCT as any).mock({
  screenshot: 'an analytics dashboard',
  audience: 'Enterprise buyers',
  goal: 'show how to invite a teammate',
  steps: '5 steps',
})
const sp = (PRODUCT as any).systemPrompt as string

// 1) Demo mock labels itself honestly (no silent mock).
assert(/mock demo/i.test(mockOut), 'mock output labeled "(mock demo)"')
assert(/Add OPENAI_API_KEY/i.test(mockOut), 'mock directs user to enable real AI')

// 2) Mock walkthrough covers real demo features (§3: hotspots / captions / share link / export).
assert(/hotspot/i.test(mockOut), 'walkthrough includes click-through hotspots')
assert(/caption/i.test(mockOut), 'walkthrough includes step captions')
assert(/share|link/i.test(mockOut), 'walkthrough includes shareable link')
assert(/Step\s*\d/i.test(mockOut), 'walkthrough has numbered steps')

// 3) System prompt requires numbered steps + captions + CTA.
assert(/numbered steps/i.test(sp.toLowerCase()) || /number/i.test(sp), 'system prompt requires numbered steps')
assert(/caption/i.test(sp), 'system prompt requires captions')
assert(/call to action/i.test(sp.toLowerCase()), 'system prompt requires a call to action')

console.log(`\nscreenshot-to-demo selftest: ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
