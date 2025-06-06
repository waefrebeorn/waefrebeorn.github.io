// YouTube IFrame API setup
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let isVideoSoundOn = false;
let isQuackEnabled = false; // Added this from index.html script

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-background', {
        videoId: 'geAlLtiUAxY',
        playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            autohide: 1,
            modestbranding: 1,
            vq: 'hd1080',
            mute: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    event.target.setVolume(50); // Default volume
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
    }
}

// Video sound button event listener
document.getElementById('soundButton').addEventListener('click', () => {
    isVideoSoundOn = !isVideoSoundOn;
    if (isVideoSoundOn) {
        player.unMute();
        // player.seekTo(0); // Consider if seeking to 0 is desired on unmuting
        document.getElementById('soundButton').textContent = 'Video Sound: ON';
    } else {
        player.mute();
        document.getElementById('soundButton').textContent = 'Video Sound: OFF';
    }
});

// Quack sound logic
const quackSound = new Audio('https://www.myinstants.com/media/sounds/quack.mp3');
function playQuack() {
    if (isQuackEnabled) {
        quackSound.play();
    }
}

// Quack button event listener
document.getElementById('playButton').addEventListener('click', () => {
    isQuackEnabled = !isQuackEnabled;
    document.getElementById('playButton').textContent = isQuackEnabled ? 'Quack: ON' : 'Quack: OFF';
});

// Duck cube image initialization and toggleDuckImage function
// Note: duckOpen and duckClosed are expected to be global or imported from duck.js
// For now, assuming duck.js is loaded first and provides these globally.

function toggleDuckImage() {
  const cubeFaces = document.querySelectorAll('.cube div');
  cubeFaces.forEach(face => {
    const currentImage = face.style.backgroundImage;
    if (currentImage.includes("duck_open.png")) {
        face.style.backgroundImage = `url("duck_closed.png")`;
    } else {
        face.style.backgroundImage = `url("duck_open.png")`;
    }
  });
}

// Initialize duck images on cube faces
document.addEventListener('DOMContentLoaded', () => {
    const cubeFaces = document.querySelectorAll('.cube div');
    cubeFaces.forEach(face => {
        face.style.backgroundImage = `url("duck_closed.png")`;
    });
    // Start duck animation for the cube
    setInterval(toggleDuckImage, 1000);

    // Call resizeCanvas on window resize and initially
    resizeCanvas();
});


// Responsive canvas resizing logic
function resizeCanvas() {
    const canvas = document.getElementById('pongCanvas');
    // Ensure canvas exists before trying to access its properties
    if (canvas) {
        const container = canvas.parentElement;
        // Determine aspect ratio from canvas attributes or a default
        const aspectRatio = canvas.width && canvas.height ? canvas.width / canvas.height : 400 / 300;

        let newWidth = container.clientWidth;
        // Apply a maxWidth constraint if specified, e.g., from CSS or a fixed value
        const maxWidth = 400;
        if (newWidth > maxWidth) {
            newWidth = maxWidth;
        }

        canvas.style.width = newWidth + 'px';
        canvas.style.height = (newWidth / aspectRatio) + 'px';
    } else {
        // console.warn("pongCanvas not found for resizing. Ensure it's loaded if expected.");
    }
}

window.addEventListener('resize', resizeCanvas);
// Initial call to resizeCanvas is moved to DOMContentLoaded to ensure canvas is present.

// Ensure isQuackEnabled is initialized for the button text
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('playButton').textContent = isQuackEnabled ? 'Quack: ON' : 'Quack: OFF';
    document.getElementById('soundButton').textContent = isVideoSoundOn ? 'Video Sound: ON' : 'Video Sound: OFF';
});
