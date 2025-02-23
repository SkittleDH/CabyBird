// Globale Variablen
let energy = 0;
let energyPerClick = 1;
let currentPlanetIndex = 0;
const planetImages = ['earth.png', 'mars.png', 'jupiter.png', 'saturn.png'];
// Erstelle für jeden Planeten ein Upgrade-Array (15 Upgrades pro Planet)
const planetUpgrades = [
  // Upgrades für Planet 0 (Earth)
  [
    { name: "Erdbeben", cost: 100, multiplier: 2 },
    { name: "Vulkanismus", cost: 250, multiplier: 2.5 },
    { name: "Magnetfeldstärkung", cost: 500, multiplier: 3 },
    { name: "Atmosphärenanreicherung", cost: 750, multiplier: 3.2 },
    { name: "Tektonische Platten", cost: 1000, multiplier: 3.5 },
    { name: "Ozeanströmung", cost: 1500, multiplier: 3.8 },
    { name: "Biodiversität", cost: 2000, multiplier: 4 },
    { name: "Klima-Optimierung", cost: 3000, multiplier: 4.2 },
    { name: "Solarenergie", cost: 4000, multiplier: 4.5 },
    { name: "Erneuerbare Ressourcen", cost: 5000, multiplier: 5 },
    { name: "Forschungslabore", cost: 7500, multiplier: 5.5 },
    { name: "Weltraumforschung", cost: 10000, multiplier: 6 },
    { name: "Technologische Durchbrüche", cost: 15000, multiplier: 6.5 },
    { name: "Globales Netzwerk", cost: 20000, multiplier: 7 },
    { name: "Interstellare Kommunikation", cost: 25000, multiplier: 7.5 }
  ],
  // Upgrades für Planet 1 (Mars)
  [
    { name: "Roter Staub", cost: 500, multiplier: 2 },
    { name: "Eisvorkommen", cost: 1000, multiplier: 2.2 },
    { name: "Kolonialisierung", cost: 1500, multiplier: 2.5 },
    { name: "Robotik", cost: 2000, multiplier: 2.8 },
    { name: "Solarpanelsystem", cost: 2500, multiplier: 3 },
    { name: "Unterirdische Basen", cost: 3000, multiplier: 3.2 },
    { name: "Terraforming", cost: 4000, multiplier: 3.5 },
    { name: "Atmosphärenmanagement", cost: 5000, multiplier: 3.8 },
    { name: "Orbitalstation", cost: 6000, multiplier: 4 },
    { name: "Forschungseinrichtungen", cost: 7500, multiplier: 4.2 },
    { name: "Wassergewinnung", cost: 9000, multiplier: 4.5 },
    { name: "Kryotechnik", cost: 10500, multiplier: 4.8 },
    { name: "Genetische Optimierung", cost: 12000, multiplier: 5 },
    { name: "Planetare Integration", cost: 13500, multiplier: 5.2 },
    { name: "Interplanetarer Handel", cost: 15000, multiplier: 5.5 }
  ],
  // Upgrades für Planet 2 (Jupiter)
  [
    { name: "Sturmverstärkung", cost: 10000, multiplier: 2 },
    { name: "Gasriese-Optimierung", cost: 12500, multiplier: 2.2 },
    { name: "Magnetosphäre", cost: 15000, multiplier: 2.5 },
    { name: "Energieausbeute", cost: 17500, multiplier: 2.8 },
    { name: "Flüssigmetallkern", cost: 20000, multiplier: 3 },
    { name: "Drucksysteme", cost: 22500, multiplier: 3.2 },
    { name: "Strahlenschutz", cost: 25000, multiplier: 3.5 },
    { name: "Plasmaforschung", cost: 27500, multiplier: 3.8 },
    { name: "Orbitalfabriken", cost: 30000, multiplier: 4 },
    { name: "Energiekollektoren", cost: 32500, multiplier: 4.2 },
    { name: "Superleiter", cost: 35000, multiplier: 4.5 },
    { name: "Quantentechnologie", cost: 37500, multiplier: 4.8 },
    { name: "Raumzeit-Manipulation", cost: 40000, multiplier: 5 },
    { name: "Gravitationsanomalien", cost: 42500, multiplier: 5.2 },
    { name: "Schwarze Materie", cost: 45000, multiplier: 5.5 }
  ],
  // Upgrades für Planet 3 (Saturn) – Beispielhaft, ähnliche Struktur
  [
    { name: "Ringstruktur", cost: 20000, multiplier: 2 },
    { name: "Eispartikel", cost: 22000, multiplier: 2.2 },
    { name: "Gasdynamik", cost: 24000, multiplier: 2.4 },
    { name: "Satelliten-Netz", cost: 26000, multiplier: 2.6 },
    { name: "Orbitalmechanik", cost: 28000, multiplier: 2.8 },
    { name: "Atmosphärenanalyse", cost: 30000, multiplier: 3 },
    { name: "Wellenphänomene", cost: 32000, multiplier: 3.2 },
    { name: "Strahlungsfilter", cost: 34000, multiplier: 3.4 },
    { name: "Magnetfeldregulierung", cost: 36000, multiplier: 3.6 },
    { name: "Energiemanagement", cost: 38000, multiplier: 3.8 },
    { name: "Thermische Systeme", cost: 40000, multiplier: 4 },
    { name: "Kernfusion", cost: 42000, multiplier: 4.2 },
    { name: "Plasmaanpassung", cost: 44000, multiplier: 4.4 },
    { name: "Schwerelosigkeit", cost: 46000, multiplier: 4.6 },
    { name: "Interstellare Synergie", cost: 48000, multiplier: 4.8 }
  ]
];

