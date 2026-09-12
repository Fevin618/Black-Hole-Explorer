/**
 * Black Hole Explorer - Physics and Visualization Logic
 */

// --- Physical Constants ---
const G = 6.67430e-11; // Gravitational constant (m^3 kg^-1 s^-2)
const c = 299792458;   // Speed of light in vacuum (m/s)
const M_sun = 1.98847e30; // Solar mass (kg)

// --- DOM Elements ---
const massInput = document.getElementById('massInput');
const resMass = document.getElementById('res-mass');
const resRadius = document.getElementById('res-radius');
const resDiameter = document.getElementById('res-diameter');
const resGravity = document.getElementById('res-gravity');
const canvas = document.getElementById('bhCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// --- State Variables ---
let currentRsStr = "0"; // To hold formatted r_s for canvas scaling
let rotationAngle = 0;

// --- Formatting Helper ---
function formatNumber(num, isDistance = false) {
    if (num === 0) return "0";
    
    // For very large or very small numbers, use scientific notation
    if (num > 1e6 || num < 1e-3) {
        return num.toExponential(2).replace('e+', ' × 10<sup>').replace('e-', ' × 10<sup>-') + '</sup>';
    }
    
    // For readable distances like km
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// --- Calculation Logic ---
function updateCalculations() {
    let massSolar = parseFloat(massInput.value);
    
    if (isNaN(massSolar) || massSolar <= 0) {
        massSolar = 1;
    }

    // 1. Mass in kg
    const massKg = massSolar * M_sun;
    resMass.innerHTML = formatNumber(massKg);

    // 2. Schwarzschild Radius (r_s = 2GM / c^2)
    const rsMeters = (2 * G * massKg) / Math.pow(c, 2);
    const rsKm = rsMeters / 1000;
    
    if (rsKm < 1) {
        resRadius.innerHTML = formatNumber(rsMeters) + ' m';
    } else {
        resRadius.innerHTML = formatNumber(rsKm) + ' km';
    }

    // 3. Event Horizon Diameter (2 * r_s)
    const diameterKm = rsKm * 2;
    if (diameterKm < 1) {
        resDiameter.innerHTML = formatNumber(rsMeters * 2) + ' m';
    } else {
        resDiameter.innerHTML = formatNumber(diameterKm) + ' km';
    }

    // 4. Approximate Surface Gravity at Event Horizon (Newtonian approximation g = GM/r^2)
    // Note: In GR, surface gravity kappa is c^4 / (4GM). 
    // For educational simplicity and avoiding confusion with "infinite gravity" at horizon for falling observers,
    // we use the Newtonian calculation at r_s to give a sense of scale, but label it approximate.
    const gNewtonian = (G * massKg) / Math.pow(rsMeters, 2);
    resGravity.innerHTML = formatNumber(gNewtonian) + ' m/s²';
}

// --- Canvas Visualization ---
function drawBlackHole() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Abstract radius size for drawing (logarithmic feel to accommodate large ranges, but clamped)
    const massSolar = parseFloat(massInput.value) || 1;
    let baseDrawRadius = 40 + Math.log10(massSolar + 1) * 10;
    
    // Clamp visual size so it doesn't overflow or disappear
    baseDrawRadius = Math.max(20, Math.min(baseDrawRadius, 100));

    // 1. Draw Accretion Disk (Background part)
    ctx.save();
    ctx.translate(centerX, centerY);
    // Tilt the disk
    ctx.scale(1, 0.3);
    ctx.rotate(rotationAngle);
    
    const diskGradient = ctx.createRadialGradient(0, 0, baseDrawRadius, 0, 0, baseDrawRadius * 3.5);
    diskGradient.addColorStop(0, "rgba(255, 255, 255, 0)"); // hidden behind black hole
    diskGradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)"); // inner hot edge
    diskGradient.addColorStop(0.4, "rgba(255, 170, 0, 0.8)"); // main disk
    diskGradient.addColorStop(0.8, "rgba(255, 50, 0, 0.3)"); // outer edge
    diskGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.beginPath();
    ctx.arc(0, 0, baseDrawRadius * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = diskGradient;
    ctx.fill();
    ctx.restore();

    // 2. Draw Event Horizon (The Black Hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseDrawRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();

    // Add a slight glowing ring (Photon Ring/Lensing effect)
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseDrawRadius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 150, 50, 0.6)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add another fainter ring for relativistic beaming/lensing illusion
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseDrawRadius * 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 200, 100, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Draw Accretion Disk (Foreground part - gravitational lensing illusion)
    // To make it look like the disk wraps around the front
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, 0.3);
    ctx.rotate(rotationAngle);
    
    ctx.beginPath();
    // Only draw the bottom half of the disk to simulate it being in front
    ctx.arc(0, 0, baseDrawRadius * 3.5, 0, Math.PI);
    ctx.fillStyle = diskGradient;
    ctx.fill();
    ctx.restore();

    // Update rotation for next frame
    rotationAngle += 0.005;
    
    requestAnimationFrame(drawBlackHole);
}

// --- Event Listeners ---
massInput.addEventListener('input', () => {
    updateCalculations();
});

function setMass(mass) {
    massInput.value = mass;
    updateCalculations();
    // Scroll to calculator
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
}

// --- Initialization ---
window.onload = () => {
    updateCalculations();

    if (!canvas) return;

    // Handle resizing of canvas
    function resizeCanvas() {
        const container = document.querySelector('.canvas-container');
        if (!container) return;

        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    drawBlackHole();
};
