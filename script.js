// Array of possible predictions
const predictions = [
    "-3",
    "00",
    "02",
    "4",
    "7",
    "10",
    "12"
];

// Get DOM elements
const predictionResult = document.getElementById("predictionResult");
const crystalBall = document.getElementById("crystalBall");

// Prevent multiple clicks during animation
let isAnimating = false;

// Create audio elements
const backgroundMusic = new Audio("background_ambience.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = parseFloat(volumeSlider.value); // Set initial volume

const spinSound = new Audio("crystal_spin_sound.mp3");
spinSound.volume = 1.0; // Start at full volume

// Start background music immediately
document.addEventListener("DOMContentLoaded", () => {
    backgroundMusic.play().catch(() => {
        console.warn("Autoplay blocked. Waiting for user interaction...");
    });
});

// If autoplay is blocked, retry on first user interaction
document.addEventListener("click", function enableAudio() {
    backgroundMusic.play();
    document.removeEventListener("click", enableAudio);
});

// Mute/unmute functionality
let isMuted = false;
muteButton.addEventListener("click", () => {
    if (isMuted) {
        backgroundMusic.volume = parseFloat(volumeSlider.value); // Restore previous volume
        backgroundMusic.play();
        muteButton.textContent = "🔊";
    } else {
        backgroundMusic.volume = 0; // Mute without stopping the track
        muteButton.textContent = "🔇";
    }
    isMuted = !isMuted;
});

// Volume slider functionality
volumeSlider.addEventListener("input", () => {
    if (!isMuted) {
        backgroundMusic.volume = parseFloat(volumeSlider.value);
    }
});


function makePrediction() {
    if (isAnimating) return; // Prevent re-triggering mid-animation
    isAnimating = true; 

    // Randomly select a prediction
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];

    // Clear previous prediction and reset opacity
    predictionResult.textContent = "";
    predictionResult.style.opacity = "0"; 

    // Remove the class if it exists to force re-trigger animation
    predictionResult.classList.remove("prediction-text");

    // Start spin animation
    crystalBall.classList.add("spin-animation");

    // Play spin sound
    spinSound.currentTime = 0; // Reset to start
    spinSound.volume = 1.0;
    spinSound.play();
    

    // Show prediction after 3 seconds (as it slows down)
    setTimeout(() => {
        predictionResult.textContent = randomPrediction;
        predictionResult.style.opacity = "1"; 
        predictionResult.classList.add("prediction-text"); // Ensure it applies the styles
    }, 7000);

    // Remove animation after it completes to allow retriggering
    setTimeout(() => {
        crystalBall.classList.remove("spin-animation");
        isAnimating = false;
    }, 13000);
}

// Attach event listener to the crystal ball
crystalBall.addEventListener("click", makePrediction);
