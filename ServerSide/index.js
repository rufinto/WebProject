/**
 * TD3A Partie 2 — Express + routes /test + compteur + messages + client statique (§3)
 * Voir : https://wdi.centralesupelec.fr/appliouaibe/TD3Apart2
 *
 * Après `npm install`, lancer : npm start
 * Puis ouvrir : http://localhost:8080/ (interface ClientSide)
 */

const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

// CORS : permet d’ouvrir le HTML en local (file://) ou depuis un autre port
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// --------------------
// §2.1 — Micro-service configuration
// --------------------

/**
 * Route GET /test/[quelquechose]
 * Ex. GET /test/blihblah → { "msg": "blihblah" }
 * Le segment après /test/ peut contenir des caractères encodés (%20 pour un espace).
 */
app.get("/test/:segment", (req, res) => {
  const raw = req.params.segment ?? "";
  let decoded;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }
  res.json({ msg: decoded });
});

// --------------------
// §2.3 — Micro-service avec un état : compteur
// --------------------

/** Compteur global, initialisé à 0 au démarrage du serveur */
let cpt = 0;

/** true si la chaîne représente un entier (ex. "42", "-3"), pas "12.5" ni "abc" */
function estEntier(str) {
  return /^-?\d+$/.test(String(str).trim());
}

/** GET /cpt/query — valeur courante du compteur (JSON) */
app.get("/cpt/query", (req, res) => {
  res.json({ value: cpt });
});

/**
 * GET /cpt/inc — sans paramètre : +1 ; avec ?v=XXX : +XXX si XXX est un entier
 * Réponses : { "code": 0 } en cas de succès, { "code": -1 } si v n'est pas un entier (compteur inchangé)
 */
app.get("/cpt/inc", (req, res) => {
  const v = req.query.v;

  if (v === undefined) {
    cpt += 1;
    return res.json({ code: 0 });
  }

  if (!estEntier(v)) {
    return res.json({ code: -1 });
  }

  cpt += parseInt(String(v).trim(), 10);
  return res.json({ code: 0 });
});

// --------------------
// §2.4 — Micro-service de gestion de messages
// --------------------

/**
 * Messages : objets { text, pseudo, date } (étendu pour §3.2 du TD)
 * Les routes restent en GET comme dans l’énoncé.
 */
const messages = [
  { text: "Hello World", pseudo: "Demo", date: "" },
  { text: "foobar", pseudo: "Demo", date: "" },
  { text: "CentraleSupelec Forever", pseudo: "Demo", date: "" },
];

function cloneMessage(m) {
  return { text: m.text, pseudo: m.pseudo ?? "", date: m.date ?? "" };
}

/**
 * Décode le segment d’URL (équivalent pratique à unescape pour %20, etc.)
 * @param {string} raw
 */
function decodeMessageSegment(raw) {
  if (raw == null) return "";
  try {
    return decodeURIComponent(String(raw));
  } catch {
    return String(raw);
  }
}

/** GET /msg/getAll — tableau JSON de tous les messages (objets) */
app.get("/msg/getAll", (req, res) => {
  res.json(messages.map(cloneMessage));
});

/** GET /msg/nber — nombre de messages (entier JSON) */
app.get("/msg/nber", (req, res) => {
  res.json(messages.length);
});

/**
 * GET /msg/get/:num — message d’indice num (1 = premier message)
 * Succès : { "msg": { text, pseudo, date } } ; sinon : { "msg": null }
 */
app.get("/msg/get/:num", (req, res) => {
  const num = parseInt(req.params.num, 10);
  if (!Number.isInteger(num) || num < 1 || num > messages.length) {
    return res.json({ msg: null });
  }
  res.json({ msg: cloneMessage(messages[num - 1]) });
});

/**
 * GET /msg/post/:msg — ajoute un message ; renvoie le numéro du nouveau message (1-based)
 * Optionnel : ?pseudo=... (URL-encodé) pour associer un pseudo (§3 du TD)
 */
app.get("/msg/post/:msg", (req, res) => {
  const text = decodeMessageSegment(req.params.msg);
  const rawPseudo = Array.isArray(req.query.pseudo)
    ? req.query.pseudo[0]
    : req.query.pseudo;
  const pseudo =
    rawPseudo != null && String(rawPseudo).trim() !== ""
      ? decodeMessageSegment(rawPseudo)
      : "Anonyme";
  const date = new Date().toLocaleString("fr-FR");
  messages.push({ text, pseudo, date });
  res.json(messages.length);
});

/**
 * GET /msg/del/:num — supprime le message n° num (1-based)
 * Succès : { "code": 0 } ; échec (indice invalide) : { "code": -1 }
 */
app.get("/msg/del/:num", (req, res) => {
  const num = parseInt(req.params.num, 10);
  if (!Number.isInteger(num) || num < 1 || num > messages.length) {
    return res.json({ code: -1 });
  }
  messages.splice(num - 1, 1);
  res.json({ code: 0 });
});

// --------------------
// §3 — Fichiers statiques : interface ClientSide sur la même origine
// --------------------

app.use(express.static(path.join(__dirname, "..", "ClientSide")));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
  console.log(`Client web : http://localhost:${PORT}/`);
});
