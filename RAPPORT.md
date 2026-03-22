# Rapport — TD3A « Dépôt de messages » (client + micro-service)

*À adapter / compléter avant rendu sur Edunao.*

## 1. Objectif

Réaliser une interface web (HTML/CSS/JS) pour afficher et poster des messages, puis un **micro-service Node.js (Express)** exposant des routes HTTP en **GET** pour stocker et lire des messages en mémoire, et enfin **connecter le client au serveur** via `fetch` (JSON).

Références : [TD Partie 1](https://wdi.centralesupelec.fr/appliouaibe/TD3Apart1), [TD Partie 2](https://wdi.centralesupelec.fr/appliouaibe/TD3Apart2).

## 2. Structure du dépôt

| Dossier | Contenu |
|---------|---------|
| `ClientSide/` | `index.html`, `style.css`, `script.js` — interface utilisateur |
| `ServerSide/` | `index.js` (Express), `package.json` — API + fichiers statiques du client |

Organisation choisie : **séparation client / serveur** dans deux dossiers distincts.

## 3. Structure de données côté serveur

- Tableau en mémoire **`messages`** : liste d’objets `{ text, pseudo, date }`.
- Numérotation des messages **à partir de 1** pour les routes `get` / `del` et pour le numéro renvoyé par `post`.
- Les données sont **volatiles** : elles sont perdues au redémarrage du processus Node.

## 4. Routes HTTP implémentées (micro-service)

*(Lister celles que tu as codées et testées : `/test/...`, `/cpt/...`, `/msg/...`.)*

## 5. Côté client (AJAX)

- Chargement initial : **`GET /msg/getAll`** → peuplement de la liste.
- Envoi : **`GET /msg/post/:msg?pseudo=...`** (conforme au sujet qui impose des GET pour les tests navigateur).
- URL du micro-service **paramétrable** (champ dans la page) pour tester un serveur d’un camarade (§3.4 du TD).

## 6. Choix techniques

- **Express** pour le routage et le service des fichiers statiques (`ClientSide` servi depuis la même origine en local).
- **CORS** sur le serveur pour permettre l’ouverture du HTML en `file://` ou depuis un autre port.
- **`fetch` + `async/await`** pour les appels asynchrones.

## 7. Déploiement

*(Indiquer ici les liens une fois en ligne : Render ou autre.)*

- Lien du service web (API + interface si servie par Node) : **…**
- Lien du dépôt GitHub / GitLab : **…**

## 8. Difficultés / limites

*(Ex. : messages uniquement en mémoire, longueur des URLs pour `GET /msg/post/...`, etc.)*
