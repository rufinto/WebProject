# Déploiement (§3.5 du TD) — ex. [Render](https://render.com/)

Le sujet propose un hébergement en ligne pour exposer le micro-service et éventuellement l’interface. Ici le **serveur Express** sert à la fois l’**API** (`/msg/...`) et les **fichiers statiques** du dossier `ClientSide/`, donc **un seul service web** suffit.

## Prérequis

- Compte Render (ou équivalent).
- Dépôt Git (GitHub / GitLab) contenant ce projet, avec notamment `ServerSide/package.json` et `ServerSide/index.js`.

## Render — Web Service (Node)

1. **New** → **Web Service** → connecter le dépôt.
2. **Root Directory** : si la racine du repo est `WebProject/`, indiquer par ex. `WebProject/ServerSide` (ou le chemin réel vers `ServerSide` dans ton repo).
3. **Runtime** : Node.
4. **Build Command** : `npm install`
5. **Start Command** : `npm start` (exécute `node index.js`).
6. **Environment** :
   - Render injecte souvent **`PORT`** : le code utilise déjà `process.env.PORT || 8080` → OK.

7. Déployer. À la fin, Render fournit une URL du type `https://ton-service.onrender.com`.

## Vérifications après déploiement

- `https://ton-service.onrender.com/msg/nber` → un nombre JSON.
- `https://ton-service.onrender.com/` → la page « Dépôt de messages ».
- Dans la page, le champ **URL du micro-service** peut rester vide si tu utilises la **même** URL (même origine) ; sinon saisir la base `https://ton-service.onrender.com` si tu ouvres le HTML ailleurs.

## Note

Sur l’offre gratuite Render, le service peut **s’endormir** après inactivité : le premier chargement peut être lent.
