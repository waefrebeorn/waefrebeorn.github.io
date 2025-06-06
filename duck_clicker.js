// Duck Clicker Game Code (duck_clicker.js)
let youtubeVideoURLs = []; // Loaded from JSON
let allDuckemonData = {};  // Loaded from JSON
let currentDuckemonState = {}; // Initialized after loading allDuckemonData
var youtubeVideoIDs = []; // Global for access, populated after fetch

// --- Duckemon Effect Constants ---
const DUCKEMON_TYPE_COLORS = {
    "Normal": "rgba(168, 168, 120, 0.7)", "Fighting": "rgba(192, 48, 40, 0.7)",
    "Flying": "rgba(168, 144, 240, 0.7)", "PoisonBill": "rgba(160, 64, 160, 0.7)",
    "GroundPuddle": "rgba(224, 192, 104, 0.7)", "Rock": "rgba(184, 160, 56, 0.7)",
    "BugNet": "rgba(168, 184, 32, 0.7)", "Ghost": "rgba(112, 88, 152, 0.7)",
    "Steel": "rgba(184, 184, 208, 0.7)", "FireBeak": "rgba(240, 128, 48, 0.7)",
    "WaterWing": "rgba(104, 144, 240, 0.7)", "GrassPelt": "rgba(120, 200, 80, 0.7)",
    "ElectricQuacker": "rgba(248, 208, 48, 0.7)", "ElectricWaddle": "rgba(248, 208, 48, 0.7)",
    "Psychic": "rgba(248, 88, 136, 0.7)", "PsychicOrb": "rgba(248, 88, 136, 0.7)",
    "IceAge": "rgba(152, 216, 216, 0.7)", "Dragon": "rgba(112, 56, 248, 0.7)",
    "Dark": "rgba(112, 88, 72, 0.7)", "FairyDust": "rgba(238, 153, 172, 0.7)",
    "Dimensional": "rgba(72, 56, 120, 0.7)", "Ancient": "rgba(104, 88, 56, 0.7)",
    "AncientBeak": "rgba(104, 88, 56, 0.7)", "Digital": "rgba(0, 200, 160, 0.7)",
    "Cosmic": "rgba(120, 100, 200, 0.7)", "Egg": "rgba(240, 240, 200, 0.7)",
    "Void": "rgba(40, 40, 50, 0.85)", "Chad": "rgba(255, 215, 0, 0.7)",
    "Poison": "rgba(160, 64, 160, 0.7)", "Electric": "rgba(248, 208, 48, 0.7)",
    "Ground": "rgba(224, 192, 104, 0.7)",
    "CyberneticPaddler": "rgba(128, 128, 192, 0.7)", "TimeGuard": "rgba(0, 192, 192, 0.7)",
    "NuclearQuack": "rgba(128, 255, 0, 0.7)", "EnergyPulse": "rgba(255, 128, 0, 0.7)",
    "Mystery": "rgba(100, 100, 100, 0.7)",
    "default": "rgba(200, 200, 200, 0.5)"
};

const RARITY_GLOW_COLORS = {
    T1: "rgba(120, 120, 120, 0.7)", // Common (subtle grey)
    T2: "rgba(205, 127, 50, 0.7)",  // Uncommon (bronze)
    T3: "rgba(192, 192, 192, 0.8)",  // Rare (silver)
    T4: "rgba(255, 215, 0, 0.9)",    // Epic (gold)
    T5: "rgba(176, 40, 255, 0.9)"    // Legendary (vibrant purple)
};
// --- End Duckemon Effect Constants ---

// --- Upgrade Definitions ---
const upgradeDefinitions = [
    {
        id: "reinforcedBeak1",
        name: "Reinforced Beak I",
        description: "Strengthens your clicking power. Click QPS x1.5.",
        cost: 1000,
        currency: "qp", // qp or gf (Golden Feathers)
        target: "click", // 'click', 'all', or a specific duckemon ID
        multiplier: 1.5,
        purchased: false,
        icon: "duck_closed.png"
    },
    {
        id: "babyDucklingBoost1",
        name: "Duckling Training Wheels",
        description: "Increases Baby Duckling QPS by 50%.",
        cost: 500,
        currency: "qp",
        target: "babyDuckling", // Assuming 'babyDuckling' is an ID in allDuckemonData
        multiplier: 1.5,
        purchased: false,
        icon: "duck_closed.png"
    },
    {
        id: "allQuackBoost1",
        name: "Synchronized Quacking",
        description: "Increases QPS of all Duckemon by 20%.",
        cost: 10000,
        currency: "qp",
        target: "all",
        multiplier: 1.2,
        purchased: false,
        icon: "duck_closed.png"
    },
    {
        id: "qKeyAutoclickRate1",
        name: "Swift Q-Pressing I",
        description: "Increases Q-key auto-click rate by 5 clicks/sec.",
        cost: 5000,
        currency: "qp",
        target: "qKeyAutoclickRate",
        value: 5,
        purchased: false,
        icon: "duck_closed.png"
    },
    {
        id: "qKeyAutoclickRate2",
        name: "Rapid Q-Pressing II",
        description: "Further increases Q-key auto-click rate by 10 clicks/sec.",
        cost: 25000,
        currency: "qp",
        target: "qKeyAutoclickRate",
        value: 10,
        purchased: false,
        icon: "duck_closed.png"
    }
];

const gfUpgradeDefinitions = [
    {
        id: "goldenClickBoost1",
        name: "Golden Quack Coinage I",
        description: "Permanently increases click power by 100% (x2). Each click mints more!",
        cost: 5,
        currency: "gf",
        target: "click",
        multiplier: 2,
        purchased: false,
        icon: "duck_closed.png"
    },
    {
        id: "goldenAllQpsBoost1",
        name: "Golden Duck Hoard I",
        description: "Permanently increases QPS of all Duckemon by 50%. A treasure trove of quacks!",
        cost: 10,
        currency: "gf",
        target: "all",
        multiplier: 1.5,
        purchased: false,
        icon: "duck_closed.png"
    }
];

// --- Recolor Image Function ---
function recolorImage(imageUrl, color) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "Anonymous"; // Important for tainted canvas if image is hosted elsewhere

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            // Draw the original image
            ctx.drawImage(image, 0, 0);

            // Apply the color tint
            ctx.globalCompositeOperation = 'source-in'; // Only draw where the original image has pixels
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';

            resolve(canvas.toDataURL()); // Returns base64 encoded image
        };

        image.onerror = (error) => {
            console.error("Error loading image for recoloring:", imageUrl, error);
            reject(error); // Or resolve(imageUrl) to return original on error
        };

        image.src = imageUrl;
    });
}
// --- End Recolor Image Function ---

