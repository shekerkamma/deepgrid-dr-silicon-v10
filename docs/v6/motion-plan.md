# DeepGrid v6 motion plan: design system, ten part explainers, and motion over the DG32 films

Plan only (2026-10-03). Nothing is built until gate G1 is approved. Source of the approach: Ben AI's
"Opus 5.5 + Claude Design" walkthrough (youtube 6sZAZaQ5SNU) and his `video-motion-graphics` skill, adapted
to this repo's rules (DESIGN.md, PRODUCT.md, claims.ts, story packs, voice.md).

## 1. Outcome

| Deliverable | Count | Where it lands |
|---|---|---|
| DeepGrid design system (Claude Design System + local copy) | 1 | claude.ai design systems; `design-system/` in this repo |
| Part explainer films (one per product page) | 10 | `/products/<slug>` "Inside the part", and `/resources/videos` |
| DG32 films with motion over the static slides | 6 | the same URLs as today (`public/media/*.mp4`), old versions kept until approved |
| LinkedIn carousels (one per part) | 10 | downloads + a skill that regenerates them |

Success means: every film opens on the problem, carries one idea per beat, uses only figures on the product page,
passes the narration and motion gates in section 6, and reads as the same brand as the site.

## 2. Decisions (made; reasons in brackets)

1. **All ten parts get an explainer, not a pilot of one.** The storyboards for all ten exist already
   (`content-ideas runs/2026-10-03-arch-storyboards`), each 5 to 7 beats tied to the diagram's markers, so the
   input is ready. One part goes first only as the **look pilot** (gate G3); the other nine follow the approved look.
2. **Engine: HyperFrames, with Ben AI's motion rules and review process adopted.** HyperFrames is already this
   machine's video framework (HTML compositions, local Kokoro voice, captions). Ben's skill needs Remotion and
   whisper.cpp and has no licence file in the zip, so it is not installed or copied. What is adopted, in our own
   words: story-first beats, storyboard approval before code, one scene per review board, and his motion rules
   (one travel direction, a carrier across cuts, no idle motion, a short hold before the payoff, labels not
   sentences, never invent numbers).
3. **Narrated, captioned, Holt voice.** Kokoro `bm_george`, 140 to 155 spoken wpm (the Holt profile already used
   for the DG32 films), captions burned in and as a `.vtt` track. Silent autoplay on the page shows captions.
4. **The design system is built from the live site, not invented.** Ink ground, copper the one accent, teal only
   for the safe state, Newsreader / Inter / JetBrains Mono. A local copy makes the same tokens usable by the
   films, the carousels and (optionally) a later reskin of the nine decks, whose palette today is the deck kit's.
5. **Existing DG32 films keep their narration bit for bit.** Motion replaces or overlays the static slide picture
   only, timed from the existing `.vtt` captions; the audio stream is verified unchanged by checksum.
6. **Look options before building (the "tweak panel" lesson).** The look is chosen from 3 rendered variants of
   one scene, not decided by me after the fact.

## 2a. Revision, 2026-10-03: Google Vids as the explainer engine (user: "Vids looks more promising")

Assessed against this machine's proven Vids lane (content-ideas CLAUDE.md, Aug 29-31: a 30-slide deck became an
8:55 1080p MP4 with per-scene AI voiceover and captions; driver scripts in
`runs/2026-08-29-deepgrid-financial-model-deck-rebuild/video/vids/`; authenticated profile
`~/.cache/vids-automation-profile` still present) and Google's 2026 updates (Gemini TTS voices, 24 voice
languages incl. Hindi and Telugu, Veo 3.1 clips, avatars, scripts generated from speaker notes, 10-minute and
45-scene limits with AI on).

**Decision: Vids for the ten part explainers; HyperFrames / ffmpeg only where Vids cannot do the job.**

| Job | Engine | Why |
|---|---|---|
| Ten part explainers | **Google Vids**, from the nine reviewed architecture decks + the DG32-LITE deck | The decks already carry the story, the native architecture slide and speaker notes; Vids turns each slide into a narrated, animated scene with a far better voice than Kokoro; the lane is proven here |
| Narration text | ours, not Vids-written | Vids writes narration from slide content, which recites the slide; paste the storyboard narration per scene (`replace_all.mjs`), verify read-back (`verify_all.mjs`) |
| Marker-by-marker motion on the architecture slide | HyperFrames clip composited into the Vids export, only if Vids' element animation does not carry the reading path | Vids animates elements on entry; it cannot light blocks in reading order |
| Motion over the six DG32 films | ffmpeg + HyperFrames overlays | Vids imports slides as stills and would re-voice; the films' narration must stay bit for bit |
| Avatars, Veo clips | not used | Generated imagery cannot carry an accurate architecture, and illustrations establish no claim |

