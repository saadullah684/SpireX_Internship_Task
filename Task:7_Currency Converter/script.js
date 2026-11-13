
const amountInput = document.getElementById("amount");

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const resultElement = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const statusElement = document.getElementById("status");

const API_URL = "https://api.frankfurter.dev/v2";

async function convertCurrency() {

    const amount = Number(amountInput.value);

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Validate amount
    if (!amountInput.value.trim() || !Number.isFinite(amount) || amount <= 0) {
        statusElement.textContent = "Please enter a valid amount.";
        resultElement.textContent = "0.00 " + to;
        rateInfo.textContent = "Enter an amount to continue.";
        return;
    }

    // Show loading message
    convertBtn.disabled = true;
    convertBtn.textContent = "Converting...";
    statusElement.textContent = "Fetching exchange rate...";
    resultElement.textContent = "Loading...";
    rateInfo.textContent = "";

    try {

        let rate = 1;
        let rateDate = "Same currency";

        // No API request needed for identical currencies
        if (from !== to) {

            const response = await fetch(
                `${API_URL}/rate/${from}/${to}`
            );

            if (!response.ok) {
                throw new Error("Exchange rate unavailable.");
            }

            const data = await response.json();

            rate = data.rate;
            rateDate = data.date;
        }

        // Calculate converted amount
        const convertedAmount = amount * rate;

        const formattedAmount = new Intl.NumberFormat(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4
            }
        ).format(convertedAmount);

        // Display result
        resultElement.textContent = `${formattedAmount} ${to}`;

        rateInfo.textContent =
            `1 ${from} = ${rate.toFixed(6)} ${to}`;

        statusElement.textContent =
            from === to
                ? "Same currency selected. No conversion needed."
                : `Exchange rate date: ${rateDate}`;

    } catch (error) {

        resultElement.textContent = "Conversion Failed";
        rateInfo.textContent = "Please try again later.";

        statusElement.textContent =
            "Unable to fetch exchange rates. Check your internet connection.";

        console.error("Currency conversion error:", error);

    } finally {

        convertBtn.disabled = false;
        convertBtn.textContent = "Convert Currency";

    }
}

// Convert button click
convertBtn.addEventListener("click", convertCurrency);

// Swap currencies
swapBtn.addEventListener("click", function() {

    const previousFrom = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = previousFrom;

    convertCurrency();

});

// Run conversion when page loads
convertCurrency();
