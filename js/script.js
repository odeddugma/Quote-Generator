const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Generate New Quote
function generateNewQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.round(Math.random() * apiQuotes.length)];

    // Check if Autohr field is blank and replace it with 'Uknown'
    if (!quote.author) {
        authorText.textContent = 'Uknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
let apiQuotes = [];
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        generateNewQuote();
    } catch (error) {
        console.log(error)
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blunk');
}

// Event Listeners
newQuoteBtn.addEventListener('click', generateNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();