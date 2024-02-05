
let clickUpgrades = [
    {
        name: 'gardening gloves',
        id: 'gardenGlovesStat',
        initialPrice: 1,
        quantity: 0,
        multiplier: 1,
        cost: 1
    },
    {
        name: 'little shovel',
        id: 'littleShovelStat',
        initialPrice: 20,
        quantity: 0,
        multiplier: 20,
        cost: 20
    }
];

let automaticUpgrades = [
    {
        name: 'sunshine',
        id: 'sunshineStat',
        initialPrice: 30,
        quantity: 0,
        multiplier: 30,
        cost: 30
    },
    {
        name: 'ladybugs',
        id: 'ladybugsStat',
        initialPrice: 50,
        quantity: 0,
        multiplier: 50,
        cost: 50
    }
];

let flowers = 0;
let clickPower = 1;
let extraAutoClickPower = 0;

function digForFlowers() {
    if (clickPower == 0) {
        flowers++
    }
    flowers += clickPower
    drawScoreboard()
}

function buyUpgrade(clickUpgradeMultiplier) {
    let foundUpgrade = clickUpgrades.find(clickUpgrade => clickUpgradeMultiplier == clickUpgrade.initialPrice)
    if (flowers >= foundUpgrade.cost) {
        clickPower += clickUpgradeMultiplier
        flowers -= foundUpgrade.cost
        drawClickUpgradeStats(clickUpgradeMultiplier)
    } else {
        keepDiggingAlert()
        return
    }
}

function drawClickUpgradeStats(clickUpgradeMultiplier) {
    let foundUpgradeStat = clickUpgrades.find(clickUpgrade => clickUpgrade.multiplier == clickUpgradeMultiplier)
    priceOfUpgradeIncrease(foundUpgradeStat)
    foundUpgradeStat.quantity++
    console.log(foundUpgradeStat.quantity)
    document.getElementById(foundUpgradeStat.id).innerText = foundUpgradeStat.quantity
}

function priceOfUpgradeIncrease(foundUpgradeStat) {
    console.log('found upgrade stat', foundUpgradeStat, foundUpgradeStat.cost)
    foundUpgradeStat.cost++
    drawScoreboard()
}

function buyAutoUpgrade(automaticUpgradeMultiplier) {
    let foundUpgrade = automaticUpgrades.find(automaticUpgrade => automaticUpgradeMultiplier == automaticUpgrade.initialPrice)
    if (flowers >= foundUpgrade.cost) {
        extraAutoClickPower += automaticUpgradeMultiplier
        flowers -= foundUpgrade.cost
        drawAutoUpgradeStats(automaticUpgradeMultiplier)
        foundUpgrade.cost++
    }
    else {
        keepDiggingAlert()
        return
    }
    drawScoreboard()
}

function drawAutoUpgradeStats(automaticUpgradeMultiplier) {
    let foundUpgradeStat = automaticUpgrades.find(automaticUpgrade => automaticUpgrade.multiplier == automaticUpgradeMultiplier)
    foundUpgradeStat.quantity++
    document.getElementById(foundUpgradeStat.id).innerText = foundUpgradeStat.quantity
}

function drawScoreboard() {
    document.getElementById('totalFlowers').innerText = flowers
    document.getElementById('clickPower').innerText = `+` + clickPower
    document.getElementById('autoClicksOnIncrement').innerText = `+` + extraAutoClickPower
    document.getElementById('gardeningGloveCost').innerText = clickUpgrades[0].cost
    document.getElementById('littleShovelCost').innerText = clickUpgrades[1].cost
    document.getElementById('sunshineCost').innerText = automaticUpgrades[0].cost
    document.getElementById('ladybugCost').innerText = automaticUpgrades[1].cost
}

function autoUpgradeClicks() {
    flowers += extraAutoClickPower
    drawScoreboard()
}
function keepDiggingAlert() {
    Swal.fire({
        title: "Keep on digging!",
        text: "Click the flowers to pick them and earn points! Use your flowers to purchase click upgrades or flower power-ups that do the clicking for you!",
        imageUrl: "https://clipart-library.com/img1/1275272.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "shovel"
    });
}
drawScoreboard()
setInterval(autoUpgradeClicks, 3000)