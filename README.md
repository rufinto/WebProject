# WebProject — TD3A Dépôt de messages (client + micro-service)

Projet pour la mineure Applications Web : interface **HTML/CSS/JS** + **micro-service Node.js (Express)** + liaison **`fetch`**.

- **Partie 1 (client)** : [TD3Apart1](https://wdi.centralesupelec.fr/appliouaibe/TD3Apart1)  
- **Partie 2 (serveur + AJAX + déploiement)** : [TD3Apart2](https://wdi.centralesupelec.fr/appliouaibe/TD3Apart2)

## Arborescence

```
WebProject/
├── ClientSide/          # Interface (index.html, style.css, script.js)
│   └── README.md
├── ServerSide/          # API Express + service des fichiers statiques
│   ├── index.js
│   ├── package.json
│   ├── README.md
│   ├── DEPLOY.md        # Déploiement (ex. Render)
│   └── render.yaml      # Blueprint Render (optionnel)
├── RAPPORT.md           # Gabarit de rapport pour Edunao
└── README.md            # Ce fichier
```

## Lancer en local

### 1. Serveur (obligatoire pour l’API + la page sur la même origine)

```bash
cd ServerSide
npm install
npm start
```

- API : `http://localhost:8080/msg/getAll`, etc.  
- Interface : **`http://localhost:8080/`**

### 2. Client seul (`file://`)

Ouvre `ClientSide/index.html` et renseigne l’URL du micro-service (ex. `http://localhost:8080`) grâce au champ prévu dans le formulaire.

## Livrable (Edunao)

- Code fonctionnel **client + serveur**  
- **Rapport** : partir de `RAPPORT.md` et compléter  
- **Liens** : dépôt Git + URL de déploiement (voir `ServerSide/DEPLOY.md`)
