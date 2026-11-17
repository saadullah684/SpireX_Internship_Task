
const API_URL = "https://countries.dev/name/";

// HTML Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const resetBtn = document.getElementById("reset-btn");

const welcomeState = document.getElementById("welcome-state");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const countryCard = document.getElementById("country-card");

// Country Elements
const countryFlag = document.getElementById("country-flag");
const countryName = document.getElementById("country-name");
const countryOfficialName = document.getElementById("country-official-name");

const badgeRegion = document.getElementById("badge-region");
const badgeCode = document.getElementById("badge-code");

const countryCapital = document.getElementById("country-capital");
const countryPopulation = document.getElementById("country-population");
const countryRegion = document.getElementById("country-region-full");
const countryCurrency = document.getElementById("country-currency");
const countryLanguage = document.getElementById("country-language");
const countryCode = document.getElementById("country-code");
const countryArea = document.getElementById("country-area");
const countryContinent = document.getElementById("country-continent");

// Loading State
function showLoading() {
    welcomeState.classList.add("hidden");
    errorState.classList.add("hidden");
    countryCard.classList.add("hidden");
    loadingState.classList.remove("hidden");
}

// Error State
function showError(title, message) {
    loadingState.classList.add("hidden");
    welcomeState.classList.add("hidden");
    countryCard.classList.add("hidden");
    errorState.classList.remove("hidden");

    document.getElementById("error-title").textContent = title;
    document.getElementById("error-message").textContent = message;
}

// Search Country
async function searchCountry(country) {

    country = country.trim();

    if (!country) {
        showError("Empty Search", "Please enter a country name.");
        return;
    }

    showLoading();
    searchBtn.disabled = true;

    try {

        const response = await fetch(
            API_URL + encodeURIComponent(country)
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Country not found.");
            }

            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Country not found.");
        }

        const countryData = data.find(
            item => item.name.toLowerCase() === country.toLowerCase()
        ) || data[0];

        displayCountry(countryData);

        loadingState.classList.add("hidden");
        countryCard.classList.remove("hidden");

    } catch (error) {

        console.error("API Error:", error);

        showError(
            "Unable to Load Country",
            error.message === "Country not found."
                ? "Please check the spelling and try another country."
                : "Unable to connect to the country API. Please try again."
        );

    } finally {
        searchBtn.disabled = false;
    }
}

// Display Country Information
function displayCountry(data) {

    countryName.textContent = data.name || "N/A";

    countryOfficialName.textContent =
        data.nativeName || data.name || "N/A";

    countryFlag.src =
        data.flags?.png ||
        data.flags?.svg ||
        data.flag ||
        "";

    countryFlag.alt = `${data.name} Flag`;

    badgeRegion.textContent = data.region || "N/A";

    badgeCode.textContent = data.alpha3Code || "N/A";

    countryCapital.textContent = data.capital || "N/A";

    countryPopulation.textContent =
        data.population
            ? data.population.toLocaleString("en-US")
            : "N/A";

    countryRegion.textContent =
        `${data.region || "N/A"} / ${data.subregion || "N/A"}`;

    // Currency
    countryCurrency.textContent = data.currencies?.length
        ? data.currencies.map(
            currency =>
                `${currency.name} (${currency.symbol || ""})`
        ).join(", ")
        : "N/A";

    // Languages
    countryLanguage.textContent = data.languages?.length
        ? data.languages.map(language => language.name).join(", ")
        : "N/A";

    // Country Codes
    countryCode.textContent =
        `${data.alpha2Code || "N/A"} / ${data.alpha3Code || "N/A"}`;

    // Area
    countryArea.textContent = data.area
        ? `${data.area.toLocaleString("en-US")} km²`
        : "N/A";

    // Continent / Region
    countryContinent.textContent =
        data.continent || data.region || "N/A";
}

// Search Button
searchBtn.addEventListener("click", () => {
    searchCountry(searchInput.value);
});

// Enter Key
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchCountry(searchInput.value);
    }
});

// Popular Country Suggestions
document.querySelectorAll(".suggestion-tag").forEach(button => {

    button.addEventListener("click", () => {

        const country = button.dataset.country;

        searchInput.value = country;

        searchCountry(country);
    });

});

// Clear Search
clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
});

// Reset Application
resetBtn.addEventListener("click", () => {

    countryCard.classList.add("hidden");
    errorState.classList.add("hidden");
    loadingState.classList.add("hidden");

    welcomeState.classList.remove("hidden");

    searchInput.value = "";
    searchInput.focus();
});

// Default Country
searchInput.value = "Pakistan";

searchCountry("Pakistan");
