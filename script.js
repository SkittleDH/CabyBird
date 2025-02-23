let energy = 0;
let upgradeCost = 100;
let energyPerClick = 1;
let nextPlanetCost = 1000000;
let currentPlanet = "earth";
let planets = {
    earth: { name: "Earth", unlocked: true, energyMultiplier: 1 },
    mars: { name: "Mars", unlocked: false, energyMultiplier: 2 }
};

const energyCounter = document.getElementById("energy-counter");
const planetImage = document.getElementById("planet");
const upgradeBtn = document.getElementById("upgrade-btn");
const nextPlanetBtn = document.getElementById("next-planet-btn");
const leaderboardBtn = document.getElementById("leaderboard-btn");
const infoBtn = document.getElementById("info-btn");
const leaderboardDiv = document.getElementById("leaderboard");
const infoDiv = document.getElementById("info");
const leaderboardList = document.getElementById("leaderboard-list");

// Energie beim Klicken auf den Planeten erhalten
planetImage.addEventListener("click", () => {
    energy += energyPerClick * planets[currentPlanet].energyMultiplier;
    updateEnergyCounter();
});

// Upgrade kaufen
upgradeBtn.addEventListener("click", () => {
    if (energy >= upgradeCost) {
        energy -= upgradeCost;
        energyPerClick *= 2;
        upgradeCost *= 2;
        upgradeBtn.textContent = `Upgrade (${upgradeCost} Energy)`;
        updateEnergyCounter();
    }
});

// Nächsten Planeten kaufen
nextPlanetBtn.addEventListener("click", () => {
    if (energy >= nextPlanetCost && !planets.mars.unlocked) {
        energy -= nextPlanetCost;
        planets.mars.unlocked = true;
        currentPlanet = "mars";
        planetImage.src = "mars.png";
        nextPlanetBtn.style.display = "none";
        updateEnergyCounter();
    }
});

// Leaderboard anzeigen
leaderboardBtn.addEventListener("click", () => {
    leaderboardDiv.classList.toggle("hidden");
    updateLeaderboard();
});

// Infoseite anzeigen
infoBtn.addEventListener("click", () => {
    infoDiv.classList.toggle("hidden");
});

// Energieanzeige aktualisieren
function updateEnergyCounter() {
    energyCounter.textContent = `${energy} ENERGY`;
    localStorage.setItem("energy", energy);
}

// Leaderboard aktualisieren
function updateLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push({ name: "Player", score: energy });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(scores));
    leaderboardList.innerHTML = scores.map(s => `<li>${s.name}: ${s.score} Energy</li>`).join("");
}

// Spielstand laden
window.onload = () => {
    energy = parseInt(localStorage.getItem("energy")) || 0;
    updateEnergyCounter();
};
