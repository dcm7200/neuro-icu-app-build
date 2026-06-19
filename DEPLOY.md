# Deployment Guide

## Stack
- **App server:** Vercel (Next.js)
- **Database:** Supabase (PostgreSQL)
- **iOS:** Capacitor → Codemagic → TestFlight

---

## Step 1 — Deploy to Vercel

Open PowerShell in this folder and run:
```
vercel
```

When prompted:
- Log in / create account at vercel.com
- Project name: `neuro-icu-app`
- Root directory: `./`
- Override settings: No

Then add environment variables:
```
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```
(Values are in .env.local — DO NOT commit that file)

Then deploy:
```
vercel --prod
```

---

## Step 2 — Update Capacitor URL

Once you have your Vercel URL (e.g. `https://neuro-icu-app.vercel.app`),
update `capacitor.config.ts`:

```ts
server: {
  url: 'https://YOUR-APP.vercel.app',  // ← replace this
}
```

---

## Step 3 — Push to GitHub

1. Download GitHub Desktop: https://desktop.github.com
2. File → Add Local Repository → pick this folder
3. Create a new repo (private recommended for clinical content)
4. Commit all files → Push

---

## Step 4 — Set up Codemagic

1. Sign up at https://codemagic.io (free tier works)
2. Add app → Connect GitHub → select this repo
3. Codemagic will detect `codemagic.yaml` automatically
4. Go to **Integrations** → **Developer Portal** → connect Apple Developer account:
   - Log in with your Apple ID
   - Select team
   - Codemagic handles provisioning profiles and signing certificates automatically
5. Go to **Teams** → create a TestFlight group called `NCC Team`

---

## Step 5 — Trigger a Build

In Codemagic, click **Start build** → select `ios-testflight` workflow.

Build takes ~15 min. When done:
- IPA is signed and uploaded to TestFlight automatically
- You'll get an email from Apple
- Open TestFlight on your iPhone → install

---

## Updating the App Later

Content changes (lessons, quizzes) → update via admin panel or scripts → live immediately on Vercel, no rebuild needed.

Code/UI changes → push to GitHub → trigger new Codemagic build.

---

## Bundle ID
`org.barrowneuro.nccapp`

Make sure this matches in:
- `capacitor.config.ts`
- Apple Developer portal (App ID)
- Codemagic iOS signing settings
