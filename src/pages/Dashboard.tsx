/* === Global Reset and Body === */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: radial-gradient(ellipse at center, #000010 0%, #000000 100%);
  color: #e0e7ff;
  overflow-x: hidden;
  min-height: 100vh;
}

/* === Glassmorphism Panel Base === */
.glass {
  backdrop-filter: blur(14px) saturate(180%);
  background-color: rgba(15, 18, 32, 0.5);
  border-radius: 16px;
  padding: 20px;
  box-shadow:
    0 0 15px rgba(0, 245, 212, 0.25),
    inset 0 0 20px rgba(0, 245, 212, 0.1);
  border: 1px solid rgba(0, 245, 212, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* === Dashboard Container === */
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: transparent;
}

/* === Header === */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 48px;
  margin-bottom: 32px;
  border-radius: 28px;
  background: linear-gradient(135deg, #1a213acc 0%, #141c2ecc 100%);
  box-shadow:
    0 0 30px rgba(0, 250, 255, 0.4),
    inset 0 0 40px #00f5d480;
  border: 1.8px solid rgba(0, 245, 212, 0.35);
  overflow: visible;
  user-select: none;
  transition: background 0.5s ease;
}

/* Neon Glow for Header Title */
.header-title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 3px;
  color: #00f5d4;
  background: linear-gradient(90deg, #00d4ff 0%, #5a7fff 50%, #ba8fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter:
    drop-shadow(0 0 5px #00f5d4cc)
    drop-shadow(0 0 10px #5a7fffaa)
    drop-shadow(0 0 15px #a28ffccc);
  user-select: text;
  cursor: default;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: filter 0.3s ease, transform 0.3s ease;
}

.header-title:hover {
  filter:
    drop-shadow(0 0 10px #00f5d4ff)
    drop-shadow(0 0 18px #5a7fffdd)
    drop-shadow(0 0 22px #bb9fffdd);
  transform: scale(1.1) rotate(-1.3deg);
}

/* Twinkling Stars Above Header */
.header-stars {
  position: absolute;
  top: -36px;
  left: 0;
  right: 0;
  height: 36px;
  background:
    radial-gradient(circle at 10% 70%, #7cfaffbb 3px, transparent 2.3px),
    radial-gradient(circle at 40% 30%, #a78cffaa 2.3px, transparent 1.7px),
    radial-gradient(circle at 70% 80%, #ffffffcc 1.5px, transparent 1px),
    radial-gradient(circle at 85% 50%, #4bc1ffbb 2px, transparent 1.5px);
  background-size: 360px 36px;
  animation: starTwinkle 7s linear infinite;
  opacity: 0.55;
  pointer-events: none;
  z-index: 10;
}
@keyframes starTwinkle {
  0%, 100% {
    background-position-x: 0;
  }
  50% {
    background-position-x: 360px;
  }
}

/* === Header Controls === */
.header-controls {
  display: flex;
  align-items: center;
  gap: 28px;
}

/* Modern Neon Buttons */
.header-controls button {
  background: linear-gradient(145deg, #1e2338, #2f3a6a);
  border: 2px solid transparent;
  color: #00f5d4;
  padding: 14px 24px;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  box-shadow:
    0 0 12px rgba(0, 245, 212, 0.5),
    inset 0 0 7px rgba(0, 245, 212, 0.15);
  transition:
    background 0.35s ease,
    color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-controls button svg {
  margin-right: 8px;
  vertical-align: middle;
  fill: currentColor;
}

.header-controls button:hover {
  background: linear-gradient(145deg, #00f5d4, #3b78ff);
  color: #e5f9ff;
  box-shadow:
    0 0 24px #00f5d4,
    inset 0 0 12px #aaddff;
  transform: scale(1.08) translateY(-2px);
}

.header-controls button:active {
  box-shadow: inset 0 3px 8px rgba(0, 245, 212, 0.6);
  transform: scale(0.95);
  transition-duration: 0.15s;
}

.header-controls button:focus-visible {
  outline: 3px solid #00f5d4cc;
  outline-offset: 4px;
}

/* Special Logout Button */
.header-controls .logout-button {
  background: linear-gradient(145deg, #51031c, #7b1430);
  border: 2px solid #e63946;
  color: #ff8099;
  box-shadow:
    0 0 14px rgba(230, 57, 70, 0.5),
    inset 0 0 10px rgba(230, 57, 70, 0.2);
  transition:
    background 0.35s ease,
    color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.25s ease;
}

.header-controls .logout-button:hover {
  background: linear-gradient(145deg, #f72d46, #b21834);
  color: #fff5f7;
  box-shadow:
    0 0 30px #f72d46,
    inset 0 0 14px #ffa6ad;
  transform: scale(1.1);
}

.header-controls .logout-button:active {
  box-shadow: inset 0 3px 9px rgba(247, 45, 70, 0.7);
  transform: scale(0.94);
  transition-duration: 0.12s;
}

/* === Clock styling inside header === */
.clock {
  font-family: 'Orbitron', monospace;
  background: rgba(0, 245, 212, 0.1);
  padding: 12px 22px;
  border-radius: 14px;
  color: #00f5d4;
  font-weight: 700;
  font-size: 1.1rem;
  border: 1.8px solid rgba(0, 245, 212, 0.4);
  box-shadow:
    0 0 10px rgba(0, 245, 212, 0.4);
  cursor: default;
  user-select: none;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  user-select: none;
  white-space: nowrap;
}

.clock:hover {
  box-shadow:
    0 0 26px #00f5d4,
    0 0 40px #48a9ff;
  color: #d0ffff;
  transform: scale(1.1);
}

/* === Main Layout === */
.main-layout {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  gap: 24px;
  flex-wrap: wrap;
}

/* Tracker section */
.tracker-section {
  flex: 1 1 480px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-width: 360px;
}

/* Satellite Cards Section */
.satellite-info-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
}

/* Satellite cards */
.satellite-card,
.placeholder-card {
  background: rgba(10, 14, 27, 0.7);
  padding: 20px;
  border-radius: 14px;
  color: #d7e9ff;
  font-size: 1.12rem;
  box-shadow:
    0 0 14px rgba(0, 245, 212, 0.15);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  cursor: default;
  user-select: none;
}

.satellite-card:hover {
  box-shadow:
    0 0 24px #00f5d4,
    0 0 40px #4fc3ffaa;
  transform: scale(1.04);
}

.satellite-card h3 {
  font-size: 1.28rem;
  margin-bottom: 14px;
  font-weight: 700;
  text-shadow: 0 0 6px #17e7ffbb;
}

.satellite-card p {
  margin-bottom: 10px;
}

/* Error message with icon */
.error-message {
  background: #f4433699;
  padding: 12px 18px;
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  user-select: none;
}

.error-message svg {
  font-size: 1.3rem;
}

/* === Tracker controls === */
.selection-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

/* Track Satellite Button */
.track-satellites-button {
  background: linear-gradient(145deg, #16213e, #20294d);
  color: #00f5d4;
  border: 1.5px solid #00f5d4;
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow:
    0 0 12px rgba(0, 245, 212, 0.5);
  transition: all 0.3s ease;
  user-select: none;
  width: 100%;
  max-width: 500px;
}

.track-satellites-button:hover {
  background: #0c2a67;
  color: #e5ffff;
  box-shadow:
    0 0 20px #00f5d4, 0 0 30px #4f8cff;
  transform: scale(1.05);
}

.track-satellites-button:disabled {
  background: #2c3a5d;
  color: #717171;
  border: 1.5px solid #45608f;
  cursor: not-allowed;
  box-shadow: none;
}

/* Satellite Dropdown */
.selection-controls select {
  background: linear-gradient(145deg, #223148, #1b2644);
  color: #00f5d4;
  border: 1.5px solid #00f5d4;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow:
    0 0 14px rgba(0, 245, 212, 0.5);
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
  width: 100%;
  max-width: 500px;
  user-select: none;
  outline-offset: 3px;
}

.selection-controls select:hover {
  background: #0a1b39;
  color: #d6f6f9;
  box-shadow:
    0 0 20px #00f5d4, 0 0 40px #4f8cffaa;
}

.selection-controls select:focus {
  border-color: #00f5d4;
  box-shadow:
    0 0 24px #00f5d4, 0 0 48px #7cbfff;
  outline: none;
}

.selection-controls select:disabled {
  background: #1b2544;
  color: #555a70;
  border: 1.5px solid #33416e;
  cursor: not-allowed;
  box-shadow: none;
}

/* Satellite dropdown options */
.selection-controls option {
  background: #101630;
  color: #dbeeff;
  padding: 12px 18px;
  font-size: 1rem;
  user-select: none;
  cursor: pointer;
}

.selection-controls option:hover {
  background: #253261;
}

/* === News Feed === */
.news-feed {
  background: rgba(15, 23, 41, 0.85);
  padding: 24px;
  border-radius: 16px;
  color: #b0d9ff;
  flex-basis: 320px;
  max-width: 360px;
  box-shadow:
    0 0 25px rgba(0, 245, 212, 0.2);
  user-select: none;
}

.news-feed h3 {
  font-size: 1.6rem;
  margin-bottom: 18px;
  color: #00caff;
  text-shadow: 0 0 18px #00f0ffbb;
}

.news-feed p {
  font-size: 1.05rem;
  line-height: 1.4;
}

.news-item h4 a {
  color: #64a4ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.news-item h4 a:hover {
  color: #00f5d4;
  text-shadow: 0 0 14px #00f5d4bb;
}

.news-card {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.news-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 12px #00f5d4aa;
}

.news-content {
  display: flex;
  flex-direction: column;
}

/* === Globe Container === */
.globe-container {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #000814;
  box-shadow:
    0 0 40px #002c71 inset;
  user-select: none;
}

.globe-container .globe {
  background: transparent !important;
}

/* === Interactive Card and Floating Elements === */
.decorative-box {
  position: relative;
  z-index: 1;
}

/* Flex for main sections */
.satellite-info-section,
.tracker-section {
  flex: 1 1 400px;
}

/* Text sizes for satellite info */
.satellite-info-section .satellite-card h3,
.satellite-info-section .satellite-card p {
  font-size: 1.1rem;
}

/* Hover on globe to dim slightly */
.globe-container:hover {
  opacity: 0.85;
}

/* Header title pointer on hover */
.header-title:hover {
  color: #c6f8ff;
  cursor: default;
}

/* Semi transparent overlay for header background */
header {
  background-color: rgba(0, 0, 0, 0.45);
  user-select: none;
}

/* === Responsiveness === */
@media (max-width: 960px) {
  .main-layout {
    flex-direction: column;
  }
  .tracker-section,
  .satellite-info-section,
  .news-feed {
    width: 100%;
    max-width: 100%;
    margin-bottom: 24px;
  }
  .globe-container {
    height: 360px;
    margin-bottom: 30px;
    box-shadow: none;
  }
  .dashboard-header {
    padding: 24px 28px;
    border-radius: 18px;
    margin-bottom: 24px;
  }
}

/* Extra small devices */
@media (max-width: 480px) {
  .dashboard-header {
    padding: 16px 20px;
  }
  .header-title {
    font-size: 2rem;
  }
  .header-controls button {
    padding: 10px 16px;
    font-size: 1rem;
    border-radius: 10px;
  }
  .track-satellites-button {
    padding: 12px;
  }
  .selection-controls select {
    padding: 10px 16px;
  }
  .news-feed {
    padding: 16px;
  }
}