// Variable, um die aktuell verfügbaren Upgrades für den aktuellen Planeten zu speichern
let currentUpgrades = [...planetUpgrades[currentPlanetIndex]];

// DOM-Elemente
const energyCounterElem = document.getElementById('energy-counter');
const planetElem = document.getElementById('planet');
const shopMenu = document.getElementById('shop-menu');
const upgradesContainer = document.getElementById('upgrades-container');
const leaderboardElem = document.getElementById('leaderboard');
const leaderboardListElem = document.getElementById('leaderboard-list');
const infoElem = document.getElementById('info');

// Funktion: Energie sammeln beim Klick auf den Planeten
function collectEnergy() {
  energy += energyPerClick;
  animateEnergyGain();
  updateEnergyDisplay();
}

// Update der Energieanzeige
function updateEnergyDisplay() {
  energyCounterElem.textContent = energy + ' ENERGY';
  localStorage.setItem('energy', energy);
}

// Sanfte Animation beim Energie-Klick
function animateEnergyGain() {
  planetElem.classList.add('pulse');
  setTimeout(() => {
    planetElem.classList.remove('pulse');
  }, 150);
}

// Shop-Menü umschalten (anzeigen/verbergen)
function toggleShop() {
  shopMenu.classList.toggle('hidden');
  if (!shopMenu.classList.contains('hidden')) {
    renderUpgrades();
  }
}

// Rendern der Upgrade-Buttons im Shop
function renderUpgrades() {
  upgradesContainer.innerHTML = '';
  if (currentUpgrades.length === 0) {
    upgradesContainer.innerHTML = '<p>Alle Upgrades gekauft!</p>';
    return;
  }
  currentUpgrades.forEach((upgrade, index) => {
    const btn = document.createElement('button');
    btn.className = 'upgrade-btn';
    btn.textContent = `${upgrade.name} - ${upgrade.cost} ENERGY`;
    btn.onclick = function() {
      purchaseUpgrade(index);
    };
    upgradesContainer.appendChild(btn);
  });
}

