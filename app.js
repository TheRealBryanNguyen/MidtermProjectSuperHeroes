const prompts = require('prompts');

const api = require('./api.js');
/*
const _searchPrompt = async () => {

    return await prompts([
        {
            type: 'text',
            name: 'searched',
            message: 'Enter a Name: '
        }
    ]);
};*/


const _discardPrompt = async (shList) => {
    const displaySH = shList.map((shInfo) => {
        return { title: `${shInfo.name} of ${shInfo.biography.publisher}`, value: shInfo };
      // return { title: `${shInfo.name}`, value: shInfo.id };
    });

    return await prompts([
        {
            type: 'select',
            name: 'Superheros',
            message: 'Select Superhero',
            choices: displaySH,
            validate: (selected) => {
                /*const maxSelection = cards.length - 1;
                if (selected.length > maxSelection) {
                    return `You may only select up to ${maxSelection} cards`;
                } else {
                    return true;
                }*/
                return true;
            }
        }
    ]);
};
/*
const _findAndRemove = (originalHand, throwawayCards) => {
    return originalHand.filter((card) => {
        // if the card.code is NOT included in the throwaway array (array of strings) then keep it
        return !throwawayCards.includes(card.code);
    });
};
//*/
// application logic
// get a deck, draw original hand from deck, prompt user to discard, replace discarded cards by drawing again
const searchSuperHero = async (args) => {
    // hard code the deck count due to rules of poker
    const shName = args.keyword;
    console.log(shName);
    const shInfo = await api.searchName(shName);
    const shResult = await _discardPrompt(shInfo.results);
    console.log(shResult);

};

module.exports = {
    searchSuperHero
};