**Known Vids traps to guard (each cost a cycle before):** voice reverts on reload (pick voice and "Update all
voiceovers" in one session, on the All scenes tab, confirm the dialog); scene re-timing after a voice change
(measure after the "outdated" badges clear); a fast export can be a stale render (compare duration to the
editor); background "music" can be a stray speech track (remove the bed structurally, verify on the caption
stream, count digital silence); default pace ~192 wpm (target 140-155 spoken wpm by voice choice and scene
holds); Drive same-name upload waits on a hidden dialog.

**Gates change:** G2 (look) becomes "pick a Vids voice and animation style on the SKU-3 deck"; G4 pilot is the
SKU-3 Vids export; the other nine follow in batches. P6 (DG32 films) and P7 (carousels) are unchanged.

## 2b. Revision, 2026-10-03: ElevenLabs voice, no Vids voiceover

User: "why can't we combine ElevenLabs for voice". Decision: **ElevenLabs + `narrated-deck-film`**, with the decks'
own native PowerPoint build animations (`pptx-design-quality` `plan_motion.py` / `apply_motion.py`, rendered by
PowerPoint), instead of Vids. This removes every Vids voiceover and export trap in 2a, and keeps our exact script.

- **Voice:** the account's cloned "DeepGrid Founder Voice" (voice id `xqmZGpVMlMzAiUYMY0NQ`, made from the DGRID
  Softmax engine video), `eleven_multilingual_v2`. Pace measured on spoken words, target 140-155 wpm.
- **Account:** Creator tier, active; 128,674 of 131,000 characters used this cycle; resets 2026-10-10.
  2,326 characters remain now.
- **Budget (corrected):** a 60-75 s explainer at 150 wpm is 150-190 words, about 900-1,150 characters.
  Ten explainers are about 11,000 characters; with one full re-voice, about 22,000. So the SKU-3 pilot fits in
  what remains today, and the other nine run after the 10 Oct reset (or sooner with usage-based billing).
- **Key handling:** the key is read at runtime from the DeepGrid batch script on D: and never copied or printed;
  moving it to the two-layer env convention (`~/.bashrc` + `.claude/settings.local.json`) is recommended.
- Vids stays available for a polished alternative cut, not the default.

## 2c. Decision, 2026-10-03: voice model and delivery (measured, five takes)

Design system approved (G1). User asked for Holt-like human pauses and emotion, then for a measured decision.
**`eleven_v3`**, Founder Voice, stability 0.5: emotion tags only at the arc points (`[thoughtful]` opening,
`[serious]` on what is unproven, `[confident]` close), pauses from punctuation (comma, full stop, ellipsis for a
transition), no `[pause]` tags. Take D measured 140 wpm, pauses 0.18 to 1.57 s, pitch range 6.4 semitones against
4.4 for `multilingual_v2` with break tags (exact pauses, flat read). `eleven_v4` is on the account but undocumented
and ignored `speed: 0.9` (177 wpm), so it is not used. Record and table:
`content-ideas runs/2026-10-03-founder-voice-sample/DECISION.md`. Gate per take: 140 to 155 spoken wpm, no pause
over 1.6 s, Whisper transcript equal to the script.

## 3. Phases and gates

```
P0 Plan ............................................. G0  you approve this plan
P1 Design system .................................... G1  you approve the design system
P2 Look pilot (one scene, 3 variants) ............... G2  you pick a look
P3 Storyboards for 10 explainers (scene lists) ...... G3  you approve all ten on one review page
P4 Pilot explainer (SKU-3), full render ............. G4  you approve the pilot film
P5 Nine explainers in batches of three .............. per-film QA; spot review
P6 DG32 films: fault-path pilot, then five more ..... G5  you approve the fault-path film first
P7 Carousels (10) and the carousel skill ............ G6  you approve one carousel style
P8 Site integration, QA, deploy ..................... G7  you approve before push
```

