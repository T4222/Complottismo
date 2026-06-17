# Quanto sei complottista?

Test psicometrico in 22 domande su 5 categorie.

## Deploy su Vercel (metodo drag & drop — nessun account GitHub necessario)

### Passo 1 — Installa le dipendenze e fai il build
Apri il terminale nella cartella del progetto ed esegui:

```bash
npm install
npm run build
```

Questo crea una cartella `dist/` con il sito compilato.

### Passo 2 — Deploy su Vercel
1. Vai su [vercel.com](https://vercel.com) e crea un account gratuito
2. Dalla dashboard clicca **"Add New Project"**
3. Scegli **"Deploy from existing project"** → trascina la cartella `dist/` nella zona di upload
4. Vercel ti darà un link tipo `https://complottismo-xxx.vercel.app`

### Alternativa — Deploy via CLI
```bash
npm install -g vercel
vercel --prod
```

## Sviluppo locale
```bash
npm install
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173)
