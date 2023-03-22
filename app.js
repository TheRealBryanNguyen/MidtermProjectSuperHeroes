const prompts = require('prompts');

const api = require('./api.js');
const history = require('./history.js');
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


const _searchPrompt = async (shList) => {
    const displaySH = shList.map((shInfo) => {
        return { title: `${shInfo.name} of ${shInfo.biography['first-appearance']}`, value: shInfo.id };
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
const printCharacter = async (shInfo) => {

    try {
        console.log('\nCharacter Info');
        console.log('Super Hero Name:  '+shInfo['name']);
        console.log('First Appearance: '+shInfo.biography['first-appearance']);
        console.log('Publisher       : '+shInfo.biography['publisher']);

        console.log('\nPersonal Info');
        console.log('Full Name:        '+shInfo.biography['full-name']);
        console.log('Alter-egos:       '+shInfo.biography['alter-egos']);
        console.log('Aliases:          '+shInfo.biography['aliases']);
        console.log('Place of Birth:   '+shInfo.biography['place-of-birth']);
        console.log('Occupation:       '+shInfo.work['occupation']);
        console.log('Family:           '+shInfo.connections['relatives']); 
        console.log('Affiliations:     '+shInfo.connections['group-affiliation']);

        console.log('\nAppearance');
        console.log('Gender:           '+shInfo.appearance['gender']);
        console.log('Race:             '+shInfo.appearance['race']);
        console.log('Height:           '+shInfo.appearance['height'][0]);
        console.log('Weight:           '+shInfo.appearance['weight'][0]);
        console.log('Eye Color:        '+shInfo.appearance['eye-color']);
        console.log('Hair Color:       '+shInfo.appearance['hair-color']);

        console.log('\nPowerstats');
        console.log('Intelligence:     '+shInfo.powerstats['intelligence']);
        console.log('Strength:         '+shInfo.powerstats['strength']);
        console.log('Speed:            '+shInfo.powerstats['speed']);
        console.log('Durability:       '+shInfo.powerstats['durability']);
        console.log('Power:            '+shInfo.powerstats['power']);
        console.log('Combat:           '+shInfo.powerstats['combat']);

    } catch (error) {
        console.log(error);
    }
};

// application logic
const searchSuperHero = async (args) => {
    const shName = args.keyword;

    const shSearch = await api.searchName(shName);
   // console.log(shSearch.results.length); //number of results
    const shUpdate = await history.updateHistory(shName,shSearch.results.length);
    const shID = await _searchPrompt(shSearch.results);

    const shCharacter = await api.getCharacter(shID.Superheros);
    //console.log(shID.Superheros);
    printCharacter(shCharacter);

};

module.exports = {
    searchSuperHero
};