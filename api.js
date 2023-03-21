const superagent = require('superagent');
const base = 'https://www.superheroapi.com/api.php/10223292169799592';


// draw/deal from a specificed deck and with a specificed number of cards
const searchName = async (shName) => {
    // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
    try {
        const drawURL = `${base}/search/${shName}`;
        const res = await superagent.get(drawURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    // below is the same as buildDeck: buildDeck
    searchName
};
