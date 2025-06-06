document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const clickableDuckV2 = document.getElementById('clickableDuckV2');
    const qpAmountDisplay = document.getElementById('qpAmount');
    const qpPerSecondDisplay = document.getElementById('qpPerSecond');
    const qpPerClickDisplay = document.getElementById('qpPerClick');
    const generatorsListContainer = document.getElementById('generatorsListContainer');
    const upgradesListContainer = document.getElementById('upgradesListContainer');

    // Game State Variables
    let qp = 0;
    let qpPerClick = 1;
    let qpPerSecond = 0;

    // Generator Definitions (based on our design document)
    const generators = [
        {
            id: 'babyDuckling',
            name: 'Baby Duckling',
            description: 'A tiny, adorable source of passive quacks. Peep!',
            baseCost: 15,
            cost: 15,
            baseOutput: 0.1,
            outputPerGenerator: 0.1, // Current output considering upgrades
            owned: 0,
            icon: typeof duckClosed !== 'undefined' ? duckClosed : '', // From duck.js
            element: null // Will hold the DOM element for this generator
        },
        {
            id: 'breadScavenger',
            name: 'Bread Scavenger',
            description: 'This duck knows where all the discarded bread is.',
            baseCost: 100,
            cost: 100,
            baseOutput: 1,
            outputPerGenerator: 1,
            owned: 0,
            icon: typeof duckClosed !== 'undefined' ? duckClosed : '',
            element: null
        },
        {
            id: 'keyboardWarrior',
            name: 'Quack-Powered Keyboard Warrior',
            description: 'Aggressively quacks online, somehow generating QP.',
            baseCost: 1100,
            cost: 1100,
            baseOutput: 8,
            outputPerGenerator: 8,
            owned: 0,
            icon: typeof duckClosed !== 'undefined' ? duckClosed : '',
            element: null
        },
        {
            id: 'duckArmyRecruit',
            name: 'Duck Army Recruit',
            description: 'One of many. They march for QP.',
            baseCost: 12000,
            cost: 12000,
            baseOutput: 47,
            outputPerGenerator: 47,
            owned: 0,
            icon: typeof duckClosed !== 'undefined' ? duckClosed : '',
            element: null
        },
        {
            id: 'memeAiDuck',
            name: 'Meme-Generating AI Duck',
            description: 'This advanced AI churns out viral duck memes, and QP.',
            baseCost: 130000,
            cost: 130000,
            baseOutput: 260,
            outputPerGenerator: 260,
            owned: 0,
            icon: typeof duckClosed !== 'undefined' ? duckClosed : '',
            element: null
        },
        {
            id: 'ducktopiaPortal',
            name: 'Ducktopia Portal',
            description: 'Opens a rift to a dimension of pure quack energy.',
            baseCost: 1400000,
            cost: 1400000,
            baseOutput: 1400,
            outputPerGenerator: 1400,
            owned: 0,
            icon: typeof duckClosed !== 'undefined' ? duckClosed : '',
            element: null
        }
        // More can be added later
    ];

    const upgrades = [
        // Click Upgrades
        {
            id: 'reinforcedBeak1',
            name: 'Reinforced Beak I',
            description: 'Your clicks are twice as effective!',
            cost: 100,
            type: 'click', // 'click', 'generator', 'global'
            targetId: null, // For generator upgrades, this would be generator.id
            effectType: 'multiplier', // 'multiplier', 'additive'
            effectValue: 2,
            purchased: false,
            prerequisite: () => true, // No prerequisite for this one initially
            element: null
        },
        {
            id: 'goldenDuckCall',
            name: 'Golden Duck Call',
            description: 'Attracts more valuable quacks with each click.',
            cost: 500,
            type: 'click',
            effectType: 'multiplier',
            effectValue: 2,
            purchased: false,
            prerequisite: () => upgrades.find(u => u.id === 'reinforcedBeak1')?.purchased, // Requires Reinforced Beak I
            element: null
        },
        {
            id: 'mechanicalClickingFinger',
            name: 'Mechanical Clicking Finger',
            description: 'Automated precision for your clicks.',
            cost: 10000,
            type: 'click',
            effectType: 'multiplier',
            effectValue: 2,
            purchased: false,
            prerequisite: () => upgrades.find(u => u.id === 'goldenDuckCall')?.purchased,
            element: null
        },
        // Generator Upgrades (Example for Baby Duckling)
        {
            id: 'extraFluffyDucklings',
            name: 'Extra Fluffy Ducklings',
            description: 'Baby Ducklings produce twice as much QP.',
            cost: 1000,
            type: 'generator',
            targetId: 'babyDuckling',
            effectType: 'multiplier',
            effectValue: 2,
            purchased: false,
            prerequisite: () => generators.find(g => g.id === 'babyDuckling')?.owned >= 1,
            element: null
        },
        {
            id: 'ducklingDaycare',
            name: 'Duckling Daycare Center',
            description: 'Baby Ducklings are even more efficient (+50% output).',
            cost: 5000,
            type: 'generator',
            targetId: 'babyDuckling',
            effectType: 'multiplier', // Applying a 1.5x multiplier
            effectValue: 1.5,
            purchased: false,
            prerequisite: () => generators.find(g => g.id === 'babyDuckling')?.owned >= 10 && upgrades.find(u => u.id === 'extraFluffyDucklings')?.purchased,
            element: null
        },
        // Global Upgrades
        {
            id: 'quackMultiplierRitual',
            name: 'Quack Multiplier Ritual',
            description: 'All QP production from generators doubled.',
            cost: 50000,
            type: 'global', // Affects all generators' calculated output
            effectType: 'multiplier',
            effectValue: 2,
            purchased: false,
            prerequisite: () => qpPerSecond >= 100, // Example: need 100 QPS before this shows
            element: null
        }
        // More upgrades to be added
    ];

    // --- Initialization ---
    function initializeGame() {
        // Set initial duck image (make sure duck.js is loaded)
        if (clickableDuckV2 && typeof duckOpen !== 'undefined') {
            clickableDuckV2.src = duckOpen;
        } else if (clickableDuckV2) {
            console.warn('duck.js or duckOpen not available for clickableDuckV2 initial image.');
            // Provide a fallback or leave src empty if it's set in HTML
        }

        renderAllGenerators();
        renderAvailableUpgrades();
        updateDisplays();
        setInterval(gameLoop, 1000); // Main game loop runs every second
        // Load game data if available (to be implemented in save/load step)
    }

    // --- Rendering Functions ---
    function formatNumber(num) {
        if (num === null || num === undefined) return '0';
        if (num < 1000 && num >=0) { // Handle numbers less than 1000 and positive
             if (Number.isInteger(num)) return num.toString();
             return num.toFixed(1).replace('.0', '');
        }
        if (num < 0 && num > -1000) { // Handle negative numbers less than 1000 in magnitude
             if (Number.isInteger(num)) return num.toString();
             return num.toFixed(1).replace('.0', '');
        }


        const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
        let i = 0;
        let tempNum = Math.abs(num);

        if (tempNum >= 1) { // only apply suffix if number is 1 or greater
            i = Math.floor(Math.log10(tempNum) / 3);
            if (i >= suffixes.length) i = suffixes.length -1; // Cap at max suffix
        }

        let value = (num / Math.pow(1000, i));

        // Further check if value is still >= 1000 after initial division (e.g. 1,000,000 K)
        // and ensure we don't go beyond available suffixes
        while (Math.abs(value) >= 1000 && i < suffixes.length - 1) {
            value /= 1000;
            i++;
        }

        if (Number.isInteger(value)) return value.toString() + suffixes[i];
        return value.toFixed(2).replace('.00', '') + suffixes[i];
    }


    function renderGenerator(generator) {
        if (!generatorsListContainer) return;

        let itemDiv = generator.element;
        if (!itemDiv) { // Create element if it doesn't exist
            itemDiv = document.createElement('div');
            itemDiv.className = 'generator-item';
            // Icon path check
            let iconSrc = '';
            if (typeof generator.icon !== 'undefined' && generator.icon) {
                iconSrc = generator.icon;
            } else if (typeof duckClosed !== 'undefined' && duckClosed) {
                iconSrc = duckClosed; // Fallback to global duckClosed
            } else {
                // console.warn(`Icon for ${generator.name} not found.`);
            }

            itemDiv.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <img src="${iconSrc}" alt="${generator.name}" style="width: 40px; height: 40px; margin-right: 10px; border: 1px solid #444; border-radius: 5px;">
                    <h4 style="font-size: 18px; color: #00ffff; margin-bottom: 0;">${generator.name}</h4>
                </div>
                <p style="font-size: 13px; margin: 2px 0; color: #ccc;">${generator.description}</p>
                <p style="font-size: 14px; margin: 2px 0;">Owned: <span class="gen-owned">${generator.owned}</span></p>
                <p style="font-size: 14px; margin: 2px 0;">Output: <span class="gen-output">${formatNumber(generator.outputPerGenerator)}</span> QP/s each</p>
                <p style="font-size: 14px; margin: 2px 0;">Total: <span class="gen-total-output">${formatNumber(generator.owned * generator.outputPerGenerator)}</span> QP/s</p>
                <p style="font-size: 14px; margin: 8px 0 5px 0;">Cost: <span class="gen-cost">${formatNumber(generator.cost)}</span> QP</p>
                <button class="buy-generator" data-generator-id="${generator.id}">Buy 1</button>
            `;
            generatorsListContainer.appendChild(itemDiv);
            generator.element = itemDiv;

            // Add event listener to the buy button
            const buyButton = itemDiv.querySelector('.buy-generator');
            if (buyButton) {
                buyButton.addEventListener('click', () => buyGenerator(generator.id));
            }
        }

        // Update dynamic parts
        itemDiv.querySelector('.gen-owned').textContent = generator.owned;
        itemDiv.querySelector('.gen-output').textContent = formatNumber(generator.outputPerGenerator);
        itemDiv.querySelector('.gen-total-output').textContent = formatNumber(generator.owned * generator.outputPerGenerator);
        itemDiv.querySelector('.gen-cost').textContent = formatNumber(generator.cost);

        const buyButton = itemDiv.querySelector('.buy-generator');
        if (buyButton) {
             buyButton.disabled = qp < generator.cost;
             buyButton.style.opacity = (qp < generator.cost) ? 0.5 : 1;
        }
    }

    function renderAllGenerators() {
        generators.forEach(gen => renderGenerator(gen));
    }

    function updateDisplays() {
        if (qpAmountDisplay) qpAmountDisplay.textContent = formatNumber(qp);
        if (qpPerSecondDisplay) qpPerSecondDisplay.textContent = formatNumber(qpPerSecond);
        if (qpPerClickDisplay) qpPerClickDisplay.textContent = formatNumber(qpPerClick);

        generators.forEach(gen => {
            if(gen.element) {
                const buyButton = gen.element.querySelector('.buy-generator');
                if (buyButton) {
                     buyButton.disabled = qp < gen.cost;
                     buyButton.style.opacity = (qp < gen.cost) ? 0.5 : 1;
                }
            }
        });
        // Update upgrade button states
        upgrades.forEach(upg => {
            if (upg.element && !upg.purchased && upg.prerequisite()) {
                const buyButton = upg.element.querySelector('.buy-upgrade');
                if (buyButton) {
                    buyButton.disabled = qp < upg.cost;
                    buyButton.style.opacity = (qp < upg.cost) ? 0.5 : 1;
                }
            } else if (upg.element && !upg.prerequisite()){ // Ensure hidden if prereq becomes false
                upg.element.style.display = 'none';
            } else if (upg.element && upg.prerequisite() && upg.element.style.display === 'none' && !upg.purchased) { // Ensure shown if prereq becomes true and not purchased
                upg.element.style.display = 'block'; // or 'flex' depending on item styling
                renderUpgrade(upg); // re-render to make sure it's shown correctly
            }
        });
        renderAvailableUpgrades(); // Ensure new upgrades appear if prerequisites are met
    }


    function renderUpgrade(upgrade) {
        if (!upgradesListContainer) return;

        let itemDiv = upgrade.element;
        if (!itemDiv) { // Create element if it doesn't exist
            itemDiv = document.createElement('div');
            itemDiv.className = 'upgrade-item';
            // Inner HTML will be set based on purchased state
            upgradesListContainer.appendChild(itemDiv);
            upgrade.element = itemDiv;
        }

        if (upgrade.purchased) {
            itemDiv.innerHTML = `
                <h4 style="font-size: 18px; color: #aaa; text-decoration: line-through;">${upgrade.name}</h4>
                <p style="font-size: 14px; color: #888;">${upgrade.description}</p>
                <p style="font-size: 14px; color: #00ff00; font-weight: bold;">Purchased!</p>
            `;
            itemDiv.style.opacity = 0.6;
        } else {
            itemDiv.innerHTML = `
                <h4 style="font-size: 18px; color: #ff00ff;">${upgrade.name}</h4>
                <p style="font-size: 14px;">${upgrade.description}</p>
                <p style="font-size: 14px;">Cost: <span class="upgrade-cost">${formatNumber(upgrade.cost)}</span> QP</p>
                <button class="buy-upgrade" data-upgrade-id="${upgrade.id}">Buy</button>
            `;
            itemDiv.style.opacity = 1;
            const buyButton = itemDiv.querySelector('.buy-upgrade');
            if (buyButton) {
                buyButton.addEventListener('click', () => buyUpgrade(upgrade.id));
                buyButton.disabled = qp < upgrade.cost;
                buyButton.style.opacity = (qp < upgrade.cost) ? 0.5 : 1;
            }
        }
    }

    function renderAvailableUpgrades() {
        upgrades.forEach(upg => {
            if (upg.prerequisite()) { // Check if prerequisite is met
                if (!upg.element) { // If element not created yet, create it
                     renderUpgrade(upg);
                } else if (!upg.purchased) { // If element exists and not purchased, re-render to update button state
                     renderUpgrade(upg);
                } else if (upg.purchased && upg.element.style.display !== 'none') { // If purchased and visible, ensure it's shown as purchased
                    renderUpgrade(upg); // Re-render to show as purchased
                }
            } else if (upg.element) { // Prerequisite not met, hide if element exists
                upg.element.style.display = 'none';
            }
        });
    }

    // --- Game Logic Functions ---
    function manualClick() {
        qp += qpPerClick;
        if (clickableDuckV2 && typeof duckOpen !== 'undefined' && typeof duckClosed !== 'undefined') {
            clickableDuckV2.src = duckClosed;
            setTimeout(() => { clickableDuckV2.src = duckOpen; }, 100);
        }
        playQuackSound();
        updateDisplays();
    }

    function buyGenerator(generatorId) {
        const generator = generators.find(g => g.id === generatorId);
        if (generator && qp >= generator.cost) {
            qp -= generator.cost;
            generator.owned++;
            generator.cost = Math.ceil(generator.baseCost * Math.pow(1.15, generator.owned));
            calculateQPS();
            renderGenerator(generator);
            updateDisplays();
        }
    }

    function calculateQPS() {
        qpPerSecond = 0;
        generators.forEach(g => {
            qpPerSecond += g.owned * g.outputPerGenerator;
        });
    }

    function gameLoop() {
        qp += qpPerSecond;
        updateDisplays();
        renderAvailableUpgrades(); // Check if new upgrades become available
    }

    function applyUpgradeEffect(upgrade) {
        if (upgrade.type === 'click') {
            if (upgrade.effectType === 'multiplier') {
                qpPerClick *= upgrade.effectValue;
            } else if (upgrade.effectType === 'additive') {
                qpPerClick += upgrade.effectValue;
            }
        } else if (upgrade.type === 'generator') {
            const targetGenerator = generators.find(g => g.id === upgrade.targetId);
            if (targetGenerator) {
                if (upgrade.effectType === 'multiplier') {
                    targetGenerator.outputPerGenerator *= upgrade.effectValue;
                } else if (upgrade.effectType === 'additive') {
                    targetGenerator.outputPerGenerator += upgrade.effectValue;
                }
                renderGenerator(targetGenerator); // Re-render the affected generator
            }
        } else if (upgrade.type === 'global') { // For 'global' upgrades affecting all generators
            generators.forEach(g => {
                if (upgrade.effectType === 'multiplier') {
                    g.outputPerGenerator *= upgrade.effectValue;
                } // Additive global could also be an option
                renderGenerator(g); // Re-render all generators
            });
        }
        calculateQPS(); // Recalculate total QPS after effects are applied
    }

    function buyUpgrade(upgradeId) {
        const upgrade = upgrades.find(u => u.id === upgradeId);
        if (upgrade && !upgrade.purchased && qp >= upgrade.cost) {
            qp -= upgrade.cost;
            upgrade.purchased = true;
            applyUpgradeEffect(upgrade);
            renderUpgrade(upgrade); // Re-render this specific upgrade (will show as purchased)
            updateDisplays(); // Update all displays including QPS and QPC
            renderAvailableUpgrades(); // Check if new upgrades are now available
        }
    }

    // --- Sound ---
    function playQuackSound() {
        if (typeof isQuackEnabled !== 'undefined' && isQuackEnabled && typeof quackSound !== 'undefined' && quackSound.play) {
            quackSound.currentTime = 0;
            quackSound.play();
        }
    }

    // --- Event Listeners ---
    if (clickableDuckV2) {
        clickableDuckV2.addEventListener('click', manualClick);
    } else {
        console.error("#clickableDuckV2 not found.");
    }

    // --- Start Game ---
    // DOM element checks
    if (!clickableDuckV2) console.error("Clickable Duck V2 not found!");
    if (!qpAmountDisplay) console.error("QP Amount Display not found!");
    if (!qpPerSecondDisplay) console.error("QP Per Second Display not found!");
    if (!qpPerClickDisplay) console.error("QP Per Click Display not found!");
    if (!generatorsListContainer) console.error("Generators List Container not found!");
    if (!upgradesListContainer) console.error("Upgrades List Container not found!"); // Added check for upgrades container

    initializeGame();
});