### P1 Design system
- Build a Claude Design System from https://shekerkamma.github.io/deepgrid-dr-silicon-v6/ plus `DESIGN.md`
  (colours, type roles, spacing, radii, the Don'ts), with the logo from `public/`.
- Iterate once on its live artifact; then save a copy to `design-system/` (README, tokens, anti-slop rules).
- Check: contrast pairs pass (`skills/design-tokens/scripts/check.sh` on the token file).

### P2 Look pilot
- One scene (SKU-3 beat 1: the 28 V bus entering input conditioning), rendered 3 ways at 1920×1080:
  A. diagram-led (the real block diagram, camera moves between zones, copper highlight on the active block);
  B. kinetic type + icons over a simplified block strip;
  C. one-world pan across a stylised die, blocks as stations.
- Each as a 4 to 6 second clip on one review board; you pick, or mix.

### P3 Storyboards
- Per part: 5 to 7 scenes from its storyboard beats, plus an opening "problem" scene and a closing "what is
  unproven" scene. Each scene: on-screen words (2 to 6), narration line, the marker it lands on, the motion.
- Target length 45 to 75 seconds per part. Narration is written for the ear, gated for slide echo
  (`narrated-deck-film/scripts/check_narration.py`), and every number traced to the product page.
- One review page with all ten storyboards; comments per part.

### P4 / P5 Explainers
- Build per scene, render each scene and the full film; review board with the film plus one board per scene.
- Batches of three in parallel, one review per batch.

### P6 Motion over the DG32 films (34 minutes of existing narration)
| Film | Length | Treatment |
|---|---|---|
| The fault path, explained | 1:28 | pilot: full motion over every slide |
| DG32-LITE system architecture | 7:43 | motion on the diagram and data-flow segments |
| DG32-2DOM system architecture | 6:16 | motion on the bridges and engine pipeline |
| DG32-LITE datasheet | 5:33 | motion only where a figure moves (timing, pins); tables stay still |
| DG32-2DOM datasheet | 4:19 | same rule |
| DG32-LITE tape-in | 5:30 | motion on the sign-off gates and pad plan |
- Segments come from the `.vtt` caption timings; each motion clip is a full-frame cutaway or an overlay panel.
- The narration, captions and slide order do not change.

### P7 Carousels
- 8 to 10 slides per part: cover (headline), one slide per beat (max ~25 words), the honest close, a call to
  action. 1080×1350. Built with `ai-graphics` / `social-media-team` conventions; saved as a skill with the style.

### P8 Integration and deploy
- Product pages: the explainer sits at the top of "Inside the part" (poster, captions, no autoplay with sound).
- `/resources/videos`: a "Ten parts in a minute each" group; the six DG32 films replaced in place once approved.
- e2e-qa-review full run (sweep, nav gate, lanes, visual round), then push and verify live.

## 4. Inputs (all exist)
Storyboards and section stories (runs/2026-10-03-arch-storyboards), product pages (value authority), guides,
draw.io diagrams and SVGs, the nine decks' story packs, DG32 films + `.vtt` captions, DESIGN.md, PRODUCT.md,
claims.ts, voice.md.

## 5. Tools
HyperFrames (composition, render), Kokoro `bm_george` (voice, local, free), ffmpeg (mux, checks), Playwright
(stills and contact sheets), Claude Design canvas (review boards with comments), Artifact design-system type.
No paid image or video model.

## 6. Quality gates (every film)
- Story: opens on the problem; one idea per scene; ends on what is unproven plus the next step.
- Claims: every number on screen or spoken is on the product page; standards only "designed toward"; no market
  figures; nothing in `withheld`.
- Narration: 140 to 155 spoken wpm; slide-echo gate passes; decoded duration matches the timeline.
- Motion: contact sheet of each scene's settled frame and one mid-move frame, looked at; no dead hold longer than
  the planned pause; one travel direction; nothing under 28 px at 1080p; teal only for the safe state.
- Delivery: H.264 + AAC, faststart, under 25 MB per explainer; captions `.vtt`; poster frame with real variance.
- For DG32 films: audio stream MD5 identical before and after.

## 7. Risks
- **Token and time cost.** 10 films plus 6 reworks is large; batches of three keep review manageable.
- **Look drift across ten films.** Mitigated by one approved look and shared scene components.
- **Usage limits mid-batch.** Each agent works from files on disk and resumes where it stopped.
- **Kokoro speed is non-linear per tool** (known); pace is measured on spoken words, one scene first.

## 2d. Revision, 2026-10-03: DG32 films measured before overlaying

`film-motion-overlay/scripts/motion_profile.py` on all six films: five are 96-97 % still with holds of
31-33 s (LITE + 2DOM architecture, LITE + 2DOM datasheet, LITE tape-in). The fault-path film is 15 % still
with no hold over 1 s: it is already motion graphics, so it is **out of scope** and is no longer the pilot.
Its "27 cycles" frame is a counter caught mid-count (5 → 20 → 35 → 39); it settles on 39, matching claims.ts.

**Pilot: DG32-2DOM datasheet (4:19).** Each caption cue moves a gentle camera (at most 1.12x) to the card
the sentence names, from the deck's own text-box geometry (inspect.ndjson): 35 of 38 cues matched. Audio
packets, decoded audio and subtitle text are identical to the original by MD5; the untouched original
checked against itself fails 28 motion checks (negative control). Accent is the deck's cyan `#0077A3`,
not the new copper. Output: `content-ideas/runs/2026-10-03-film-motion-overlay/dg32-2dom-datasheet/out/`.
G5 now gates on this pilot; the other four follow it.

Carousels (P7): `storyboard-to-carousel` built, SKU-3 pilot rendered (9 slides + PDF). G6 gates on it.
