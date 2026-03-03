<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/16f5a8b0-9fb2-4a12-a716-8f1a249a4ad7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Déploiement GitHub Pages (gratuit)

- Pousse le projet sur GitHub (branche `main`).
- Dans **Settings → Pages**, sélectionne **Source: GitHub Actions**.
- Le site sera accessible sur `https://<tonPseudo>.github.io/chez-madeleine---rouffach/`.

> Si ton repo n'est pas nommé `chez-madeleine---rouffach`, modifie `base` dans `vite.config.ts`.
