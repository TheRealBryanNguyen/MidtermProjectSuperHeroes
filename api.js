const superagent = require('superagent');
const base = 'https://www.superheroapi.com/api.php/10223292169799592';


const searchName = async (shName) => {
    try {
        const drawURL = `${base}/search/${shName}`;
        const res = await superagent.get(drawURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

const getCharacter = async (shID) => {
    try {
        const drawURL = `${base}/${shID}`;
        const res = await superagent.get(drawURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    searchName,getCharacter
};
