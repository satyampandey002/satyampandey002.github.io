 const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCorrencyElement = document.querySelector('.fromCorrency');
const toCorrencyElement = document.querySelector('.toCorrency');
const resultElement = document.querySelector('.result');
const converterContainer  = document.querySelector('.converter-container');

// Array with 180+ currencies
const countries = [
  { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "KRW", name: "South Korean Won" },
  { code: "ZAR", name: "South African Rand" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "THB", name: "Thai Baht" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "AFN", name: "Afghan Afghani" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "COP", name: "Colombian Peso" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "OMR", name: "Omani Rial" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "UGX", name: "Ugandan Shilling" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "RSD", name: "Serbian Dinar" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "ISK", name: "Icelandic Krona" },
  { code: "RON", name: "Romanian Leu" },
  { code: "TWD", name: "Taiwan Dollar" },
  { code: "LTL", name: "Lithuanian Litas" },
  { code: "LVL", name: "Latvian Lats" },
  { code: "SYP", name: "Syrian Pound" },
  { code: "SDG", name: "Sudanese Pound" },
  { code: "MMK", name: "Myanmar Kyat" },
  { code: "KHR", name: "Cambodian Riel" },
  { code: "LAK", name: "Lao Kip" },
  { code: "UZS", name: "Uzbekistani Som" },
  { code: "TMT", name: "Turkmenistani Manat" },
  { code: "MDL", name: "Moldovan Leu" },
  { code: "BYN", name: "Belarusian Ruble" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "KGS", name: "Kyrgyzstani Som" },
  { code: "MNT", name: "Mongolian Tugrik" },
  { code: "FJD", name: "Fijian Dollar" },
  { code: "PGK", name: "Papua New Guinean Kina" },
  { code: "TOP", name: "Tongan Pa'anga" },
  { code: "WST", name: "Samoan Tala" }
  // Add more if needed
];

// Populate dropdowns
countries.forEach(country => {
    [fromCorrencyElement, toCorrencyElement].forEach(el => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.code} (${country.name})`;
        el.appendChild(option);
    });
});

// Default values
fromCorrencyElement.value = "USD";
toCorrencyElement.value = "INR";

// Function to get exchange rate
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCorrency = fromCorrencyElement.value;
    const toCurrency = toCorrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rate..........";
    
    if (isNaN(amount) || amount <= 0) {
        convertedAmountElement.value = "";
        resultElement.textContent = "Please enter a valid amount";
        return;
    }

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCorrency}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCorrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        converterContainer.innerHTML = `<h2>Error while fetching exchange rates !!!</h2>`;
    }
};

// Event listeners
fromAmountElement.addEventListener('input', getExchangeRate);
fromCorrencyElement.addEventListener('change', getExchangeRate);
toCorrencyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);

// Initial call
getExchangeRate();
