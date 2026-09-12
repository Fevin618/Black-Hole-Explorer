# Black Hole Explorer

**Black Hole Explorer** is a realistic, scientifically grounded interactive web application designed to help users understand basic black-hole physics through interactive calculations and visualizations. 

This project aims to provide an educational astronomy dashboard that prioritizes scientific accuracy, clear explanations, and a professional interface over fictional or exaggerated sci-fi effects.

## 🚀 Features

- **Black Hole Calculator:** Enter a black hole's mass (in Solar Masses) to instantly calculate its mass in kilograms, Schwarzschild radius, event horizon diameter, and approximate surface gravity.
- **Interactive Visualization:** A dynamic 2D HTML5 Canvas representation of a black hole, illustrating the event horizon and accretion disk while maintaining a clear distinction that it is an illustrative model, not a rigorous simulation.
- **Black Hole Types:** Quick-load examples of Stellar-mass, Intermediate-mass, and Supermassive black holes (like Sagittarius A*).
- **Time Dilation Explanation:** A qualitative breakdown of gravitational time dilation, distinguishing between proper time and coordinate time.
- **Object Comparison:** A tabulated comparison of Earth, the Sun, a typical Stellar Black Hole, and a Supermassive Black Hole.
- **Educational Physics Glossary:** Clear, concise definitions of key concepts like the Singularity, Event Horizon, Spaghettification, and Hawking Radiation.

## 🧮 Physics & Equations Used

This application uses reputable scientific constants and general-relativistic foundations for its calculations.

- **Gravitational Constant (G):** `6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²`
- **Speed of Light (c):** `299,792,458 m/s`
- **Solar Mass (M_sun):** `1.98847 × 10³⁰ kg`

### Schwarzschild Radius
The radius of the event horizon for a non-rotating black hole is calculated using:

`r_s = 2GM / c²`

Where:
- `G` is the gravitational constant
- `M` is the mass of the black hole in kilograms
- `c` is the speed of light

### Approximate Surface Gravity (Newtonian)
While in General Relativity the surface gravity (kappa) is given by `c⁴ / (4GM)`, for educational simplicity we provide the Newtonian gravitational acceleration at the distance of the Schwarzschild radius to give a conceptual sense of scale:

`g ≈ GM / r_s²`

## 🛠️ Technologies

The project is built entirely without heavy frameworks, utilizing core web technologies to ensure maximum performance and accessibility:
- **HTML5:** Semantic structuring and layout.
- **CSS3:** Custom variables, CSS Grid/Flexbox for a responsive layout, and a dark space-inspired UI (Glassmorphism).
- **Vanilla JavaScript (ES6+):** Handling the physics calculations, dynamic DOM updates, and interactivity.
- **HTML5 `<canvas>`:** Rendering the 2D abstract visualization of the black hole and accretion disk.

## 🏃 How to Run the Project

Since this is a static web application using Vanilla web technologies, running it is incredibly simple:

1. Clone this repository or download the files.
2. Open `index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge).
3. No build tools, Node.js, or local servers are strictly required (though you can use a tool like Live Server for development).

## ⚠️ Scientific Limitations

This application is strictly educational. Please note the following:
- **The Event Horizon is Not a Solid Surface:** It is a threshold in spacetime. The visualization depicts it as a black circle for illustrative purposes.
- **Visualizations are Approximations:** The canvas visualization is a 2D conceptual representation showing the event horizon, accretion disk, and gravitational lensing illusions. It is *not* a rigorous ray-traced General Relativity simulation.
- **Time Dilation Example:** The time dilation example provided is based on Schwarzschild spacetime (a non-rotating, uncharged black hole). Actual experiences near a real black hole depend heavily on the observer's specific trajectory and the black hole's spin (Kerr metric).
- **"Vacuum Cleaner" Myth:** Black holes do not "suck" matter in from infinite distances. They exert a gravitational pull identical to any other object of the same mass at a safe distance.

## 🔮 Future Improvements

- Add support for rotating black holes (Kerr metric) calculations.
- Introduce a 3D ray-traced rendering mode (e.g., using Three.js) for more accurate gravitational lensing visualizations.
- Add an interactive observer trajectory simulator to visualize time dilation dynamically.

---
*Built for educational purposes. 🌌*
