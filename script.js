
// --------------------
// 3.1 - Factorielle
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
  // Applique f a chaque element et renvoie les resultats (meme taille).
  return tab.map((x) => f(x));
}

console.log("Factorielle de 6 =", fact(6));

// Exemple avec `applique` et la fonction `fact`
const tab = [0, 1, 2, 3, 4, 5];
console.log("Factorielle de [0..5] =", applique(tab, fact));

// Exemple avec `applique` et une fonction anonyme
console.log("Carres de [0..5] =", applique([0, 1, 2, 3, 4, 5], (x) => x * x));

// --------------------
// 3.2/3.3 - Messages 
// --------------------

const messagesList = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

if (!messagesList || !messageForm || !messageInput || !sendButton) {
  // Evite les erreurs si le HTML change.
  console.warn(
    "Elements manquants dans le DOM: verifier les ids dans index.html"
  );
}

// `msgs` peut etre:
// - un tableau de strings (cas 3.2)
// - ou un tableau d'objets { pseudo, date, text } (cas 3.3)
// Pour satisfaire 3.3, on initialise directement au format objet.
let msgs = [
  {
    pseudo: "Alice",
    date: "20/03/2026 10:00",
    text: "Message 1 : Bonjour !",
  },
  {
    pseudo: "Bob",
    date: "20/03/2026 10:05",
    text: "Message 2 : Comment ca va ?",
  },
  {
    pseudo: "Charly",
    date: "20/03/2026 10:12",
    text: "Message 3 : Ceci est un exemple.",
  },
  {
    pseudo: "Dana",
    date: "20/03/2026 10:20",
    text: "Message 4 : Dernier detail avant le JS.",
  },
  {
    pseudo: "Eve",
    date: "20/03/2026 10:30",
    text: "Message 5 : A vous de jouer !",
  },
];

function renderMessage(li, msg) {
  // Supporte strings (3.2) et objets (3.3)
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

  // Efface la liste
  messagesList.innerHTML = "";

  // Cree un nouvel <li> pour chaque element
  list.forEach((msg) => {
    const li = document.createElement("li");
    renderMessage(li, msg);
    messagesList.appendChild(li);
  });
}

// Affichage initial
update(msgs);

// 3.3 - Bouton "Mise a jour" (re-render uniquement)
const updateButton = document.createElement("button");
updateButton.type = "button";
updateButton.id = "updateButton";
updateButton.textContent = "Mise a jour";
updateButton.style.marginTop = "10px";

const posterSection = messageForm.closest("section") || messageForm.parentElement;
if (posterSection && !posterSection.querySelector("#updateButton")) {
  posterSection.appendChild(updateButton);
}

updateButton.addEventListener("click", () => update(msgs));

// 3.3 - Theme clair/sombre (bouton en haut a droite du header)
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

// 3.2/3.3 - Action sur le bouton principal:
// - si l'utilisateur ecrit quelque chose, on ajoute un nouveau message (pseudo + date)
// - sinon, on se contente de re-render pour tester la variable `msgs` (3.2)
function demanderPseudo() {
  const p = prompt("Quel pseudo pour ce message ?", "Anonyme");
  const pseudo = (p ?? "").trim();
  return pseudo.length ? pseudo : "Anonyme";
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = messageInput.value.trim();

  if (value.length > 0) {
    // Nouveau message associe a un pseudo + date.
    const nouveau = {
      pseudo: demanderPseudo(),
      date: new Date().toLocaleString(),
      text: value,
    };
    msgs = [...msgs, nouveau];
    messageInput.value = "";
  }

  // Toujours re-render (permet de valider 3.2 aussi en modifiant `msgs` dans la console)
  update(msgs);
});

// Bonus: si jamais quelqu'un clique le bouton sans passer par submit, on garde la cohérence.
sendButton.addEventListener("click", () => {
  if (!messageForm) return;
  // Le submit listener fera deja update(msgs).
});