// --- Duckemon Effects Function ---
async function applyDuckemonEffects(baseImageUrl, duckemonData) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const glowOffset = 10; // Extra space for glows
            canvas.width = img.naturalWidth + glowOffset * 2;
            canvas.height = img.naturalHeight + glowOffset * 2;

            // --- Start drawing effects ---
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 0. Determine Rarity Tier for border glow
            let rarityColor = null;
            if (duckemonData.baseCost >= 1E50) rarityColor = RARITY_GLOW_COLORS.T5;
            else if (duckemonData.baseCost >= 1E15) rarityColor = RARITY_GLOW_COLORS.T4;
            else if (duckemonData.baseCost >= 1000000) rarityColor = RARITY_GLOW_COLORS.T3;
            else if (duckemonData.baseCost >= 10000) rarityColor = RARITY_GLOW_COLORS.T2;
            // else Tier 1 (Common) - no special glow or very subtle one

            // 1. Draw base image (centered with offset for glow)
            // If rarity glow is applied, draw it first as a shadow
            if (rarityColor) {
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = glowOffset - 2; // Glow size
                ctx.shadowColor = rarityColor;
                // Draw the image multiple times for a stronger glow before the actual image
                for (let i = 0; i < 3; i++) {
                     ctx.drawImage(img, glowOffset, glowOffset, img.naturalWidth, img.naturalHeight);
                }
            }
            // Reset shadow for subsequent draws
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';

            // Draw the actual base image on top
            ctx.drawImage(img, glowOffset, glowOffset, img.naturalWidth, img.naturalHeight);

            // 2. Apply Type1 color tint
            const type1Color = DUCKEMON_TYPE_COLORS[duckemonData.type1] || DUCKEMON_TYPE_COLORS["default"];
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = type1Color;
            ctx.fillRect(glowOffset, glowOffset, img.naturalWidth, img.naturalHeight); // Only tint the duck area
            ctx.globalCompositeOperation = 'source-over'; // Reset

            // 3. Apply Type2 outer glow (if type2 exists)
            if (duckemonData.type2) {
                const type2Color = DUCKEMON_TYPE_COLORS[duckemonData.type2] || null;
                if (type2Color) {
                    // Create a temporary canvas for the main duck image to apply glow around it
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;

                    // Draw the already colorized duck (from main canvas) to temp canvas
                    tempCtx.drawImage(canvas, 0, 0);

                    // Clear main canvas and draw glow from type2 color
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = glowOffset / 2;
                    ctx.shadowColor = type2Color;
                    // Draw the temp canvas (which has the duck) multiple times for glow
                    for (let i = 0; i < 3; i++) {
                        ctx.drawImage(tempCanvas, 0, 0);
                    }
                    // Reset shadow
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = 'transparent';
                    // Draw the temp canvas (the colored duck) back on top of its glow
                    ctx.drawImage(tempCanvas, 0, 0);
                }
            }

            // 4. Evolution Indicator (if evolvesTo exists)
            if (duckemonData.evolvesTo) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Bright sparkle/arrow color
                ctx.font = 'bold ' + (img.naturalHeight / 3) + 'px sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText('↑', canvas.width - glowOffset /2 , canvas.height - glowOffset /2 ); // Bottom-right corner
            }

            resolve(canvas.toDataURL());
        };
        img.onerror = (err) => {
            console.error("Error loading base image for Duckemon effect:", baseImageUrl, err);
            reject(err); // Or resolve with baseImageUrl to use original if loading fails
        };
        img.src = baseImageUrl;
    });
}
// --- End Duckemon Effects Function ---

