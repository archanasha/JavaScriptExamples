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
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get quotes from local js file
// const getLocalQuotes = () => {
//     return localQuotes[Math.floor(Math.random() * quotes.length)];
// }
//console.log('localQuotes: ', getLocalQuotes());

const newQuote = () => {
    loading();
    const quoteObj = quotes[Math.floor(Math.random() * quotes.length)]

    if (!quoteObj.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quoteObj.author;
    }

    // if longer text reduce font-size
    if (quoteObj.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quoteObj.text;
    loadComplete();
}

// Get quotes from server
async function getQuotes() {
    loading();
    const quoteUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(quoteUrl);
        quotes = await response.json();
        newQuote();
    } catch (error) {
        // display custom error
        loadComplete();
        console.log('Oops!', error);
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
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// get quotes
getQuotes();
