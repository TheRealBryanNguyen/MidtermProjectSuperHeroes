const superagent = require('superagent');
const base = 'https://deckofcardsapi.com/api/deck';

// build a deck of cards that are shuffled
const buildDeck = async (deckCount) => {
    // https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
    try {
        const deckURL = `${base}/new/shuffle/?deck_count=${deckCount}`;
        const res = await superagent.get(deckURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

// draw/deal from a specificed deck and with a specificed number of cards
const drawCards = async (deckId, cardCount) => {
    // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
    try {
        const drawURL = `${base}/${deckId}/draw/?count=${cardCount}`;
        const res = await superagent.get(drawURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    // below is the same as buildDeck: buildDeck
    buildDeck,
    drawCards
};
