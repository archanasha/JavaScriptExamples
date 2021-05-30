const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const loadComplete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get quotes from server
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const quoteUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + quoteUrl);
        const quote = await response.json();
        if (!quote.quoteAuthor) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = quote.quoteAuthor;
        }

        // if longer text reduce font-size
        if (quote.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = quote.quoteText;
        loadComplete();
    } catch (error) {
        loadComplete();
        // display custom error
        console.log('Sorry, no quote', error);
    }
}

//call twitter API to tweet the quote
const tweetQuote = () => {
    console.log('localQuotes: ', `${quoteText.textContent}`)
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    // const respose = await fetch(tweetUrl);
    window.open(tweetUrl, '_blank');
}

// Event Listners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// get quotes
getQuote();
