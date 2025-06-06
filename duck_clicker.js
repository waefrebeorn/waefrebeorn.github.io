document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const clickableDuckV2 = document.getElementById('clickableDuckV2');
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

    const SAVE_KEY = 'waefreBeornDuckClickerSaveV2';

    // Game State Variables
    let qp = 0;
    let qpPerClick = 1;
    let qpPerSecond = 0;
    let goldenFeathers = 0;
    let totalQPAllTime = 0;
    let playerLevel = 0;
    const levelQPThresholds = [ // Adjusted
        0,    // Start
        1e9,  // Lvl 1 (1 Billion)
        1e13, // Lvl 2 (10 Trillion)
        1e17, // Lvl 3 (100 Quadrillion)
        1e22, // Lvl 4
        1e27, // Lvl 5
        1e33, // Lvl 6 (was 1e39)
        1e39, // Lvl 7 (was 1e45)
        1e46, // Lvl 8 (was 1e52)
        1e54, // Lvl 9 (was 1e60)
        1e63, // Lvl 10 (was 1e69) - Vigintillion
        1e72, // Lvl 11 (was 1e79)
        1e81, // Lvl 12 (was 1e90)
        1e91, // Lvl 13 (was 1e102)
        1e102,// Lvl 14 (was 1e115)
        1e114,// Lvl 15 (was 1e129)
        1e127,// Lvl 16 (was 1e144)
        1e141,// Lvl 17 (was 1e160)
        1e156,// Lvl 18 (was 1e177)
        1e172,// Lvl 19 (was 1e195)
        1e189 // Lvl 20 (was 1e214)
        // Extended further in previous step, ensure consistency or re-evaluate fully if needed
        // For now, these are the first 20. If more were added up to 30, they'd need to be here.
        // Let's assume the previous extension to 30 is what we want to keep, with these initial adjustments.
        // Re-adding the L21-30 from previous with slight adjustments for smoother curve if possible
        // 1e189, // L20
        // 1e208, // L21 (was 1e234)
        // 1e228, // L22 (was 1e255)
        // 1e249, // L23 (was 1e277)
        // 1e271, // L24 (was 1e300)
        // 1e294, // L25 (was 1e324)
        // // Numbers beyond e308 are problematic for JS native number type, though formatNumber handles display.
        // // Calculations might suffer.
        // 1e318, // L26 (was 1e350)
        // 1e343, // L27 (was 1e377)
        // 1e370, // L28 (was 1e405)
        // 1e398, // L29 (was 1e434)
        // 1e427  // L30 (was 1e464)
    ];
    // Re-evaluating level thresholds based on previous step's full set, with initial adjustments
     const finalLevelQPThresholds = [
        0,    1e9,   1e13,  1e17,  1e22,  1e27, // L0-5 (Adjusted first few)
        1e33, 1e39,  1e46,  1e54,  1e63, // L6-10 (Adjusted from previous)
        1e72, 1e81,  1e91, 1e102, 1e114, // L11-15 (Adjusted)
        1e127,1e141, 1e156, 1e172, 1e189, // L16-20 (Adjusted)
        1e208, 1e228, 1e249, 1e271, 1e294, // L21-25
        1e318, 1e343, 1e370, 1e398, 1e427  // L26-30
    ];


    let currentDimension = 'normal';
    let divineDuckChow = 0;
    let ddcPerSecondPassive = 1;

    let heavenUpgrades = {
        'celestialFeeder': { id: 'celestialFeeder', name: 'Celestial Duck Feeder', description: 'Automated feeder that passively generates +1 DDC/sec.', cost: 10, owned: 0, outputBonus: 1, maxOwned: 5 },
        'prayerAltar': { id: 'prayerAltar', name: 'Altar of Quack Prayers', description: 'Focuses ambient duck prayers, generating +5 DDC/sec.', cost: 50, owned: 0, outputBonus: 5, maxOwned: 3 }
    };

    const originalGeneratorDefinitions = {
        babyDuckling: { name: 'Baby Duckling', description: 'A tiny, adorable source of passive quacks. Peep!', baseCost: 15, baseOutput: 0.1, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' },
        breadScavenger: { name: 'Bread Scavenger', description: 'This duck knows where all the discarded bread is.', baseCost: 100, baseOutput: 1, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' },
        keyboardWarrior: { name: 'Quack-Powered Keyboard Warrior', description: 'Aggressively quacks online, somehow generating QP.', baseCost: 1100, baseOutput: 8, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' },
        duckArmyRecruit: { name: 'Duck Army Recruit', description: 'One of many. They march for QP.', baseCost: 12000, baseOutput: 47, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' },
        memeAiDuck: { name: 'Meme-Generating AI Duck', description: 'This advanced AI churns out viral duck memes, and QP.', baseCost: 130000, baseOutput: 600, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' }, // Output: 260 -> 600
        ducktopiaPortal: { name: 'Ducktopia Portal', description: 'Opens a rift to a dimension of pure quack energy.', baseCost: 1400000, baseOutput: 7000, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' }, // Output: 1400 -> 7000
        gigachadDuck: { name: 'Gigachad Duck', description: 'This duck didn\'t skip beak day. Flexes for massive QP.', baseCost: 20000000, baseOutput: 100000, icon: typeof duckOpen !== 'undefined' ? duckOpen : '' }, // Output: 10k -> 100k
        philosoRaptorDuck: { name: 'Philoso-Raptor Duck', description: 'Ponders the meaning of quack, accidentally discovers QP sources.', baseCost: 300000000, baseOutput: 1800000, icon: typeof duckClosed !== 'undefined' ? duckClosed : '' }, // Output: 150k -> 1.8M
        ducktrixCodeStream: { name: 'Ducktrix Code Stream', description: 'It\'s all just falling green ducks... and QP.', baseCost: 5000000000, baseOutput: 30000000, icon: typeof duckOpen !== 'undefined' ? duckOpen : '' }, // Output: 2.2M -> 30M
        cosmicDuckEgg: { name: 'Cosmic Duck Egg', description: 'An egg laid by a celestial duck. Radiates immense QP. Requires Level 8.', baseCost: 1e50, baseOutput: 1e45, icon: typeof duckOpen !== 'undefined' ? duckOpen : '', prerequisite: () => playerLevel >= 8 },
        voidQuacker: { name: 'Void Quacker', description: 'Quacks from the void itself. Unsettling. Requires Level 15.', baseCost: 1e135, baseOutput: 1e125, icon: typeof duckClosed !== 'undefined' ? duckClosed : '', prerequisite: () => playerLevel >= 15 },
        neuralNetDuck: { name: 'Neural Net Duck Assimilator', baseCost: 1e220, baseOutput: 1e218, description: 'A self-aware AI duck network that has begun to understand the underlying quack-fabric of reality. Requires Level 22.', icon: typeof duckOpen !== 'undefined' ? duckOpen : '', prerequisite: () => playerLevel >= 22 }
    };

    let generators = Object.keys(originalGeneratorDefinitions).map(id => ({
        id: id, name: originalGeneratorDefinitions[id].name, description: originalGeneratorDefinitions[id].description,
        baseCost: originalGeneratorDefinitions[id].baseCost, cost: originalGeneratorDefinitions[id].baseCost,
        baseOutput: originalGeneratorDefinitions[id].baseOutput, outputPerGenerator: originalGeneratorDefinitions[id].baseOutput,
        owned: 0, icon: originalGeneratorDefinitions[id].icon, element: null,
        prerequisite: originalGeneratorDefinitions[id].prerequisite
    }));

    const upgrades = [
        { id: 'reinforcedBeak1', name: 'Reinforced Beak I', description: 'Your clicks are twice as effective!', cost: 100, type: 'click', effectType: 'multiplier', effectValue: 2, purchased: false, prerequisite: () => true, element: null },
        { id: 'goldenDuckCall', name: 'Golden Duck Call', description: 'Attracts more valuable quacks with each click.', cost: 500, type: 'click', effectType: 'multiplier', effectValue: 2, purchased: false, prerequisite: () => upgrades.find(u=>u.id === 'reinforcedBeak1')?.purchased, element: null },
        { id: 'mechanicalClickingFinger', name: 'Mechanical Clicking Finger', description: 'Automated precision for your clicks.', cost: 10000, type: 'click', effectType: 'multiplier', effectValue: 2, purchased: false, prerequisite: () => upgrades.find(u=>u.id === 'goldenDuckCall')?.purchased, element: null },
        { id: 'diamondBeakClicks', name: 'Diamond Beak Clicks', description: 'Your clicks are now 5x more powerful!', cost: 20000000, type: 'click', effectType: 'multiplier', effectValue: 5, purchased: false, prerequisite: () => upgrades.find(u=>u.id === 'mechanicalClickingFinger')?.purchased, element: null }, // Cost: 50M -> 20M
        { id: 'extraFluffyDucklings', name: 'Extra Fluffy Ducklings', description: 'Baby Ducklings produce twice as much QP.', cost: 1000, type: 'generator', targetId: 'babyDuckling', effectType: 'multiplier', effectValue: 2, purchased: false, prerequisite: () => generators.find(g=>g.id === 'babyDuckling')?.owned >= 1, element: null },
        { id: 'ducklingDaycare', name: 'Duckling Daycare Center', description: 'Baby Ducklings are even more efficient (+50% output).', cost: 5000, type: 'generator', targetId: 'babyDuckling', effectType: 'multiplier', effectValue: 1.5, purchased: false, prerequisite: () => generators.find(g=>g.id === 'babyDuckling')?.owned >= 10 && upgrades.find(u=>u.id === 'extraFluffyDucklings')?.purchased, element: null },
        { id: 'stonksMarketDuck', name: '"Stonks" Market Duck', description: 'Bread Scavenger now plays the QP market. Output x3.', cost: 75000, type: 'generator', targetId: 'breadScavenger', effectType: 'multiplier', effectValue: 3, purchased: false, prerequisite: () => generators.find(g=>g.id === 'breadScavenger')?.owned >= 10, element: null },
        { id: 'kwConferenceCall', name: 'Keyboard Warrior Conference Call', description: 'Keyboard Warriors now coordinate their efforts. Output x4.', cost: 200000, type: 'generator', targetId: 'keyboardWarrior', effectType: 'multiplier', effectValue: 4, purchased: false, prerequisite: () => generators.find(g=>g.id === 'keyboardWarrior')?.owned >= 5, element: null },
        { id: 'quackMultiplierRitual', name: 'Quack Multiplier Ritual', description: 'All QP production from generators doubled.', cost: 10000000, type: 'global', effectType: 'multiplier', effectValue: 2, purchased: false, prerequisite: () => qpPerSecond >= 100, element: null }, // Cost: 50k -> 10M
        { id: 'infiniteImprobabilityQuack', name: 'Infinite Improbability Quack', description: 'All QP generation from generators permanently increased by 10%.', cost: 1000000000, type: 'global', effectType: 'multiplier', effectValue: 1.10, purchased: false, prerequisite: () => qpPerSecond >= 500000, element: null },
        { id: 'levelLordship1', name: 'Level Lordship I', description: 'Being Level 5+ has its perks. All generator output +50%.', cost: 1e40, type: 'global', effectType: 'multiplier', effectValue: 1.5, purchased: false, prerequisite: () => playerLevel >= 5, element: null },
        { id: 'levelMastery1', name: 'Level Mastery I', description: 'Your deep understanding of levels boosts all QP production by 100%. Requires Level 12.', cost: 1e100, type: 'global', effectType: 'multiplier', effectValue: 2, purchased: false, prerequisite: () => playerLevel >= 12, element: null },
        { id: 'tier5DuckCivilization', name: 'Tier V Duck Civilization Access', description: 'Unlock secrets from ducks that manipulate spacetime for QP. All generator output x10. Requires Level 25.', cost: 1e260, type: 'global', effectType: 'multiplier', effectValue: 10, purchased: false, prerequisite: () => playerLevel >= 25, element: null }
    ];

    let gfUpgrades = [
        { id: 'permClickBoost1', name: 'Feather-Light Touch I', description: 'Permanently increases QP per click by +1 for each GF owned.', cost: 1, maxLevel: 0, level: 0, type: 'global_click_per_gf', effectValue: 1, purchased: false, element: null },
        { id: 'permGenBoost1', name: 'Golden Quackery I', description: 'Permanently increases all generator output by 5% for each GF owned.', cost: 1, maxLevel: 0, level: 0, type: 'global_gen_eff_per_gf', effectValue: 0.05, purchased: false, element: null },
        { id: 'startingQP1', name: 'Nest Egg I', description: 'Start each rebirth with 1,000 QP.', cost: 2, maxLevel: 0, level: 0, type: 'starting_qp', effectValue: 1000, purchased: false, element: null },
        { id: 'cheaperBabyDucklings', name: 'Discount Ducklings', description: 'Permanently reduces the base cost of Baby Ducklings by 10%.', cost: 3, maxLevel: 0, level: 0, type: 'gen_cost_reduction', targetId: 'babyDuckling', effectValue: 0.90, purchased: false, element: null }
    ];

    // --- Initialization ---
    function initializeGame() {
        if (clickableDuckV2 && typeof duckOpen !== 'undefined') clickableDuckV2.src = duckOpen;
        generators.forEach(gen => {
            const originalDef = originalGeneratorDefinitions[gen.id];
            gen.baseCost = originalDef.baseCost; gen.cost = originalDef.baseCost;
            gen.baseOutput = originalDef.baseOutput; gen.outputPerGenerator = originalDef.baseOutput;
            gen.prerequisite = originalDef.prerequisite;
        });
        renderAllGenerators(); renderAvailableUpgrades(); renderAllGFUpgrades();
        if (localStorage.getItem(SAVE_KEY)) {
            if (confirm("Saved game found. Would you like to load it?")) loadGame();
            else { console.log("Starting a new game or user opted out of loading."); applyAllGFUpgradeEffects(); updateDisplays(); }
        } else { applyAllGFUpgradeEffects(); updateDisplays(); }
        setInterval(gameLoop, 1000);
    }

    // --- Rendering Functions ---
    function formatNumber(num) {
        if (num === Infinity) return 'Infinity';
        if (num === 0) return '0';
        if (num === null || num === undefined) return '0';
        if (typeof num !== 'number') num = Number(num);
        if (isNaN(num)) return 'NaN';

        if (num < 0) return '-' + formatNumber(-num);
        if (num < 1000) return num.toFixed(1).replace(/\.0$/, '');

        const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc",
                          "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc", "Vg",
                          "UVg", "DVg", "TVg", "QaVg", "QiVg", "SxVg", "SpVg", "OcVg", "NoVg", "Tg",
                          "UTg", "DTg", "TTg", "QaTg", "QiTg", "SxTg", "SpTg", "OcTg", "NoTg", "Qg",
                         ];

        const i = Math.floor(Math.log10(Math.abs(num)) / 3);

        if (i >= suffixes.length) {
            return num.toExponential(2).replace('e+', 'e');
        }
        let value = (num / Math.pow(1000, i));
        return value.toFixed(2).replace(/\.00$/, '').replace(/\.([1-9])0$/, '.$1') + suffixes[i];
    }

    function renderGenerator(generator) {
        if (!generatorsListContainer) return;
        if (generator.prerequisite && !generator.prerequisite()) {
            if (generator.element) generator.element.style.display = 'none'; return;
        } else if (generator.element) { generator.element.style.display = 'block'; }
        let itemDiv = generator.element;
        if (!itemDiv) {
            itemDiv = document.createElement('div'); itemDiv.className = 'generator-item';
            let iconSrc = generator.icon || (typeof duckClosed !== 'undefined' ? duckClosed : '');
            itemDiv.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <img src="${iconSrc}" alt="${generator.name}" style="width: 40px; height: 40px; margin-right: 10px; border: 1px solid #444; border-radius: 5px;">
                    <h4 style="font-size: 18px; color: #00ffff; margin-bottom: 0;">${generator.name}</h4></div>
                <p style="font-size: 13px; margin: 2px 0; color: #ccc;">${generator.description}</p>
                <p style="font-size: 14px; margin: 2px 0;">Owned: <span class="gen-owned">${generator.owned}</span></p>
                <p style="font-size: 14px; margin: 2px 0;">Output: <span class="gen-output">${formatNumber(generator.outputPerGenerator)}</span> QP/s each</p>
                <p style="font-size: 14px; margin: 2px 0;">Total: <span class="gen-total-output">${formatNumber(generator.owned * generator.outputPerGenerator)}</span> QP/s</p>
                <p style="font-size: 14px; margin: 8px 0 5px 0;">Cost: <span class="gen-cost">${formatNumber(generator.cost)}</span> QP</p>
                <button class="buy-generator" data-generator-id="${generator.id}">Buy 1</button>`;
            generatorsListContainer.appendChild(itemDiv); generator.element = itemDiv;
            const buyButton = itemDiv.querySelector('.buy-generator');
            if (buyButton) buyButton.addEventListener('click', () => buyGenerator(generator.id));
        }
        itemDiv.querySelector('.gen-owned').textContent = generator.owned;
        itemDiv.querySelector('.gen-output').textContent = formatNumber(generator.outputPerGenerator);
        itemDiv.querySelector('.gen-total-output').textContent = formatNumber(generator.owned * generator.outputPerGenerator);
        itemDiv.querySelector('.gen-cost').textContent = formatNumber(generator.cost);
        const buyButton = itemDiv.querySelector('.buy-generator');
        if (buyButton) { buyButton.disabled = qp < generator.cost; buyButton.style.opacity = (qp < generator.cost) ? 0.5 : 1; }
    }
    function renderAllGenerators() { generators.forEach(gen => renderGenerator(gen)); }

    function updateDisplays() {
        if (qpAmountDisplay) qpAmountDisplay.textContent = formatNumber(qp);
        if (qpPerSecondDisplay) qpPerSecondDisplay.textContent = formatNumber(qpPerSecond);
        if (qpPerClickDisplay) qpPerClickDisplay.textContent = formatNumber(qpPerClick);
        generators.forEach(gen => {
            if(gen.element) {
                const buyButton = gen.element.querySelector('.buy-generator');
                if (buyButton) { buyButton.disabled = qp < gen.cost; buyButton.style.opacity = (qp < gen.cost) ? 0.5 : 1; }
                if (gen.prerequisite && !gen.prerequisite()) { gen.element.style.display = 'none'; }
                else if (gen.element && (gen.prerequisite && gen.prerequisite())) { gen.element.style.display = 'block'; }
            }
        });
        upgrades.forEach(upg => {
            if (upg.element && !upg.purchased && upg.prerequisite()) {
                const buyButton = upg.element.querySelector('.buy-upgrade');
                if (buyButton) { buyButton.disabled = qp < upg.cost; buyButton.style.opacity = (qp < upg.cost) ? 0.5 : 1; }
            } else if (upg.element && !upg.prerequisite()){ upg.element.style.display = 'none'; }
            else if (upg.element && upg.prerequisite() && upg.element.style.display === 'none' && !upg.purchased) {
                upg.element.style.display = 'block'; renderUpgrade(upg);
            }
        });
        gfUpgrades.forEach(upg => {
            if (upg.element && !upg.purchased) {
                const buyButton = upg.element.querySelector('.buy-gf-upgrade');
                if (buyButton) { buyButton.disabled = goldenFeathers < upg.cost; buyButton.style.opacity = (goldenFeathers < upg.cost) ? 0.5 : 1; }
            }
        });
        if (playerLevelDisplay) playerLevelDisplay.textContent = playerLevel;
        if (nextLevelQPDisplay) {
            if (playerLevel < finalLevelQPThresholds.length - 1) nextLevelQPDisplay.textContent = formatNumber(finalLevelQPThresholds[playerLevel + 1]);
            else nextLevelQPDisplay.textContent = "MAX LEVEL REACHED (for now!)";
        }
        if (goldenFeathersDisplay) goldenFeathersDisplay.textContent = formatNumber(goldenFeathers);
        if (gfOnRebirthDisplay) gfOnRebirthDisplay.textContent = formatNumber(calculateGFOnRebirthPreview());
        if (rebirthButton) {
            const potentialGF = calculateGFOnRebirthPreview();
            rebirthButton.style.display = (potentialGF > 0) ? 'inline-block' : 'none';
            rebirthButton.disabled = !(potentialGF > 0); rebirthButton.style.opacity = (potentialGF > 0) ? 1 : 0.5;
        }
        if (celestialPortalSection) celestialPortalSection.style.display = (playerLevel >= 10 && currentDimension === 'normal') ? 'block' : 'none';
        let currentDDCPerSecondInHeaven = ddcPerSecondPassive;
        if (heavenUpgrades.celestialFeeder) currentDDCPerSecondInHeaven += (heavenUpgrades.celestialFeeder.owned * heavenUpgrades.celestialFeeder.outputBonus);
        if (heavenUpgrades.prayerAltar) currentDDCPerSecondInHeaven += (heavenUpgrades.prayerAltar.owned * heavenUpgrades.prayerAltar.outputBonus);
        if (currentDimension === 'normal') {
            if (duckClickerGameArea) duckClickerGameArea.style.display = 'block';
            if (superLevelDisplayArea) superLevelDisplayArea.style.display = 'none';
        } else {
            if (duckClickerGameArea) duckClickerGameArea.style.display = 'none';
            if (superLevelDisplayArea) superLevelDisplayArea.style.display = 'block';
            if (currentDimension === 'heaven') {
                if (superLevelTitle) superLevelTitle.textContent = 'Duck Heaven';
                if (superLevelContent) {
                    superLevelContent.innerHTML = `
                        <p style="font-size: 20px; color: #ffb6c1;">Divine Duck Chow (DDC): <span id="divineDuckChowDisplay" style="font-weight:bold;">${formatNumber(divineDuckChow)}</span></p>
                        <p style="font-size: 16px; color: #add8e6;">Passively Gaining: <span id="ddcPerSecondDisplay">${formatNumber(currentDDCPerSecondInHeaven)}</span> DDC/sec</p>
                        <div id="heavenUpgradesContainer" style="margin-top:15px;">
                            <div class="heaven-item" style="padding:8px; margin-bottom:8px; background-color:rgba(255,255,255,0.1); border-radius:5px;">
                                <h4>${heavenUpgrades.celestialFeeder.name} (${heavenUpgrades.celestialFeeder.owned}/${heavenUpgrades.celestialFeeder.maxOwned})</h4>
                                <p>${heavenUpgrades.celestialFeeder.description}</p>
                                <p>Cost: ${formatNumber(heavenUpgrades.celestialFeeder.cost)} DDC</p>
                                <button id="buyCelestialFeeder" class="buy-heaven-item" ${heavenUpgrades.celestialFeeder.owned >= heavenUpgrades.celestialFeeder.maxOwned || divineDuckChow < heavenUpgrades.celestialFeeder.cost ? 'disabled' : ''}>Buy</button>
                            </div>
                            <div class="heaven-item" style="padding:8px; margin-bottom:8px; background-color:rgba(255,255,255,0.1); border-radius:5px;">
                                <h4>${heavenUpgrades.prayerAltar.name} (${heavenUpgrades.prayerAltar.owned}/${heavenUpgrades.prayerAltar.maxOwned})</h4>
                                <p>${heavenUpgrades.prayerAltar.description}</p>
                                <p>Cost: ${formatNumber(heavenUpgrades.prayerAltar.cost)} DDC</p>
                                <button id="buyPrayerAltar" class="buy-heaven-item" ${heavenUpgrades.prayerAltar.owned >= heavenUpgrades.prayerAltar.maxOwned || divineDuckChow < heavenUpgrades.prayerAltar.cost ? 'disabled' : ''}>Buy</button>
                            </div></div>`;
                    const buyFeederButton = document.getElementById('buyCelestialFeeder');
                    if(buyFeederButton) buyFeederButton.addEventListener('click', () => buyHeavenUpgrade('celestialFeeder'));
                    const buyAltarButton = document.getElementById('buyPrayerAltar');
                    if(buyAltarButton) buyAltarButton.addEventListener('click', () => buyHeavenUpgrade('prayerAltar'));
                }
                const ddcDisplay = document.getElementById('divineDuckChowDisplay');
                if (ddcDisplay) ddcDisplay.textContent = formatNumber(divineDuckChow);
                const ddcPerSecDisp = document.getElementById('ddcPerSecondDisplay');
                if (ddcPerSecDisp) ddcPerSecDisp.textContent = formatNumber(currentDDCPerSecondInHeaven);
            }
        }
    }

    function renderUpgrade(upgrade) { /* ... same ... */
        if (!upgradesListContainer) return;
        let itemDiv = upgrade.element;
        if (!itemDiv) { itemDiv = document.createElement('div'); itemDiv.className = 'upgrade-item'; upgradesListContainer.appendChild(itemDiv); upgrade.element = itemDiv;}
        if (upgrade.purchased) { itemDiv.innerHTML = `<h4 style="font-size: 18px; color: #aaa; text-decoration: line-through;">${upgrade.name}</h4><p style="font-size: 14px; color: #888;">${upgrade.description}</p><p style="font-size: 14px; color: #00ff00; font-weight: bold;">Purchased!</p>`; itemDiv.style.opacity = 0.6;}
        else { itemDiv.innerHTML = `<h4 style="font-size: 18px; color: #ff00ff;">${upgrade.name}</h4><p style="font-size: 14px;">${upgrade.description}</p><p style="font-size: 14px;">Cost: <span class="upgrade-cost">${formatNumber(upgrade.cost)}</span> QP</p><button class="buy-upgrade" data-upgrade-id="${upgrade.id}">Buy</button>`; itemDiv.style.opacity = 1; const buyButton = itemDiv.querySelector('.buy-upgrade'); if (buyButton) { buyButton.addEventListener('click', () => buyUpgrade(upgrade.id)); buyButton.disabled = qp < upgrade.cost; buyButton.style.opacity = (qp < upgrade.cost) ? 0.5 : 1; }}
    }
    function renderAvailableUpgrades() { /* ... same ... */ upgrades.forEach(upg => { if (upg.prerequisite()) { if (!upg.element) renderUpgrade(upg); else if (!upg.purchased) renderUpgrade(upg); else if (upg.purchased && upg.element.style.display !== 'none') renderUpgrade(upg); } else if (upg.element) upg.element.style.display = 'none'; });}
    function renderGFUpgrade(gfUpgrade) { /* ... same ... */
        if (!gfUpgradesListContainer) return;
        let itemDiv = gfUpgrade.element;
        if (!itemDiv) { itemDiv = document.createElement('div'); itemDiv.className = 'gf-upgrade-item'; gfUpgradesListContainer.appendChild(itemDiv); gfUpgrade.element = itemDiv;}
        if (gfUpgrade.purchased) { itemDiv.innerHTML = `<h4 style="font-size: 18px; color: #aaa; text-decoration: line-through;">${gfUpgrade.name}</h4><p style="font-size: 14px; color: #888;">${gfUpgrade.description}</p><p style="font-size: 14px; color: #00ff00; font-weight: bold;">Acquired!</p>`; itemDiv.style.opacity = 0.7;}
        else { itemDiv.innerHTML = `<h4 style="font-size: 18px; color: #ffd700;">${gfUpgrade.name}</h4><p style="font-size: 14px;">${gfUpgrade.description}</p><p style="font-size: 14px;">Cost: <span class="gf-upgrade-cost">${formatNumber(gfUpgrade.cost)}</span> GF</p><button class="buy-gf-upgrade" data-gf-upgrade-id="${gfUpgrade.id}">Acquire Blessing</button>`; itemDiv.style.opacity = 1; const buyButton = itemDiv.querySelector('.buy-gf-upgrade'); if (buyButton) { buyButton.addEventListener('click', () => buyGFUpgrade(gfUpgrade.id)); buyButton.disabled = goldenFeathers < gfUpgrade.cost; buyButton.style.opacity = (goldenFeathers < gfUpgrade.cost) ? 0.5 : 1; }}
    }
    function renderAllGFUpgrades() { if (!gfUpgradesListContainer) return; gfUpgrades.forEach(upg => renderGFUpgrade(upg));}

    // --- Game Logic Functions ---
    function manualClick() { /* ... same ... */ qp += qpPerClick; totalQPAllTime += qpPerClick; if (clickableDuckV2 && typeof duckOpen !== 'undefined' && typeof duckClosed !== 'undefined') { clickableDuckV2.src = duckClosed; setTimeout(() => { clickableDuckV2.src = duckOpen; }, 100); } playQuackSound(); updateDisplays(); }
    function buyGenerator(generatorId) { /* ... same ... */
        const generator = generators.find(g => g.id === generatorId);
        if (generator && qp >= generator.cost) {
            qp -= generator.cost; generator.owned++;
            let newBaseCost = originalGeneratorDefinitions[generator.id].baseCost;
            gfUpgrades.filter(u => u.type === 'gen_cost_reduction' && u.targetId === generator.id && u.purchased).forEach(costUpg => { newBaseCost *= costUpg.effectValue;});
            generator.cost = Math.ceil(Math.max(1, newBaseCost) * Math.pow(1.15, generator.owned));
            calculateQPS(); renderGenerator(generator); updateDisplays();
        }
    }
    function calculateQPS() { /* ... same ... */ qpPerSecond = 0; generators.forEach(g => { qpPerSecond += g.owned * g.outputPerGenerator; });}

    function gameLoop() {
        if (currentDimension === 'heaven') {
            let currentDDCPerSecond = ddcPerSecondPassive;
            currentDDCPerSecond += (heavenUpgrades.celestialFeeder.owned * heavenUpgrades.celestialFeeder.outputBonus);
            currentDDCPerSecond += (heavenUpgrades.prayerAltar.owned * heavenUpgrades.prayerAltar.outputBonus);
            divineDuckChow += currentDDCPerSecond;
        } else if (currentDimension === 'normal') {
            qp += qpPerSecond; totalQPAllTime += qpPerSecond; checkLevelUp();
        }
        updateDisplays();
        if (currentDimension === 'normal') { renderAvailableUpgrades(); renderAllGFUpgrades(); }
    }

    function checkLevelUp() {
        if (playerLevel < finalLevelQPThresholds.length - 1) {
            if (totalQPAllTime >= finalLevelQPThresholds[playerLevel + 1]) {
                playerLevel++; console.log(`Leveled up to ${playerLevel}`);
                updateDisplays(); renderAllGenerators(); renderAvailableUpgrades(); renderAllGFUpgrades();
            }
        }
    }
    function calculateGFOnRebirthPreview() { /* ... same ... */ if (qp < 1e12) return 0; return Math.floor(Math.pow(qp / 1e12, 0.4));}
    function performRebirth() { /* ... same ... */
        const gfGained = calculateGFOnRebirthPreview();
        if (gfGained <= 0) { alert("You need to accumulate more Quack Points to earn Golden Feathers on Rebirth!"); return; }
        if (confirm(`Are you sure you want to Rebirth? You will gain ${gfGained} Golden Feather(s) and reset your current progress, but gain powerful permanent bonuses!`)) {
            goldenFeathers += gfGained; qp = 0;
            generators.forEach(g => { const originalDef = originalGeneratorDefinitions[g.id]; g.owned = 0; g.baseCost = originalDef.baseCost; g.cost = originalDef.baseCost; g.baseOutput = originalDef.baseOutput; g.outputPerGenerator = originalDef.baseOutput;});
            upgrades.forEach(u => { u.purchased = false; });
            gfUpgrades.filter(u => u.type === 'starting_qp' && u.purchased).forEach(u => qp += u.effectValue);
            applyAllGFUpgradeEffects();
            renderAllGenerators(); renderAvailableUpgrades(); renderAllGFUpgrades(); updateDisplays();
            alert(`Rebirth successful! You gained ${gfGained} Golden Feather(s). Total GF: ${goldenFeathers}`);
        }
    }
    function applyAllGFUpgradeEffects() { /* ... same ... */
        let newQpPerClick = 1;
        gfUpgrades.forEach(upg => { if (upg.purchased && upg.type === 'global_click_per_gf') newQpPerClick += (upg.effectValue * goldenFeathers);});
        upgrades.filter(u => u.type === 'click' && u.purchased).forEach(u => { if (u.effectType === 'multiplier') newQpPerClick *= u.effectValue; else if (u.effectType === 'additive') newQpPerClick += u.effectValue;});
        qpPerClick = newQpPerClick;
        let globalGenMultiplierFromGF = 1.0;
        gfUpgrades.forEach(upg => { if (upg.purchased && upg.type === 'global_gen_eff_per_gf') globalGenMultiplierFromGF += (upg.effectValue * goldenFeathers);});
        generators.forEach(gen => {
            const originalDef = originalGeneratorDefinitions[gen.id]; let currentBaseCost = originalDef.baseCost;
            gfUpgrades.filter(upg => upg.type === 'gen_cost_reduction' && upg.targetId === gen.id && upg.purchased).forEach(costUpg => { currentBaseCost *= costUpg.effectValue; });
            gen.baseCost = Math.max(1, currentBaseCost);
            gen.cost = (gen.owned > 0) ? Math.ceil(gen.baseCost * Math.pow(1.15, gen.owned)) : gen.baseCost;
            let currentOutput = originalDef.baseOutput * globalGenMultiplierFromGF;
            upgrades.filter(u => u.type === 'generator' && u.targetId === gen.id && u.purchased).forEach(u => { if (u.effectType === 'multiplier') currentOutput *= u.effectValue; else if (u.effectType === 'additive') currentOutput += u.effectValue;});
            upgrades.filter(u => u.type === 'global' && u.purchased).forEach(u => { if (u.effectType === 'multiplier') currentOutput *= u.effectValue; });
            gen.outputPerGenerator = currentOutput;
        });
        calculateQPS();
    }
    function applyUpgradeEffect(upgrade) { /* ... same ... */
        if (upgrade.type === 'click') { if (upgrade.effectType === 'multiplier') qpPerClick *= upgrade.effectValue; else if (upgrade.effectType === 'additive') qpPerClick += upgrade.effectValue;}
        else if (upgrade.type === 'generator') { const targetGenerator = generators.find(g => g.id === upgrade.targetId); if (targetGenerator) { if (upgrade.effectType === 'multiplier') targetGenerator.outputPerGenerator *= upgrade.effectValue; else if (upgrade.effectType === 'additive') targetGenerator.outputPerGenerator += upgrade.effectValue; renderGenerator(targetGenerator);}}
        else if (upgrade.type === 'global') { generators.forEach(g => { if (upgrade.effectType === 'multiplier') g.outputPerGenerator *= upgrade.effectValue; renderGenerator(g); });}
        calculateQPS();
    }
    function buyUpgrade(upgradeId) { /* ... same ... */ const upgrade = upgrades.find(u => u.id === upgradeId); if (upgrade && !upgrade.purchased && qp >= upgrade.cost) { qp -= upgrade.cost; upgrade.purchased = true; applyUpgradeEffect(upgrade); renderUpgrade(upgrade); updateDisplays(); renderAvailableUpgrades();}}
    function buyGFUpgrade(gfUpgradeId) { /* ... same ... */ const gfUpgrade = gfUpgrades.find(u => u.id === gfUpgradeId); if (gfUpgrade && !gfUpgrade.purchased && goldenFeathers >= gfUpgrade.cost) {goldenFeathers -= gfUpgrade.cost; gfUpgrade.purchased = true; applyAllGFUpgradeEffects(); renderGFUpgrade(gfUpgrade); renderAllGFUpgrades(); updateDisplays(); }}
    function playQuackSound() { /* ... same ... */ if (typeof isQuackEnabled !== 'undefined' && isQuackEnabled && typeof quackSound !== 'undefined' && quackSound.play) { quackSound.currentTime = 0; quackSound.play();}}

    // Super Level Functions
    function enterSuperLevel(dimensionName) { if (dimensionName === 'heaven') { currentDimension = 'heaven'; console.log("Entered Duck Heaven!"); } updateDisplays(); }
    function returnToNormalPlane() { currentDimension = 'normal'; console.log("Returned to the mortal plane of ducks."); updateDisplays(); }

    // --- Event Listeners ---
    if (clickableDuckV2) clickableDuckV2.addEventListener('click', manualClick); else console.error("#clickableDuckV2 not found.");
    if (saveGameButton) saveGameButton.addEventListener('click', saveGame); else console.error("#saveGameButton not found");
    if (loadGameButton) loadGameButton.addEventListener('click', loadGame); else console.error("#loadGameButton not found");
    if (resetGameButton) resetGameButton.addEventListener('click', resetGame); else console.error("#resetGameButton not found");
    if (rebirthButton) rebirthButton.addEventListener('click', performRebirth); else console.error("#rebirthButton not found");
    if (ascendToHeavenButton) ascendToHeavenButton.addEventListener('click', () => enterSuperLevel('heaven')); else console.error("#ascendToHeavenButton not found");
    if (returnToNormalPlaneButton) returnToNormalPlaneButton.addEventListener('click', returnToNormalPlane); else console.error("#returnToNormalPlaneButton not found");

    // --- Start Game & Error Checks ---
    if (!qpAmountDisplay || !qpPerSecondDisplay || !qpPerClickDisplay || !generatorsListContainer || !upgradesListContainer || !gfUpgradesListContainer || !playerLevelDisplay || !nextLevelQPDisplay || !celestialPortalSection || !superLevelDisplayArea) {
        console.error("One or more critical UI elements are missing. Game cannot start properly."); return;
    }

    // --- Save/Load/Reset Functions ---
    function saveGame() { /* ... same ... */
        const gameState = {
            qp: qp, qpPerClick: qpPerClick,
            generators: generators.map(g => ({ id: g.id, owned: g.owned, cost: g.cost, baseCost: g.baseCost, outputPerGenerator: g.outputPerGenerator })),
            upgrades: upgrades.map(u => ({ id: u.id, purchased: u.purchased })),
            goldenFeathers: goldenFeathers, totalQPAllTime: totalQPAllTime, playerLevel: playerLevel,
            gfUpgrades: gfUpgrades.map(u => ({ id: u.id, purchased: u.purchased, level: u.level })),
            currentDimension: currentDimension, divineDuckChow: divineDuckChow,
            heavenUpgrades: { celestialFeeder: { owned: heavenUpgrades.celestialFeeder.owned }, prayerAltar: { owned: heavenUpgrades.prayerAltar.owned }},
            ddcPerSecondPassive: ddcPerSecondPassive
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
        alert("Game Saved! Quack-tastic!"); console.log("Game saved:", gameState);
    }
    function loadGame() { /* ... same ... */
        const savedState = localStorage.getItem(SAVE_KEY);
        if (savedState) {
            try {
                const gameState = JSON.parse(savedState); console.log("Loading game state:", gameState);
                qp = gameState.qp || 0; goldenFeathers = gameState.goldenFeathers || 0;
                totalQPAllTime = gameState.totalQPAllTime || 0; playerLevel = gameState.playerLevel || 0;
                currentDimension = gameState.currentDimension || 'normal';
                divineDuckChow = gameState.divineDuckChow || 0;
                ddcPerSecondPassive = gameState.ddcPerSecondPassive || 1;
                if (gameState.generators) { gameState.generators.forEach(savedGen => { const gameGen = generators.find(g => g.id === savedGen.id); if (gameGen) { gameGen.owned = savedGen.owned || 0; gameGen.baseCost = savedGen.baseCost || originalGeneratorDefinitions[gameGen.id].baseCost; gameGen.cost = savedGen.cost || gameGen.baseCost * Math.pow(1.15, gameGen.owned); gameGen.outputPerGenerator = savedGen.outputPerGenerator || originalGeneratorDefinitions[gameGen.id].baseOutput; }});}
                if (gameState.upgrades) { gameState.upgrades.forEach(savedUpgrade => { const gameUpgrade = upgrades.find(u => u.id === savedUpgrade.id); if (gameUpgrade) gameUpgrade.purchased = savedUpgrade.purchased || false; });}
                if (gameState.gfUpgrades) { gameState.gfUpgrades.forEach(savedGFUpg => { const gameGFUpg = gfUpgrades.find(u => u.id === savedGFUpg.id); if (gameGFUpg) { gameGFUpg.purchased = savedGFUpg.purchased || false; gameGFUpg.level = savedGFUpg.level || 0; }});}
                if (gameState.heavenUpgrades) { if (heavenUpgrades.celestialFeeder && gameState.heavenUpgrades.celestialFeeder) heavenUpgrades.celestialFeeder.owned = gameState.heavenUpgrades.celestialFeeder.owned || 0; if (heavenUpgrades.prayerAltar && gameState.heavenUpgrades.prayerAltar) heavenUpgrades.prayerAltar.owned = gameState.heavenUpgrades.prayerAltar.owned || 0; }
                qpPerClick = gameState.qpPerClick || 1;
                applyAllGFUpgradeEffects();
                generators.forEach(gen => { if (gen.owned === 0) gen.cost = gen.baseCost; });
                renderAllGenerators(); renderAvailableUpgrades(); renderAllGFUpgrades();
                updateDisplays();
                alert("Game Loaded! Welcome back to the Quackverse!");
            } catch (e) { console.error("Error loading saved game:", e); alert("Error loading save data. It might be corrupted. Starting fresh."); localStorage.removeItem(SAVE_KEY); resetGame(false); }
        } else { alert("No save game found. Starting a new quack-venture!"); }
    }
    function resetGame(confirmReset = true) { /* ... same, with heavenUpgrades reset ... */
        const doReset = confirmReset ? confirm("Are you sure you want to reset your game? All quacking progress will be lost!") : true;
        if (doReset) {
            localStorage.removeItem(SAVE_KEY);
            qp = 0; totalQPAllTime = 0; goldenFeathers = 0; playerLevel = 0;
            currentDimension = 'normal'; divineDuckChow = 0; ddcPerSecondPassive = 1;
            heavenUpgrades.celestialFeeder.owned = 0; heavenUpgrades.prayerAltar.owned = 0;
            generators.forEach(g => { const originalDef = originalGeneratorDefinitions[g.id]; g.owned = 0; g.baseCost = originalDef.baseCost; g.cost = originalDef.baseCost; g.baseOutput = originalDef.baseOutput; g.outputPerGenerator = originalDef.baseOutput;});
            upgrades.forEach(u => { u.purchased = false; });
            gfUpgrades.forEach(u => { u.purchased = false; u.level = 0; });
            applyAllGFUpgradeEffects();
            renderAllGenerators(); renderAvailableUpgrades(); renderAllGFUpgrades();
            updateDisplays();
            if(confirmReset) alert("Game Reset! Ready for a fresh start.");
        }
    }
    initializeGame();
});
