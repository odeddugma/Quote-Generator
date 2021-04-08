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
        //throw error;
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        generateNewQuote();
    } catch (error) {
        /* In the case of failure to get quotes from a remote API, use local array of quotes from quotes.js file.
        IMPORTANT: This time 'apiQuotes' derived from a local variable and not from an API! */
        apiQuotes = localQuotes;
        generateNewQuote();
        console.log(`There was a problem getting the quotes from API. This is a local quote.
        error message: ${error}`);
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