// Kauf eines Upgrades
function purchaseUpgrade(index) {
  const upgrade = currentUpgrades[index];
  if (energy >= upgrade.cost) {
    energy -= upgrade.cost;
    energyPerClick *= upgrade.multiplier;
    currentUpgrades.splice(index, 1);
    updateEnergyDisplay();
    renderUpgrades();
  } else {
    alert('Nicht genügend Energie für dieses Upgrade!');
  }
}

// Wechsel des aktuellen Planeten
function changePlanet() {
  // Zyklischer Wechsel der Planeten
  currentPlanetIndex = (currentPlanetIndex + 1) % planetImages.length;
  planetElem.src = planetImages[currentPlanetIndex];
  // Setze Upgrades für den neuen Planeten
  currentUpgrades = [...planetUpgrades[currentPlanetIndex]];
  // Update der UI, falls der Shop offen ist
  if (!shopMenu.classList.contains('hidden')) {
    renderUpgrades();
  }
  animatePlanetChange();
}

// Animation beim Planetenwechsel
function animatePlanetChange() {
  planetElem.classList.add('rotate');
  setTimeout(() => {
    planetElem.classList.remove('rotate');
  }, 500);
}

// Leaderboard umschalten
function toggleLeaderboard() {
  leaderboardElem.classList.toggle('hidden');
  if (!leaderboardElem.classList.contains('hidden')) {
    updateLeaderboard();
  }
}

// Leaderboard aktualisieren und in localStorage speichern
function updateLeaderboard() {
  let scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
  // Füge aktuellen Score hinzu
  scores.push({ score: energy, timestamp: new Date().toISOString() });
  // Sortiere absteigend nach Score
  scores.sort((a, b) => b.score - a.score);
  // Behalte nur die Top 10
  scores = scores.slice(0, 10);
  localStorage.setItem('leaderboard', JSON.stringify(scores));
  renderLeaderboard(scores);
}

// Rendern des Leaderboards
function renderLeaderboard(scores) {
  leaderboardListElem.innerHTML = '';
  scores.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.score} ENERGY - ${new Date(entry.timestamp).toLocaleString()}`;
    leaderboardListElem.appendChild(li);
  });
}

// Info-Bereich umschalten
function toggleInfo() {
  infoElem.classList.toggle('hidden');
}

// Laden des Spielstands bei Seitenaufruf
function loadGame() {
  energy = parseInt(localStorage.getItem('energy')) || 0;
  energyPerClick = parseFloat(localStorage.getItem('energyPerClick')) || 1;
  currentPlanetIndex = parseInt(localStorage.getItem('currentPlanetIndex')) || 0;
  planetElem.src = planetImages[currentPlanetIndex];
  currentUpgrades = [...planetUpgrades[currentPlanetIndex]];
  updateEnergyDisplay();
}

// Speichern des Spielstands periodisch
function autoSaveGame() {
  localStorage.setItem('energy', energy);
  localStorage.setItem('energyPerClick', energyPerClick);
  localStorage.setItem('currentPlanetIndex', currentPlanetIndex);
}

// Zusätzliche Animationen und Effekte
document.addEventListener('DOMContentLoaded', () => {
  loadGame();
  setInterval(autoSaveGame, 5000);
});

// Erweiterte Event Listener für Tasten (z. B. ESC zum Schließen von Panels)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (!shopMenu.classList.contains('hidden')) toggleShop();
    if (!leaderboardElem.classList.contains('hidden')) toggleLeaderboard();
    if (!infoElem.classList.contains('hidden')) toggleInfo();
  }
});

// Zusätzliche Debug-Funktion (zum Testen der Upgrades)
function debugResetGame() {
  energy = 0;
  energyPerClick = 1;
  currentPlanetIndex = 0;
  currentUpgrades = [...planetUpgrades[currentPlanetIndex]];
  localStorage.clear();
  updateEnergyDisplay();
  renderUpgrades();
}

// Füge Debug-Button im Konsolenmodus hinzu (nur zum Testen, nicht sichtbar im Spiel)
// window.debugResetGame = debugResetGame;
