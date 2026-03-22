// --------------------
// 3.1 - Factorielle (TP client — conservé)
// --------------------

function fact(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("fact(n): n doit etre un entier positif");
  }
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function applique(tab, f) {
  return tab.map((x) => f(x));
}

console.log("Factorielle de 6 =", fact(6));

const tab = [0, 1, 2, 3, 4, 5];
console.log("Factorielle de [0..5] =", applique(tab, fact));

console.log("Carres de [0..5] =", applique([0, 1, 2, 3, 4, 5], (x) => x * x));

// --------------------
// §3 — Connexion au micro-service (fetch)
// Voir : https://wdi.centralesupelec.fr/appliouaibe/TD3Apart2
// --------------------

const messagesList = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const apiBaseInput = document.getElementById("apiBase");
const pseudoInput = document.getElementById("pseudoInput");
const loadErrorEl = document.getElementById("loadError");

if (!messagesList || !messageForm || !messageInput || !sendButton) {
  console.warn("Elements manquants dans le DOM: verifier index.html");
}

/** Base URL du serveur (§3.4 : champ paramétrable) */
function getBaseUrl() {
  const raw = apiBaseInput?.value?.trim();
  if (raw) return raw.replace(/\/$/, "");

  if (typeof location !== "undefined" && location.origin && location.origin !== "null") {
    return location.origin;
  }

  return "http://localhost:8080";
}

function setLoadError(msg) {
  if (!loadErrorEl) return;
  if (!msg) {
    loadErrorEl.hidden = true;
    loadErrorEl.textContent = "";
    return;
  }
  loadErrorEl.hidden = false;
  loadErrorEl.textContent = msg;
}

/** Données affichées (synchronisées avec le serveur après chargement) */
let msgs = [];

function renderMessage(li, msg) {
  if (typeof msg === "string") {
    li.textContent = msg;
    return;
  }

  const pseudo = msg?.pseudo ?? "Anonyme";
  const date = msg?.date ?? "";
  const text = msg?.text ?? "";

  li.textContent = `${pseudo}${date ? " • " + date : ""} : ${text}`;
}

function update(list) {
  if (!messagesList) return;

  messagesList.innerHTML = "";

  list.forEach((msg) => {
    const li = document.createElement("li");
    renderMessage(li, msg);
    messagesList.appendChild(li);
  });
}

/**
 * §3.2 — Peupler la liste depuis GET /msg/getAll
 */
async function loadMessages() {
  const base = getBaseUrl();
  setLoadError("");

  try {
    const res = await fetch(`${base}/msg/getAll`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();

    msgs = (Array.isArray(data) ? data : []).map((m) => {
      if (typeof m === "string") {
        return { text: m, pseudo: "", date: "" };
      }
      return {
        text: m?.text ?? "",
        pseudo: m?.pseudo ?? "Anonyme",
        date: m?.date ?? "",
      };
    });

    window.msgs = msgs;
    update(msgs);
  } catch (e) {
    console.error("loadMessages:", e);
    setLoadError(
      `Impossible de charger les messages (${base}). Lance le serveur (npm start dans ServerSide) ou vérifie l’URL.`
    );
  }
}

// Affichage initial depuis le micro-service
loadMessages();

/*
 * §3.1 — Exemple du sujet : premier message dans une alerte (décommenter pour tester)
 *
 * fetch(`${getBaseUrl()}/msg/getAll`)
 *   .then((r) => r.json())
 *   .then((arr) => alert(arr[0]?.text ?? ""));
 */

// Bouton "Mise à jour" : recharger depuis le serveur
const updateButton = document.createElement("button");
updateButton.type = "button";
updateButton.id = "updateButton";
updateButton.textContent = "Mise à jour";

const posterSection = messageForm?.closest("section") || messageForm?.parentElement;
if (posterSection && !posterSection.querySelector("#updateButton")) {
  posterSection.appendChild(updateButton);
}

updateButton.addEventListener("click", () => {
  loadMessages();
});

// Thème clair / sombre
const themeToggleButton = document.createElement("button");
themeToggleButton.type = "button";
themeToggleButton.id = "themeToggleButton";
themeToggleButton.textContent = "Mode sombre";

const header = document.querySelector("header");
if (header && !header.querySelector("#themeToggleButton")) {
  header.appendChild(themeToggleButton);
}

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("theme-dark");
  const isDark = document.body.classList.contains("theme-dark");
  themeToggleButton.textContent = isDark ? "Mode clair" : "Mode sombre";
});

/**
 * §3.3 — Poster via GET /msg/post/:msg?pseudo=...
 * puis rafraîchir la liste.
 */
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const value = messageInput.value.trim();
  if (!value) return;

  const base = getBaseUrl();
  const pseudo =
    (pseudoInput?.value ?? "").trim() || "Anonyme";

  const url = `${base}/msg/post/${encodeURIComponent(value)}?pseudo=${encodeURIComponent(
    pseudo
  )}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await res.json();
    messageInput.value = "";
    await loadMessages();
  } catch (err) {
    console.error("post message:", err);
    setLoadError(`Échec de l’envoi vers ${base}.`);
  }
});

sendButton.addEventListener("click", () => {
  // le submit gère l’envoi
});
