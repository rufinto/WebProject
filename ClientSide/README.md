# ClientSide — Interface « Dépôt de messages » (TD3A)

## Utilisation recommandée

Lancer le serveur Node depuis **`ServerSide/`** :

```bash
cd ../ServerSide
npm start
```

Puis ouvrir dans le navigateur : **`http://localhost:8080/`**

L’interface charge les messages via **`fetch`** sur **`GET /msg/getAll`** et envoie un nouveau message avec **`GET /msg/post/...?pseudo=...`**.

## Mode `file://`

Si tu ouvres `index.html` directement depuis le disque, renseigne l’URL du micro-service dans le champ **« URL du micro-service »** (ex. `http://localhost:8080`).

Référence sujet : [TD Partie 2](https://wdi.centralesupelec.fr/appliouaibe/TD3Apart2).