document.addEventListener('DOMContentLoaded', () => {
    // Define global variables to hold data from JSON
    // youtubeVideoURLs is already declared as let above.
    // allDuckemonData and currentDuckemonState are already declared as let above.

    async function loadGameData() {
        try {
            console.log("Fetching youtube_links.json...");
            const youtubeLinksResponse = await fetch('./youtube_links.json');
            if (!youtubeLinksResponse.ok) throw new Error(`Failed to load youtube_links.json: ${youtubeLinksResponse.statusText} (status: ${youtubeLinksResponse.status})`);
            const youtubeData = await youtubeLinksResponse.json();
            youtubeVideoURLs = youtubeData.videoURLs || [];
            console.log(`Loaded ${youtubeVideoURLs.length} YouTube URLs.`);

            console.log("Fetching duckemon_data.json...");
            const duckemonDataResponse = await fetch('./duckemon_data.json');
            if (!duckemonDataResponse.ok) throw new Error(`Failed to load duckemon_data.json: ${duckemonDataResponse.statusText} (status: ${duckemonDataResponse.status})`);
            allDuckemonData = await duckemonDataResponse.json();
            console.log(`Loaded data for ${Object.keys(allDuckemonData).length} Duckemon.`);

            startGameInitialization(); // Proceed to initialize the game with loaded data
        } catch (error) {
            console.error("Failed to load critical game data:", error);
            document.body.innerHTML = `<h1 style="color:red; text-align:center; padding-top: 50px;">Failed to load critical game data. Please refresh the page or check the console for more details. Error: ${error.message}</h1>`;
        }
    }

    function startGameInitialization() {
        console.log("Starting game initialization with loaded data...");
        // Derive youtubeVideoIDs from the loaded youtubeVideoURLs
        youtubeVideoIDs = (youtubeVideoURLs || []).map(url => {
            try {
                const urlObj = new URL(url);
                const videoId = urlObj.searchParams.get("v");
                if (!videoId) { console.error("Could not extract video ID from URL: " + url + ". Invalid format."); return null; }
                return videoId;
            } catch (error) { console.error("Error parsing URL: " + url, error); return null; }
        }).filter(id => id !== null);
        console.log(`Processed ${youtubeVideoIDs.length} YouTube video IDs.`);

        // Initialize currentDuckemonState as a deep copy of the loaded allDuckemonData
        // Also ensure base values are set (currentCost, currentQPS might not be in JSON if it only has base)
        currentDuckemonState = JSON.parse(JSON.stringify(allDuckemonData));
        Object.values(currentDuckemonState).forEach(duckemon => {
            duckemon.currentCost = duckemon.baseCost; // Initialize currentCost from baseCost
            duckemon.currentQPS = duckemon.baseQPS;   // Initialize currentQPS from baseQPS
            // Ensure 'owned' and 'isDiscovered' have default values if not in JSON (though they should be)
            if (duckemon.owned === undefined) duckemon.owned = 0;
            if (duckemon.isDiscovered === undefined) {
                // Default discovery logic: QP unlock at 0 or Level unlock at 0 are discovered.
                duckemon.isDiscovered = (duckemon.unlockMethod === 'qp' && duckemon.unlockValue === 0) ||
                                        (duckemon.unlockMethod === 'level' && duckemon.unlockValue === 0);
            }
        });
        console.log("Initialized currentDuckemonState.");

        // --- The rest of the original DOMContentLoaded code starts below ---
        // (Excluding parts that were removed or redefined above)

        let isClickerQuackEnabled = true;
        const clickerQuackSound = new Audio('https://www.myinstants.com/media/sounds/quack.mp3');
        clickerQuackSound.preload = 'auto';
        clickerQuackSound.load();

        const clickableDuckV2 = document.getElementById('clickableDuckV2');
        if (clickableDuckV2) { clickableDuckV2.src = 'duck_closed.png'; }

        if (clickableDuckV2) {
            clickableDuckV2.addEventListener('mousedown', () => {
                clickableDuckV2.src = 'duck_open.png';
                if (isClickerQuackEnabled && clickerQuackSound) {
                    clickerQuackSound.currentTime = 0;
                    clickerQuackSound.play().catch(error => console.error("Error playing quack sound:", error));
                }
            });
        }

        if (clickableDuckV2) {
            clickableDuckV2.addEventListener('mouseup', () => {
                clickableDuckV2.src = 'duck_closed.png';
            });
        }

        const qpAmountDisplay = document.getElementById('qpAmount');
        const qpPerSecondDisplay = document.getElementById('qpPerSecond');
        const qpPerClickDisplay = document.getElementById('qpPerClick');
        const generatorsListContainer = document.getElementById('generatorsListContainer');
        const upgradesListContainer = document.getElementById('upgradesListContainer');
        const gfUpgradesListContainer = document.getElementById('gfUpgradesListContainer');
        const saveGameButton = document.getElementById('saveGameButton');
        const loadGameButton = document.getElementById('loadGameButton');
        const resetGameButton = document.getElementById('resetGameButton');
        const goldenFeathersDisplay = document.getElementById('goldenFeathersDisplay');
        const rebirthButton = document.getElementById('rebirthButton');
        const gfOnRebirthDisplay = document.getElementById('gfOnRebirthDisplay');
        const playerLevelDisplay = document.getElementById('playerLevelDisplay');
        const nextLevelQPDisplay = document.getElementById('nextLevelQPDisplay');

        const celestialPortalSection = document.getElementById('celestialPortalSection');
        const ascendToHeavenButton = document.getElementById('ascendToHeavenButton');
        const superLevelDisplayArea = document.getElementById('superLevelDisplayArea');
        const superLevelTitle = document.getElementById('superLevelTitle');
        const superLevelContent = document.getElementById('superLevelContent');
        const returnToNormalPlaneButton = document.getElementById('returnToNormalPlaneButton');
        const duckClickerGameArea = document.getElementById('duckClickerGame');
        const duckedexGrid = document.getElementById('duckedexGrid');
    const eggSlotsContainer = document.getElementById('eggSlotsContainer');
    const acquireCommonEggTestBtn = document.getElementById('acquireCommonEggTestBtn');
    const acquireMysteriousEggTestBtn = document.getElementById('acquireMysteriousEggTestBtn');

        const SAVE_KEY = 'waefreBeornDuckClickerSaveV2';

        // YouTube Meme Cavern Functions (updateMemeCavern)
        // displayYoutubeMeme is removed as its logic is incorporated into updateMemeCavern.
        function updateMemeCavern() {
            const container = document.getElementById('youtubeLinksContainer');
            if (!container) { console.error('Meme Cavern container not found!'); return; }
            container.innerHTML = ''; // Clear previous content

            const memesToShowCount = playerLevel === 0 ? 5 : Math.min(5 + Math.ceil((youtubeVideoIDs.length - 5) * (playerLevel / 100)), youtubeVideoIDs.length);

            const unlockedInfoDiv = document.createElement('div');
            unlockedInfoDiv.id = 'memeUnlockedCount';
            unlockedInfoDiv.style.textAlign = 'center';
            unlockedInfoDiv.style.padding = '10px';
            unlockedInfoDiv.style.fontSize = '16px';
            unlockedInfoDiv.style.color = '#00ffff'; // Cyan color
            unlockedInfoDiv.textContent = `Unlocked Memes: ${memesToShowCount} / ${youtubeVideoIDs.length}`;
            container.appendChild(unlockedInfoDiv);

            const memeListDiv = document.createElement('div');
            memeListDiv.id = 'memeList';
            memeListDiv.style.display = 'flex';
            memeListDiv.style.flexDirection = 'column';
            memeListDiv.style.gap = '15px'; // Spacing between meme entries
            container.appendChild(memeListDiv);

            youtubeVideoIDs.forEach((videoId, index) => {
                const memeEntryDiv = document.createElement('div');
                memeEntryDiv.className = 'meme-entry'; // For potential future styling
                memeEntryDiv.style.padding = '10px';
                memeEntryDiv.style.border = '1px solid #444';
                memeEntryDiv.style.borderRadius = '5px';
                memeEntryDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';

                const title = document.createElement('h4');
                title.style.color = '#ffff00'; // Yellow title
                title.style.marginBottom = '5px';

                if (index < memesToShowCount) {
                    // This meme is "unlocked"
                    title.textContent = `Meme #${index + 1} (ID: ${videoId})`; // Using index as placeholder title

                    const iframe = document.createElement('iframe');
                    iframe.src = "https://www.youtube.com/embed/" + videoId;
                    iframe.width = "100%"; // Make iframe responsive
                    iframe.height = "315"; // Default height, can be adjusted with CSS later if needed
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;

                    memeEntryDiv.appendChild(title);
                    memeEntryDiv.appendChild(iframe);
                } else {
                    // This meme is "locked"
                    title.textContent = `Meme #${index + 1} - Locked`;
                    const lockedText = document.createElement('p');
                    lockedText.textContent = 'Discover more memes by increasing your player level.';
                    lockedText.style.color = '#777';

                    // Try to find the level at which this specific meme would unlock
                    let unlockLevel = playerLevel + 1; // Start searching from next level
                    let foundUnlockLevel = false;
                    for (let lvl = 0; lvl <= 100; lvl++) { // Max player level is 100 for this calculation
                        const countAtLvl = lvl === 0 ? 5 : Math.min(5 + Math.ceil((youtubeVideoIDs.length - 5) * (lvl / 100)), youtubeVideoIDs.length);
                        if (index < countAtLvl) {
                            unlockLevel = lvl;
                            foundUnlockLevel = true;
                            break;
                        }
                    }
                    if (foundUnlockLevel) {
                        lockedText.textContent = `Unlock at Player Level ${unlockLevel}.`;
                    }

                    memeEntryDiv.appendChild(title);
                    memeEntryDiv.appendChild(lockedText);
                    memeEntryDiv.style.filter = 'grayscale(80%) opacity(0.6)'; // Visually indicate locked
                }
                memeListDiv.appendChild(memeEntryDiv);
            });
        }

        const memeCavernTabButton = document.querySelector('.tab-link[onclick*="memeCavernTab"]');
        if (memeCavernTabButton) {
            memeCavernTabButton.addEventListener('click', () => { updateMemeCavern(); });
        } else { console.error('Meme Cavern tab button not found for event listener.'); }

        let qp = 0;
        let qpPerClick = 1;
        let qpPerSecond = 0;
        let goldenFeathers = 0;
        let totalQPAllTime = 0;
        let playerLevel = 0;

        // Q-key Autoclicker variables
        let qAutoClickIntervalId = null;
        let isQautoClickActive = false;
        let qAutoClickRatePerSecond = 10; // Clicks per second when Q is held

    let ownedEggs = []; // Array of egg objects: { id: uniqueId, type: "CommonEgg", hatchStartTime: Date.now() }
    const eggTypes = {
        "CommonEgg": {
            name: "Common Duckemon Egg",
            hatchDurationSeconds: 300, // 5 minutes
            possibleDuckemonIds: ["duckemon_013", "duckemon_014", "duckemon_015", "babyDuckling", "breadScavenger"]
        },
        "MysteriousEgg": {
            name: "Mysterious Duckemon Egg",
            hatchDurationSeconds: 3600, // 1 hour
            possibleDuckemonIds: ["duckemon_050", "duckemon_051", "duckemon_075", "cosmicDuckEgg", "voidQuacker"]
        }
        // Can add more egg types later
    };
    let nextEggId = 0; // Simple ID counter for owned eggs

        const finalLevelQPThresholds = [
            0, 1e9, 1e13, 1e17, 1e22, 1e27, 1e33, 1e39, 1e45, 1e52, 1e60,
            1e69, 1e78, 1e87, 1e97, 1e107, 1e117, 1e128, 1e139, 1e151, 1e163,
            1e176, 1e189, 1e203, 1e217, 1e232, 1e247, 1e263, 1e279, 1e296, 1e308,
            1.2e325, 1.5e342, 1.8e359, 2.2e376, 2.6e393, 3e410, 3.5e427, 4e444, 4.6e461, 5.2e478,
            6e495, 7e512, 8e529, 9e546, 1e564, 1.15e582, 1.3e600, 1.45e618, 1.6e636, 1.8e654,
            2e672, 2.2e690, 2.5e708, 2.8e726, 3.1e744, 3.4e762, 3.7e780, 4e798, 4.4e816, 4.8e834,
            5.2e852, 5.6e870, 6e888, 6.5e906, 7e924, 7.5e942, 8e960, 8.5e978, 9e996, 1e1015,
            1.1e1035, 1.2e1055, 1.3e1075, 1.4e1095, 1.5e1115, 1.6e1135, 1.7e1155, 1.8e1175, 1.9e1195, 2e1215,
            2.2e1235, 2.4e1255, 2.6e1275, 2.8e1295, 3e1315, 3.2e1335, 3.4e1355, 3.6e1375, 3.8e1395, 4e1415,
            4.2e1435, 4.4e1455, 4.6e1475, 4.8e1495, 5e1515, 5.3e1535, 5.6e1555, 5.9e1575, 6.2e1595, 1e5049
        ];

        function formatNumber(num) {
            if (num === undefined || num === null) return '0';
            if (num < 1000) return num.toFixed(num % 1 === 0 ? 0 : 2);
            const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "Uvg", "Dvg"];
            const i = Math.floor(Math.log10(Math.abs(num)) / 3);
            const scaled = num / Math.pow(1000, i);
            if (!isFinite(scaled) || i >= suffixes.length) return "Infinity";
            return scaled.toFixed(2) + suffixes[i];
        }

        function checkLevelUp() {
            console.log(`Checking level up. Total QP All Time: ${totalQPAllTime}, Current Level: ${playerLevel}`);
            const oldLevel = playerLevel;
            let newLevel = 0;
            for (let i = finalLevelQPThresholds.length - 1; i >= 0; i--) {
                if (totalQPAllTime >= finalLevelQPThresholds[i]) {
                    newLevel = i;
                    break;
                }
            }
            playerLevel = newLevel; // Update playerLevel immediately
            if (oldLevel !== playerLevel) {
                console.log(`New Level: ${playerLevel}`);
            }

            let newDuckemonDiscoveredThisCycle = false;
            Object.values(currentDuckemonState).forEach(duckemon => {
                if (!duckemon.isDiscovered) {
                    let grantDiscovery = false;
                    if (duckemon.unlockMethod === 'level' && playerLevel >= duckemon.unlockValue) {
                        grantDiscovery = true;
                    } else if (duckemon.unlockMethod === 'qp' && totalQPAllTime >= duckemon.unlockValue) {
                        // This condition is for QP-based unlocks that might happen irrespective of level change
                        grantDiscovery = true;
                    }

                    if (grantDiscovery) {
                        duckemon.isDiscovered = true;
                        newDuckemonDiscoveredThisCycle = true;
                        console.log(`Discovered Duckemon: ${duckemon.name}! (Method: ${duckemon.unlockMethod}, Level: ${playerLevel}, TotalQP: ${formatNumber(totalQPAllTime)})`);
                        // If a specific Duckemon's display needs update in the main list, call renderDuckemon(duckemon);
                        // However, renderAllDuckemon() is usually called if new discoveries or level changes occur.
                    }
                }
            });

            if (playerLevel !== oldLevel) { // If player leveled up
                if (typeof renderAllDuckemon === 'function') renderAllDuckemon();
                if (typeof updateMemeCavern === 'function') updateMemeCavern();
            }

            if (newDuckemonDiscoveredThisCycle) {
                // If not already rendered due to level up, or to ensure specific new items are shown:
                if (playerLevel === oldLevel && typeof renderAllDuckemon === 'function') {
                    // Only call if no level up occurred but QP discoveries happened.
                    // Or, if renderDuckemon(duckemon) was used above, this might not be needed.
                    // For simplicity and robustness, always rendering all if new ones appear:
                    renderAllDuckemon();
                }
                if (typeof renderFullDuckedex === 'function') {
                    const duckedexTab = document.getElementById('duckedexTab');
                    if (duckedexTab && duckedexTab.style.display !== 'none') {
                        renderFullDuckedex();
                    }
                }
            }

            if(playerLevelDisplay) playerLevelDisplay.textContent = playerLevel;
            if(nextLevelQPDisplay) {
                if (playerLevel < finalLevelQPThresholds.length - 1) {
                    nextLevelQPDisplay.textContent = formatNumber(finalLevelQPThresholds[playerLevel + 1]);
                } else {
                    nextLevelQPDisplay.textContent = "Max Level";
                }
            }
        }

        function initializeGame() {
            qp = 0; qpPerClick = 1; qpPerSecond = 0; goldenFeathers = 0; totalQPAllTime = 0; playerLevel = 0;
            qAutoClickRatePerSecond = 10; // Reset Q-key autoclick rate to base
            currentDuckemonState = JSON.parse(JSON.stringify(allDuckemonData)); // Use loaded data
            Object.values(currentDuckemonState).forEach(duckemon => {
                duckemon.currentCost = duckemon.baseCost;
                duckemon.currentQPS = duckemon.baseQPS;
                duckemon.owned = 0; // Ensure owned is reset
                if ((duckemon.unlockMethod === 'qp' && duckemon.unlockValue === 0) || (duckemon.unlockMethod === 'level' && duckemon.unlockValue === 0)) {
                    duckemon.isDiscovered = true;
                } else {
                    duckemon.isDiscovered = false;
                }
            });
            if (typeof upgradeDefinitions !== 'undefined') upgradeDefinitions.forEach(u => u.purchased = false);
            if (typeof gfUpgradeDefinitions !== 'undefined') gfUpgradeDefinitions.forEach(u => u.purchased = false);
            updateQPDisplay(); updateQPSDisplay(); updateQPPerClickDisplay(); checkLevelUp();
            renderAllDuckemon(); renderAllUpgrades(); renderAllGFUpgrades();
            if (typeof renderFullDuckedex === 'function') renderFullDuckedex();
            checkLevelUp(); // Initial discovery check
        }

        function saveGame() {
            const gameState = {
                allDuckemon: JSON.parse(JSON.stringify(currentDuckemonState)), qp: qp, qpPerClick: qpPerClick,
                goldenFeathers: goldenFeathers, totalQPAllTime: totalQPAllTime, playerLevel: playerLevel,
                upgrades: typeof upgradeDefinitions !== 'undefined' ? upgradeDefinitions.map(u => ({ id: u.id, purchased: u.purchased })) : [],
                gfUpgrades: typeof gfUpgradeDefinitions !== 'undefined' ? gfUpgradeDefinitions.map(u => ({ id: u.id, purchased: u.purchased })) : [],
                qAutoClickRatePerSecond: qAutoClickRatePerSecond, // Save current Q-key autoclick rate
                lastSaveTime: Date.now(),
            ownedEggs: ownedEggs,
            nextEggId: nextEggId
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(gameState)); alert('Game Saved! Quack!');
        }

        function loadGame() {
            const savedState = localStorage.getItem(SAVE_KEY);
            if (savedState) {
                const gameState = JSON.parse(savedState);
                qp = gameState.qp || 0; qpPerClick = gameState.qpPerClick || 1; goldenFeathers = gameState.goldenFeathers || 0;
                totalQPAllTime = gameState.totalQPAllTime || 0; playerLevel = gameState.playerLevel || 0;
                qAutoClickRatePerSecond = gameState.qAutoClickRatePerSecond || 10; // Load Q-key autoclick rate, default to 10
            ownedEggs = gameState.ownedEggs || [];
            nextEggId = gameState.nextEggId || 0;

                // When loading, merge saved Duckemon data with allDuckemonData as base
                const loadedDuckemon = gameState.allDuckemon || {};
                currentDuckemonState = JSON.parse(JSON.stringify(allDuckemonData)); // Start with fresh base data

                Object.keys(currentDuckemonState).forEach(id => {
                    const base = currentDuckemonState[id]; // This is from allDuckemonData (fresh)
                    const saved = loadedDuckemon[id];     // This is from save file
                    if (saved) { // If this duckemon ID exists in the save file
                        base.owned = saved.owned || 0;
                        base.currentCost = saved.currentCost || base.baseCost * Math.pow(1.15, base.owned);
                        base.currentQPS = saved.currentQPS || base.baseQPS; // QPS might have been modified by upgrades
                        base.isDiscovered = saved.isDiscovered !== undefined ? saved.isDiscovered : (base.owned > 0);
                    } else { // If not in save file, ensure it's reset (already done by starting with fresh allDuckemonData copy)
                        base.owned = 0;
                        base.currentCost = base.baseCost;
                        base.currentQPS = base.baseQPS;
                        base.isDiscovered = (base.unlockMethod === 'qp' && base.unlockValue === 0) ||
                                            (base.unlockMethod === 'level' && base.unlockValue === 0);
                    }
                });

                if (typeof upgradeDefinitions !== 'undefined' && gameState.upgrades) {
                    gameState.upgrades.forEach(savedU => { const u = upgradeDefinitions.find(ud => ud.id === savedU.id); if(u) u.purchased = savedU.purchased; });
                }
                if (typeof gfUpgradeDefinitions !== 'undefined' && gameState.gfUpgrades) {
                    gameState.gfUpgrades.forEach(savedU => { const u = gfUpgradeDefinitions.find(ud => ud.id === savedU.id); if(u) u.purchased = savedU.purchased; });
                }
                applyAllGFUpgradeEffects(); reapplyPurchasedUpgrades(); calculateQPS();
                updateQPDisplay(); updateQPSDisplay(); updateQPPerClickDisplay(); checkLevelUp();
                renderAllDuckemon(); renderAllUpgrades(); renderAllGFUpgrades();
                alert('Game Loaded! Welcome back, Quack Commander!');
            } else {
                alert('No saved game found. Starting fresh!');
                initializeGame();
            }
        }

        function reapplyPurchasedUpgrades() {
            if (typeof upgradeDefinitions !== 'undefined') {
                upgradeDefinitions.forEach(u => { if (u.purchased) applyUpgradeEffect(u, false); });
            }
        }

        function renderAllDuckemon() {
            generatorsListContainer.innerHTML = '';
            const discoveredDuckemons = Object.values(currentDuckemonState).filter(d => d.isDiscovered);
            discoveredDuckemons.sort((a, b) => {
                const idA = a.id.toLowerCase(); // ignore case
                const idB = b.id.toLowerCase(); // ignore case
                const numAExtract = idA.match(/\d+$/);
                const numBExtract = idB.match(/\d+$/);
                let numA, numB;
                if (numAExtract) numA = parseInt(numAExtract[0]);
                if (numBExtract) numB = parseInt(numBExtract[0]);

                const prefixA = idA.replace(/\d+$/, '');
                const prefixB = idB.replace(/\d+$/, '');

                if (prefixA !== prefixB) {
                    return prefixA.localeCompare(prefixB);
                }
                if (numA !== undefined && numB !== undefined) {
                    return numA - numB;
                }
                return idA.localeCompare(idB); // Fallback for non-numeric or mixed
            });
            discoveredDuckemons.forEach(duckemon => renderDuckemon(duckemon));
        }

        function renderDuckemon(duckemon) {
            const itemDiv = document.createElement('div'); itemDiv.className = 'generator item';
            const nameDiv = document.createElement('div'); nameDiv.className = 'name';
            nameDiv.textContent = duckemon.name + (duckemon.owned > 0 ? ` (x${duckemon.owned})` : '');
            const iconEl = document.createElement('img'); // Renamed to iconEl
            iconEl.alt = duckemon.name;
            iconEl.className = 'item-icon';

            applyDuckemonEffects('duck_closed.png', duckemon)
                .then(dataUrl => {
                    iconEl.src = dataUrl;
                })
                .catch(error => {
                    console.error(`Error applying effects to Duckemon ${duckemon.id} in generator list:`, error);
                    iconEl.src = 'duck_closed.png'; // Fallback
                });
            nameDiv.prepend(iconEl);

            const detailsDiv = document.createElement('div'); detailsDiv.className = 'details';
            const button = document.createElement('button'); button.textContent = 'Buy';
            button.onclick = () => buyDuckemon(duckemon.id);
            if (!duckemon.isDiscovered) { itemDiv.style.display = 'none'; return; }
            itemDiv.style.display = 'block';
            let unlockText = '';
            // Unlock text should primarily rely on isDiscovered. Button disable logic is primary.
            // This text is more for "why it's not buyable if discovered but conditions not met"
            // For items that are NOT discovered, they shouldn't even be rendered by this function.
            // The visibility is handled by renderAllDuckemon not calling renderDuckemon for undiscovered.
            // However, if an item *is* discovered but has a secondary buy condition (e.g. level for a QP-unlocked item if we add such a thing)
            // For now, the existing qp < currentCost is the main disable for BUY button.
            // The unlockValue checks are more for initial discovery.
            if (duckemon.unlockMethod === 'qp' && totalQPAllTime < duckemon.unlockValue && duckemon.owned === 0 && !duckemon.isDiscovered) { // Should not happen if !isDiscovered hides it
                unlockText = ' (Requires ' + formatNumber(duckemon.unlockValue) + ' total QP to see)';
            } else if (duckemon.unlockMethod === 'level' && playerLevel < duckemon.unlockValue && duckemon.owned === 0 && !duckemon.isDiscovered) { // Should not happen
                unlockText = ' (Requires Lvl ' + duckemon.unlockValue + ' to see)';
            }
            // Disable button if not enough QP
            button.disabled = qp < duckemon.currentCost;

            detailsDiv.innerHTML = `Owned: ${duckemon.owned} <br> Current QPS: ${formatNumber(duckemon.currentQPS)} <br> Cost: ${formatNumber(duckemon.currentCost)}`;
            itemDiv.appendChild(nameDiv); itemDiv.appendChild(detailsDiv); itemDiv.appendChild(button);
            generatorsListContainer.appendChild(itemDiv);
        }

        function buyDuckemon(duckemonId) {
            console.log(`Buying Duckemon: ${duckemonId}. QP before: ${qp}, Cost: ${currentDuckemonState[duckemonId] ? currentDuckemonState[duckemonId].currentCost : 'N/A'}`);
            const duckemon = currentDuckemonState[duckemonId];
            // Condition to check if player can buy: QP must be sufficient AND (if it's a level-locked item, player level must be sufficient OR if it's QP-locked, total QP must be sufficient - this part is for initial discovery, not re-buying)
            // The primary check for buying is simply having enough QP for the currentCost if the item is already discovered and visible.
            if (duckemon && duckemon.isDiscovered && qp >= duckemon.currentCost) {
                // Secondary checks for buying (e.g. if a specific level is needed to *purchase* even if discovered earlier)
                // For now, we assume if it's discovered and you have QP, you can buy.
                // The unlockValue checks in renderDuckemon are more for display hints if an item is visible but somehow not buyable.

                qp -= duckemon.currentCost;
                duckemon.owned++;
                duckemon.currentCost = duckemon.baseCost * Math.pow(1.15, duckemon.owned);
                // isDiscovered is already true if we are here.
                calculateQPS();
                updateQPDisplay();
                renderAllDuckemon();
                checkLevelUp(); // Check if this purchase causes a level up or other unlocks
                console.log(`QP After: ${qp}, Owned: ${duckemon.owned}, New Cost: ${duckemon.currentCost}`);
            }
        }

        function calculateQPS() {
            console.log('Calculating QPS. CurrentDuckemonState:', JSON.parse(JSON.stringify(currentDuckemonState)));
            let newQPS = 0;
            Object.values(currentDuckemonState).forEach(g => { if(g.isDiscovered && g.owned > 0) newQPS += g.owned * g.currentQPS; });
            console.log('New QPS calculated:', newQPS);
            qpPerSecond = newQPS; updateQPSDisplay();
        }

        function performRebirth() {
            if (playerLevel >= 7) {
                const feathersToGain = Math.floor(Math.sqrt(totalQPAllTime / 1e9)) + playerLevel;
                if (confirm(`Are you sure you want to rebirth? You will gain ${feathersToGain} Golden Feathers but lose all QP, Ducks, and regular Upgrades.`)) {
                    goldenFeathers += feathersToGain; qp = 0; qpPerClick = 1; totalQPAllTime = 0; playerLevel = 0;
                    qAutoClickRatePerSecond = 10; // Reset Q-key autoclick rate to base on rebirth
                    Object.values(currentDuckemonState).forEach(duckemon => {
                        const baseData = allDuckemonData[duckemon.id]; duckemon.owned = 0;
                        duckemon.currentCost = baseData.baseCost; duckemon.currentQPS = baseData.baseQPS;
                        duckemon.isDiscovered = ((baseData.unlockMethod === 'qp' && baseData.unlockValue === 0) || (baseData.unlockMethod === 'level' && baseData.unlockValue === 0));
                    });
                    if (typeof upgradeDefinitions !== 'undefined') upgradeDefinitions.forEach(u => u.purchased = false);
                    applyAllGFUpgradeEffects(); updateQPDisplay(); updateQPSDisplay(); updateQPPerClickDisplay();
                    updateGoldenFeathersDisplay(); checkLevelUp(); renderAllDuckemon(); renderAllUpgrades();
                    renderAllGFUpgrades(); updateRebirthButtonVisibility(); updateGFOnRebirthDisplay();
                }
            } else { alert("You need to reach a higher level to rebirth!"); }
        }

        function applyUpgradeEffect(upgrade, chargeCost = true) {
            if (chargeCost) {
                if (upgrade.currency === 'qp' && qp >= upgrade.cost) qp -= upgrade.cost;
                else if (upgrade.currency === 'gf' && goldenFeathers >= upgrade.cost) { goldenFeathers -= upgrade.cost; updateGoldenFeathersDisplay(); }
                else return;
                upgrade.purchased = true;
            }
            if (upgrade.target === 'click') qpPerClick *= upgrade.multiplier;
            else if (upgrade.target === 'all') Object.values(currentDuckemonState).forEach(d => { if(d.isDiscovered) d.currentQPS *= upgrade.multiplier; });
            else if (currentDuckemonState[upgrade.target]) {
                const dtu = currentDuckemonState[upgrade.target]; if (dtu.isDiscovered) {
                    if (upgrade.effect === 'multiplyBase') dtu.currentQPS = allDuckemonData[dtu.id].baseQPS * upgrade.multiplier;
                    else dtu.currentQPS *= upgrade.multiplier;
                }
            } else if (upgrade.target === "qKeyAutoclickRate") {
                qAutoClickRatePerSecond += upgrade.value;
                console.log(`Q-key auto-click rate upgraded to: ${qAutoClickRatePerSecond} clicks/sec.`);
                // If Q auto-click is currently active, restart it with the new rate
                if (isQautoClickActive && qAutoClickIntervalId !== null) {
                    clearInterval(qAutoClickIntervalId);
                    qAutoClickIntervalId = setInterval(performQautoClick, 1000 / qAutoClickRatePerSecond);
                }
            }
            if (upgrade.currency === 'gf') applyAllGFUpgradeEffects();
            calculateQPS(); updateQPDisplay(); updateQPPerClickDisplay();
            if (upgrade.currency === 'qp') renderAllUpgrades(); else if (upgrade.currency === 'gf') renderAllGFUpgrades();
            renderAllDuckemon();
        }

        function applyAllGFUpgradeEffects() {
            // Reset relevant stats to their absolute base values before applying GF upgrades
            qpPerClick = 1; // Absolute base for clicking power
            Object.values(currentDuckemonState).forEach(d => {
                if(allDuckemonData[d.id]) d.currentQPS = allDuckemonData[d.id].baseQPS;
            });

            // Apply purchased GF upgrades
            if (typeof gfUpgradeDefinitions !== 'undefined') {
                gfUpgradeDefinitions.forEach(u => {
                    if (u.purchased) {
                        // Directly apply effect without charging cost or re-calling applyAllGFUpgradeEffects
                        if (u.target === 'click') {
                            qpPerClick *= u.multiplier;
                        } else if (u.target === 'all') {
                            Object.values(currentDuckemonState).forEach(d => {
                                if(d.isDiscovered) d.currentQPS *= u.multiplier;
                            });
                        } else if (currentDuckemonState[u.target]) {
                            const dtu = currentDuckemonState[u.target];
                            if (dtu.isDiscovered) {
                                // Assuming GF upgrades always multiply currentQPS after it's reset to baseQPS.
                                // If a GF upgrade were to use 'multiplyBase', it would mean baseQPS * multiplier,
                                // which is already handled by the QPS reset if only one such upgrade exists.
                                // For simplicity and to avoid complex stacking logic within GF upgrades themselves here,
                                // we'll assume they directly multiply the now base QPS.
                                dtu.currentQPS *= u.multiplier;
                            }
                        }
                    }
                });
            }

            // After applying all GF effects, recalculate QPS and update displays
            calculateQPS();
            updateQPPerClickDisplay(); // Make sure click display is updated
            renderAllDuckemon(); // Re-render duckemon to show updated QPS values
        }

        initializeGame(); // This call is crucial. It now uses the currentDuckemonState that was just prepared.
        loadGame();

    if (acquireCommonEggTestBtn) acquireCommonEggTestBtn.addEventListener('click', () => acquireEgg("CommonEgg"));
    if (acquireMysteriousEggTestBtn) acquireMysteriousEggTestBtn.addEventListener('click', () => acquireEgg("MysteriousEgg"));

    // Initial render of egg slots in case game is loaded with eggs
    if (typeof renderEggSlots === 'function') renderEggSlots();

        // --- Q-key Autoclicker Functions ---
        function performQautoClick() {
            qp += qpPerClick;
            totalQPAllTime += qpPerClick;
            updateQPDisplay();
            checkLevelUp(); // Check for level ups or other unlocks triggered by QP gain

            // Visual Feedback
            const duckImg = document.getElementById('clickableDuckV2'); // Re-fetch in case it was re-rendered
            if (duckImg) {
                duckImg.src = 'duck_open.png';
                setTimeout(() => { if (duckImg) duckImg.src = 'duck_closed.png'; }, 50);
            }

            // Sound Feedback (accessing isClickerQuackEnabled and clickerQuackSound from outer scope)
            if (isClickerQuackEnabled && clickerQuackSound) {
                clickerQuackSound.currentTime = 0;
                clickerQuackSound.play().catch(error => console.error("Error playing quack sound during auto-click:", error));
            }
        }

        function handleQKeyDown(event) {
            if ((event.key === 'q' || event.key === 'Q') && !isQautoClickActive) {
                isQautoClickActive = true;
                performQautoClick(); // Perform first click immediately
                if (qAutoClickIntervalId === null) { // Ensure no multiple intervals
                    qAutoClickIntervalId = setInterval(performQautoClick, 1000 / qAutoClickRatePerSecond);
                }
            }
        }

        function handleQKeyUp(event) {
            if (event.key === 'q' || event.key === 'Q') {
                if (qAutoClickIntervalId !== null) {
                    clearInterval(qAutoClickIntervalId);
                    qAutoClickIntervalId = null;
                }
                isQautoClickActive = false;
            }
        }

        document.addEventListener('keydown', handleQKeyDown);
        document.addEventListener('keyup', handleQKeyUp);

        // --- End Q-key Autoclicker Functions ---


        setInterval(() => {
            qp += qpPerSecond / 10; totalQPAllTime += qpPerSecond / 10; updateQPDisplay(); checkLevelUp();
        if (document.getElementById('hatcheryTab') && document.getElementById('hatcheryTab').style.display !== 'none') {
            if (typeof renderEggSlots === 'function') renderEggSlots(); // Refresh egg display if tab is visible
        }
            // Check for Duckemon unlocks based on QP (totalQPAllTime)
            let newlyDiscoveredByQP = false;
            Object.values(currentDuckemonState).forEach(duckemon => {
                if (!duckemon.isDiscovered && duckemon.unlockMethod === 'qp' && totalQPAllTime >= duckemon.unlockValue) {
                    duckemon.isDiscovered = true;
                    newlyDiscoveredByQP = true;
                    console.log(`Discovered Duckemon by QP: ${duckemon.name}`);
                    // The call to renderDuckemon(duckemon) is removed from here.
                }
            });

            if (newlyDiscoveredByQP) {
                if (typeof renderAllDuckemon === 'function') {
                    renderAllDuckemon(); // Call renderAllDuckemon to update the sorted list
                }
                if (typeof renderFullDuckedex === 'function') {
                    const duckedexTab = document.getElementById('duckedexTab');
                    if (duckedexTab && duckedexTab.style.display !== 'none') {
                        renderFullDuckedex();
                    }
                }
            }
        }, 100);
        setInterval(() => { updateRebirthButtonVisibility(); updateGFOnRebirthDisplay(); }, 1000);

        if(clickableDuckV2) clickableDuckV2.onclick = () => { qp += qpPerClick; totalQPAllTime += qpPerClick; updateQPDisplay(); };
        if(saveGameButton) saveGameButton.onclick = saveGame;
        if(loadGameButton) loadGameButton.onclick = loadGame;
        if(resetGameButton) resetGameButton.onclick = () => { if (confirm("Are you sure you want to reset all progress? This cannot be undone!")) { localStorage.removeItem(SAVE_KEY); initializeGame(); } };
        if(rebirthButton) rebirthButton.onclick = performRebirth;

    // --- Egg Hatchery Functions ---
    function acquireEgg(eggTypeName) {
        if (!eggTypes[eggTypeName]) {
            console.error(`Unknown egg type: ${eggTypeName}`);
            return;
        }
        if (ownedEggs.length >= 6) { // Max 6 eggs at a time (example limit)
            alert("Your hatchery is full! Hatch some eggs to make space.");
            return;
        }
        const newEgg = {
            id: nextEggId++,
            type: eggTypeName,
            hatchStartTime: Date.now()
        };
        ownedEggs.push(newEgg);
        console.log(`Acquired ${eggTypes[eggTypeName].name}`);
        renderEggSlots();
        // In a real implementation, this might be tied to an achievement, drop, shop, etc.
    }

    function renderEggSlots() {
        if (!eggSlotsContainer) return;
        eggSlotsContainer.innerHTML = ''; // Clear existing slots

        if (ownedEggs.length === 0) {
            eggSlotsContainer.innerHTML = '<p style="color:#777; font-style:italic;">No eggs in incubation.</p>';
            return;
        }

        ownedEggs.forEach((egg, index) => {
            const eggData = eggTypes[egg.type];
            const elapsedTimeMs = Date.now() - egg.hatchStartTime;
            const totalDurationMs = eggData.hatchDurationSeconds * 1000;
            const progressPercent = Math.min(100, (elapsedTimeMs / totalDurationMs) * 100);
            const timeLeftMs = Math.max(0, totalDurationMs - elapsedTimeMs);
            const timeLeftStr = timeLeftMs > 0 ? formatTime(timeLeftMs / 1000) : "Ready!";

            const slotDiv = document.createElement('div');
            slotDiv.className = 'egg-slot';
            slotDiv.style.border = '1px solid #555';
            slotDiv.style.padding = '10px';
            slotDiv.style.width = '120px';
            slotDiv.style.textAlign = 'center';
            slotDiv.style.backgroundColor = '#333';
            slotDiv.style.borderRadius = '5px';

            slotDiv.innerHTML = `
                <h5 style="font-size:14px; color:#fff2cc; margin-top:0;">${eggData.name}</h5>
                <img src="duck_closed.png" alt="Egg" style="width:40px; height:40px; image-rendering:pixelated; filter: hue-rotate(${egg.type === 'MysteriousEgg' ? '120deg' : '0deg'}) saturate(1.5);">
                <div style="background:#111; border-radius:3px; padding:2px; margin:5px 0;">
                    <div style="background:#2ecc71; width:${progressPercent}%; height:10px; border-radius:2px;"></div>
                </div>
                <p style="font-size:11px; color:#ccc;">${timeLeftStr}</p>
                <button class="hatch-egg-btn" data-egg-index="${index}" ${timeLeftMs > 0 ? 'disabled' : ''}>Hatch</button>
            `;
            const hatchButton = slotDiv.querySelector('.hatch-egg-btn');
            if (hatchButton) {
                hatchButton.style.opacity = timeLeftMs > 0 ? 0.5 : 1;
                hatchButton.addEventListener('click', () => hatchEgg(index));
            }
            eggSlotsContainer.appendChild(slotDiv);
        });
    }

    function hatchEgg(eggSlotIndex) {
        if (eggSlotIndex < 0 || eggSlotIndex >= ownedEggs.length) return;

        const egg = ownedEggs[eggSlotIndex];
        const eggData = eggTypes[egg.type];
        const elapsedTimeMs = Date.now() - egg.hatchStartTime;
        const totalDurationMs = eggData.hatchDurationSeconds * 1000;

        if (elapsedTimeMs < totalDurationMs) {
            alert("This egg isn't ready to hatch yet!");
            return;
        }

        // Select a Duckemon from the egg's possible list
        const possible = eggData.possibleDuckemonIds.filter(id => currentDuckemonState[id] && !currentDuckemonState[id].isDiscovered);
        let chosenDuckemonId = null;
        if (possible.length > 0) {
            chosenDuckemonId = possible[Math.floor(Math.random() * possible.length)];
        } else {
            // Fallback: if all possible are discovered, maybe give a small QP reward or a common, already discovered one?
            alert(`The egg hatched, but you've already discovered all its potential Duckemon! You get a consolation prize of 1000 QP.`);
            qp += 1000; totalQPAllTime += 1000; updateQPDisplay();
            ownedEggs.splice(eggSlotIndex, 1); // Remove egg
            renderEggSlots();
            return;
        }

        if (chosenDuckemonId && currentDuckemonState[chosenDuckemonId]) {
            currentDuckemonState[chosenDuckemonId].isDiscovered = true;
            // currentDuckemonState[chosenDuckemonId].owned++; // Optionally give the first one free
            alert(`Congratulations! Your ${eggData.name} hatched into a ${currentDuckemonState[chosenDuckemonId].name}!`);

            if (typeof renderAllDuckemon === 'function') renderAllDuckemon(); // Update main generator list for sorting
            if (typeof renderFullDuckedex === 'function') {
                const duckedexTab = document.getElementById('duckedexTab');
                if (duckedexTab && duckedexTab.style.display !== 'none') renderFullDuckedex();
            }
        }

        ownedEggs.splice(eggSlotIndex, 1); // Remove egg
        renderEggSlots();
        // updateDisplays(); was here, but it's not defined. updateQPDisplay and checkLevelUp are called below.
        updateQPDisplay(); // Ensure QP display updates if consolation prize was given.
        checkLevelUp(); // Check if discovering this Duckemon leads to a level up or other unlocks.
    }

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        let str = "";
        if (hours > 0) str += `${hours}h `;
        if (minutes > 0 || hours > 0) str += `${minutes}m `; // Show minutes if hours are present or minutes > 0
        str += `${seconds}s`;
        return str.trim();
    }
        // --- Duckedex Functions ---
        // function renderDuckedexEntry(duckemon) { /* ... */ } // Commented out as it's defined below
        // function renderFullDuckedex() { /* ... */ } // Commented out as it's defined below
        // function showDuckedexDetailModal(duckemonId) { /* ... */ } // Commented out as it's defined below

        // Keep original Duckedex rendering logic (renderDuckedexEntry, renderFullDuckedex, showDuckedexDetailModal)
        // And their supporting UI update calls / observers.
        // (The full code for these functions was present in the earlier read_file output)
        function renderDuckedexEntry(duckemon) {
            if (!duckedexGrid) return;
            let entryDiv = document.getElementById(`duckedex-${duckemon.id}`);
            if (!entryDiv) {
                entryDiv = document.createElement('div'); entryDiv.id = `duckedex-${duckemon.id}`; entryDiv.className = 'duckedex-entry';
                entryDiv.style.border = '1px solid #4a4a4a'; entryDiv.style.padding = '10px'; entryDiv.style.textAlign = 'center';
                entryDiv.style.backgroundColor = '#282828'; entryDiv.style.borderRadius = '8px'; entryDiv.style.color = '#ddd';
                duckedexGrid.appendChild(entryDiv);
            }
            if (duckemon.isDiscovered) {
                // Create placeholder for image element
                const imgPlaceholder = document.createElement('div');
                imgPlaceholder.style.width = '50px'; // Match expected image size
                imgPlaceholder.style.height = '50px';
                imgPlaceholder.style.display = 'inline-block'; // Or block with text-align center on parent
                imgPlaceholder.style.border = '1px solid #555';
                imgPlaceholder.style.backgroundColor = '#333';
                imgPlaceholder.style.borderRadius = '4px';
                imgPlaceholder.style.marginBottom = '5px';

                entryDiv.innerHTML = ''; // Clear previous content before appending
                entryDiv.appendChild(imgPlaceholder); // Add placeholder first

                const iconImgEl = document.createElement('img');
                iconImgEl.alt = duckemon.name;
                iconImgEl.style.width = '50px';
                iconImgEl.style.height = '50px';
                // iconImgEl.style.border = '1px solid #555'; // Style applied by placeholder or entryDiv
                iconImgEl.style.imageRendering = 'pixelated';
                // iconImgEl.style.backgroundColor = '#333'; // Style applied by placeholder or entryDiv
                iconImgEl.style.borderRadius = '4px';
                iconImgEl.style.marginBottom = '5px';

                applyDuckemonEffects('duck_closed.png', duckemon)
                    .then(dataUrl => {
                        iconImgEl.src = dataUrl;
                        if(imgPlaceholder.parentNode === entryDiv) { // Check if placeholder is still there
                           entryDiv.replaceChild(iconImgEl, imgPlaceholder);
                        } else { // If placeholder was removed by other means, just append
                           entryDiv.prepend(iconImgEl); // Or append, depending on desired order
                        }
                    })
                    .catch(error => {
                        console.error(`Error applying effects to Duckedex ${duckemon.id}:`, error);
                        iconImgEl.src = 'duck_closed.png'; // Fallback
                         if(imgPlaceholder.parentNode === entryDiv) {
                           entryDiv.replaceChild(iconImgEl, imgPlaceholder);
                        } else {
                           entryDiv.prepend(iconImgEl);
                        }
                    });

                const textContentDiv = document.createElement('div');
                textContentDiv.innerHTML = `
                    <h5 style="font-size: 13px; color: #00cyan; margin: 5px 0 2px 0; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${duckemon.name}</h5>
                    <p style="font-size: 10px; color: #aaa; margin: 0;">${duckemon.type1 ? duckemon.type1 : ''}${duckemon.type2 ? ' / ' + duckemon.type2 : ''}</p>
                    <p style="font-size: 9px; color: #888; margin: 2px 0 0 0;">Owned: ${duckemon.owned}</p>`;
                entryDiv.appendChild(textContentDiv);

                entryDiv.style.cursor = 'pointer'; entryDiv.onclick = () => showDuckedexDetailModal(duckemon.id);
                entryDiv.style.borderColor = duckemon.owned > 0 ? '#00ff00' : '#4a4a4a';
            } else {
                // Undiscovered Duckemon logic remains the same
                entryDiv.innerHTML = `
                    <img src="duck_closed.png" alt="Undiscovered" style="width: 50px; height: 50px; filter: brightness(0.15) grayscale(1); image-rendering: pixelated; margin-bottom: 5px;">
                    <h5 style="font-size: 13px; color: #555; margin: 5px 0 2px 0; font-weight: bold;">???</h5>
                    <p style="font-size: 10px; color: #555; margin: 0;">Undiscovered</p>`;
                entryDiv.style.cursor = 'default'; entryDiv.onclick = null; entryDiv.style.borderColor = '#333';
            }
        }

        function renderFullDuckedex() {
            if (!duckedexGrid) return;
            const sortedDuckemonArray = Object.values(currentDuckemonState).sort((a, b) => {
                const numA = parseInt(a.id.replace(/\D/g,''), 10); const numB = parseInt(b.id.replace(/\D/g,''), 10);
                if (isNaN(numA) || isNaN(numB)) return a.id.localeCompare(b.id); return numA - numB;
            });
            sortedDuckemonArray.forEach(duckemon => renderDuckedexEntry(duckemon));
        }

        function showDuckedexDetailModal(duckemonId) {
            const duckemon = currentDuckemonState[duckemonId]; if (!duckemon || !duckemon.isDiscovered) return;
            let details = `[ ${duckemon.name} ]\\nType: ${duckemon.type1 ? duckemon.type1 : 'N/A'}${duckemon.type2 ? ' / ' + duckemon.type2 : ''}\\n------------------------------------\\nDescription: ${duckemon.description}\\n------------------------------------\\nOwned: ${duckemon.owned}\\nBase Cost: ${formatNumber(duckemon.baseCost)} QP\\nCurrent Cost: ${formatNumber(duckemon.currentCost)} QP\\nBase QPS: ${formatNumber(duckemon.baseQPS)}/s\\nCurrent QPS (per unit): ${formatNumber(duckemon.currentQPS)}/s\\n`;
            if (duckemon.evolvesFrom && currentDuckemonState[duckemon.evolvesFrom]) details += `Evolves From: ${currentDuckemonState[duckemon.evolvesFrom].name}\\n`;
            if (duckemon.evolvesTo && currentDuckemonState[duckemon.evolvesTo]) details += `Evolves To: ${currentDuckemonState[duckemon.evolvesTo].name} (${duckemon.evolutionCondition || 'Condition TBD'})\\n`;
            if (duckemon.uniqueAbility) details += `Unique Ability: ${duckemon.uniqueAbility}\\n`;
            alert(details);
        }

        const duckedexTabForObserver = document.getElementById('duckedexTab');
        if (duckedexTabForObserver) {
            const observer = new MutationObserver(mutationsList => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (duckedexTabForObserver.style.display !== 'none' && duckedexGrid.innerHTML.trim() === '') renderFullDuckedex();
                    }
                }
            });
            observer.observe(duckedexTabForObserver, { attributes: true });
        }

        updateGoldenFeathersDisplay(); updateRebirthButtonVisibility(); updateGFOnRebirthDisplay();
        renderAllDuckemon(); renderAllUpgrades(); renderAllGFUpgrades();
        if (typeof renderFullDuckedex === 'function') renderFullDuckedex();
        checkLevelUp();


        function updateQPDisplay() { if(qpAmountDisplay) qpAmountDisplay.textContent = formatNumber(qp); }
        function updateQPSDisplay() { if(qpPerSecondDisplay) qpPerSecondDisplay.textContent = formatNumber(qpPerSecond) + ' QP/s'; }
        function updateQPPerClickDisplay() { if(qpPerClickDisplay) qpPerClickDisplay.textContent = formatNumber(qpPerClick) + ' QP/click'; }
        function updateGoldenFeathersDisplay() { if(goldenFeathersDisplay) goldenFeathersDisplay.textContent = formatNumber(goldenFeathers); }

        function updateRebirthButtonVisibility() {
            if(rebirthButton) rebirthButton.style.display = (playerLevel >= 7) ? 'block' : 'none';
        }
        function updateGFOnRebirthDisplay() {
            if(gfOnRebirthDisplay) {
              const feathersToGain = Math.floor(Math.sqrt(totalQPAllTime / 1e9)) + playerLevel;
              gfOnRebirthDisplay.textContent = `Rebirth for +${formatNumber(feathersToGain)} Golden Feathers`;
            }
        }

        function renderAllUpgrades() {
            if(!upgradesListContainer) return; upgradesListContainer.innerHTML = '';
            if (typeof upgradeDefinitions !== 'undefined') {
                upgradeDefinitions.forEach(u => { if (!u.purchased) renderUpgrade(u, upgradesListContainer); });
            }
        }
        function renderAllGFUpgrades() {
            if(!gfUpgradesListContainer) return; gfUpgradesListContainer.innerHTML = '';
            if (typeof gfUpgradeDefinitions !== 'undefined') {
                gfUpgradeDefinitions.forEach(u => renderUpgrade(u, gfUpgradesListContainer));
            }
        }

        function renderUpgrade(upgrade, container) {
            const itemDiv = document.createElement('div'); itemDiv.className = 'upgrade item'; itemDiv.id = upgrade.id;
            const nameDiv = document.createElement('div'); nameDiv.className = 'name'; nameDiv.textContent = upgrade.name;
            const iconEl = document.createElement('img'); // Renamed to iconEl to avoid conflict
            iconEl.alt = upgrade.name;
            iconEl.className = 'item-icon';

            const quackEnhancementColor = 'rgba(0, 150, 255, 0.7)'; // Blue for QP upgrades
            const goldenFeatherBlessingColor = 'rgba(255, 215, 0, 0.7)'; // Gold for GF upgrades

            if (upgrade.icon === 'duck_closed.png') {
                const colorToApply = upgrade.currency === 'gf' ? goldenFeatherBlessingColor : quackEnhancementColor;
                recolorImage(upgrade.icon, colorToApply)
                    .then(recoloredUrl => {
                        iconEl.src = recoloredUrl;
                    })
                    .catch(error => {
                        console.error("Failed to recolor upgrade icon:", upgrade.id, error);
                        iconEl.src = upgrade.icon || 'duck_closed.png'; // Fallback to original
                    });
            } else {
                iconEl.src = upgrade.icon || 'duck_closed.png'; // Use original icon if not duck_closed.png
            }
            nameDiv.prepend(iconEl);

            const detailsDiv = document.createElement('div'); detailsDiv.className = 'details';
            detailsDiv.innerHTML = `${upgrade.description} <br> Cost: ${formatNumber(upgrade.cost)} ${upgrade.currency === 'gf' ? 'GF' : 'QP'}`;
            const button = document.createElement('button'); button.textContent = 'Buy Upgrade';
            if (upgrade.purchased) { button.textContent = 'Purchased'; button.disabled = true; }
            else {
                button.onclick = () => buyUpgrade(upgrade.id, upgrade.currency);
                if (upgrade.currency === 'gf') button.disabled = goldenFeathers < upgrade.cost;
                else button.disabled = qp < upgrade.cost;
            }
            itemDiv.appendChild(nameDiv); itemDiv.appendChild(detailsDiv); itemDiv.appendChild(button); container.appendChild(itemDiv);
        }

        function buyUpgrade(upgradeId, currencyType) {
            let upDef;
            if (currencyType === 'gf') upDef = gfUpgradeDefinitions.find(u => u.id === upgradeId);
            else upDef = upgradeDefinitions.find(u => u.id === upgradeId);
            if (!upDef || upDef.purchased) return;
            applyUpgradeEffect(upDef);
        }
    } // End of startGameInitialization function

    loadGameData(); // Call to start loading data
}); // End of DOMContentLoaded
