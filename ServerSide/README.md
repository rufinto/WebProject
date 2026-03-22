# ServerSide — Micro-service (TD3A Partie 2)

## Installation

```bash
cd ServerSide
npm install
```

## Lancer le serveur

```bash
npm start
```

La console doit afficher : `App listening on port 8080...`

## §3 — Interface web (ClientSide)

Le serveur sert aussi les fichiers statiques du dossier **`../ClientSide`** sur la **même origine** :

- Ouvre **`http://localhost:8080/`** dans le navigateur pour l’interface « Dépôt de messages ».
- Le client appelle **`GET /msg/getAll`** au chargement et **`GET /msg/post/...?pseudo=...`** à l’envoi (voir le TD §3).

Si tu ouvres `ClientSide/index.html` en **fichier local** (`file://`), renseigne l’URL du micro-service dans le champ prévu (ex. `http://localhost:8080`) : le navigateur autorise alors les requêtes grâce aux en-têtes CORS.

## Tester l’étape 1 (route `/test`)

Dans le navigateur (de préférence Chrome ou Firefox) :

- `http://localhost:8080/test/blihblah` → JSON `{"msg":"blihblah"}`
- `http://localhost:8080/test/hello%20world` → `{"msg":"hello world"}`

## §2.3 — Compteur (`/cpt`)

- `GET /cpt/query` → `{"value":<nombre>}`
- `GET /cpt/inc` → incrémente de **1**, réponse `{"code":0}`
- `GET /cpt/inc?v=5` → incrémente de **5** si `v` est un entier, sinon `{"code":-1}` (compteur **inchangé**)

Exemples : `/cpt/query` puis `/cpt/inc` puis `/cpt/inc?v=3` puis `/cpt/query` (valeur attendue : 4).

## §2.4 — Messages (`/msg`)

Stockage : tableau en mémoire `messages[]` (chaînes), numérotation **à partir de 1** pour `get` / `del` / numéro renvoyé par `post`.

| Route | Effet |
|--------|--------|
| `GET /msg/post/:msg` | Ajoute le message (URL décodée, ex. `%20` → espace). Optionnel : `?pseudo=...`. Réponse : **numéro** du message ajouté (entier JSON). Corps stocké : `{ text, pseudo, date }`. |
| `GET /msg/get/:num` | Récupère le message n° `num`. OK : `{"msg":{...}}`. Sinon : `{"msg":null}`. |
| `GET /msg/getAll` | Tableau JSON de tous les messages (objets `{ text, pseudo, date }`). |
| `GET /msg/nber` | Nombre de messages (entier JSON). |
| `GET /msg/del/:num` | Supprime le n° `num`. OK : `{"code":0}`. Indice invalide : `{"code":-1}`. |

**Scénario de test** : poster 2 messages → `get/1`, `get/2` → `getAll` → `nber` → `del/1` → revérifier `getAll` / `nber`.

Référence sujet : [Micro-Service en Javascript avec NodeJS](https://wdi.centralesupelec.fr/appliouaibe/TD3Apart2).
