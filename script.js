let cookieCount = 0;
let cookiesPerSecond = 0;
let clickCount = 0;

let production = {
  cursor: { count: 0, price: 15, cps: 1, emoji: "🖱️" },
  grandma: { count: 0, price: 100, cps: 10, emoji: "👵" },
  farm: { count: 0, price: 500, cps: 50, emoji: "🌾" },
};

let achievements = {
  100: { unlocked: false, message: "100 cookies! Keep going!" },
  500: { unlocked: false, message: "500 cookies! You're on fire!" },
  1000: { unlocked: false, message: "1000 cookies! Unstoppable!" },
  50: { unlocked: false, message: "50 clicks! Click master!" },
};

// Update cookie count display
function updateCookieCount() {
  document.getElementById("cookie-count").textContent = `${formatNumber(cookieCount)} cookies`;
  checkAchievements();
}

// Update cookies per second display
function updateCookiesPerSecond() {
  document.getElementById("cookies-per-second").textContent = `Cookies per second: ${formatNumber(cookiesPerSecond)}`;
}

// Handle cookie clicks
document.getElementById("cookie-btn").addEventListener("click", () => {
  cookieCount++;
  clickCount++;
  updateCookieCount();
  checkClickAchievement();
});

// Check for cookie-based achievements
function checkAchievements() {
  for (let milestone in achievements) {
    if (cookieCount >= milestone && !achievements[milestone].unlocked) {
      achievements[milestone].unlocked = true;
      showAchievement(achievements[milestone].message);
    }
  }
}

// Check for click-based achievements
function checkClickAchievement() {
  if (clickCount === 50 && !achievements[50].unlocked) {
    achievements[50].unlocked = true;
    showAchievement(achievements[50].message);
  }
}

// Show achievement popup
function showAchievement(message) {
  const achievementDiv = document.createElement("div");
  achievementDiv.className = "achievement-popup";
  achievementDiv.textContent = message;
  document.getElementById("achievements").appendChild(achievementDiv);

  setTimeout(() => {
    achievementDiv.classList.add("active");
  }, 100);

  setTimeout(() => {
    achievementDiv.classList.remove("active");
    setTimeout(() => achievementDiv.remove(), 500);
  }, 3000);
}

// Buy an item
function buyItem(item) {
  if (cookieCount >= production[item].price) {
    cookieCount -= production[item].price;
    production[item].count++;
    production[item].price = Math.floor(production[item].price * 1.15);

    document.getElementById(item).querySelector(".emoji-counter").textContent = production[item].count;
    document.getElementById(`${item}-price`).textContent = formatNumber(production[item].price);
    updateCookieCount();
    calculateCookiesPerSecond();
  } else {
    alert("Not enough cookies!");
  }
}

// Calculate total cookies per second
function calculateCookiesPerSecond() {
  cookiesPerSecond = 0;
  for (let item in production) {
    cookiesPerSecond += production[item].count * production[item].cps;
  }
  updateCookiesPerSecond();
}

// Auto-generate cookies
function generateCookies() {
  cookieCount += cookiesPerSecond;
  updateCookieCount();
}

setInterval(generateCookies, 1000);

calculateCookiesPerSecond();

function formatNumber(num) {
  return num.toLocaleString();
}
