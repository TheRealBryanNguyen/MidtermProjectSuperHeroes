const prompts = require('prompts');

const api = require('./api.js');

const _discardPrompt = async (cards) => {
    const displayCards = cards.map((card) => {
        return { title: `${card.value} of ${card.suit}`, value: card.code };
    });

    return await prompts([
        {
            type: 'multiselect',
            name: 'cards',
            message: 'Select cards to throw away',
            choices: displayCards,
            validate: (selected) => {
                const maxSelection = cards.length - 1;
                if (selected.length > maxSelection) {
                    return `You may only select up to ${maxSelection} cards`;
                } else {
                    return true;
                }
            }
        }
    ]);
};

const _findAndRemove = (originalHand, throwawayCards) => {
    return originalHand.filter((card) => {
        // if the card.code is NOT included in the throwaway array (array of strings) then keep it
        return !throwawayCards.includes(card.code);
    });
};
// application logic
// get a deck, draw original hand from deck, prompt user to discard, replace discarded cards by drawing again
const playPoker = async (args) => {
    // hard code the deck count due to rules of poker
    const deckCount = 1;

    // get a deck of cards
    const deckOfCards = await api.buildDeck(deckCount);

    // get the number of cards request from the args passed in
    const { cardCount } = args;

    // deal cards to a player from the deck that was requested above
    const originalHand = await api.drawCards(deckOfCards.deck_id, cardCount);

    // prompt the user to select cards to discard
    const throwaways = await _discardPrompt(originalHand.cards);

    // find and remove the cards in the original hand that were thrown away
    const filterCards = _findAndRemove(originalHand.cards, throwaways.cards);

    // draw cards to replace the discarded ones
    const newCards = await api.drawCards(
        deckOfCards.deck_id,
        throwaways.cards.length
    );

    const finalHand = [...filterCards, ...newCards.cards];

    // print the updated player hand
    finalHand.forEach((card) => {
        console.log(`${card.value} of ${card.suit}`);
    });
};

module.exports = {
    playPoker
};
