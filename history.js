// built in node module that allows for interacting with the file system
const fs = require('fs');

// built in module that provides utilities for working with files and directory paths
const path = require('path');
const filename='history.json';

// read file and perform word count using fs with promises
const updateHistory = async (shName,rCount) => {
    const fullPath = path.resolve(__dirname, './', filename);

    try {
        const result = await fs.promises.readFile(fullPath, 'utf-8');

        const wordArray = JSON.parse(result);
        wordArray.table.push( {"Search ":shName,"ResultCount ":rCount});
        //console.log(wordArray.table);
        const json = JSON.stringify(wordArray);
        const result2 = await fs.promises.writeFile(fullPath, json, 'utf-8');

    } catch (error) {
        console.log(error);
    }
};
//updateHistory("Jacob",333);
//let obj=readHistory('history.json');
//console.log(obj);
//writeHistory('history.json',obj);

module.exports = {
    updateHistory
};