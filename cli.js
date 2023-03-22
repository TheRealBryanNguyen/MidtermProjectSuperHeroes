const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command('Search <keyword>','Search for a Superhero',

        (yargs) => {

            return (
                yargs
                    .positional('keyword', {
                        describe: 'name of the search item',
                        type: 'string'
                    })
            );
        },
        (args) => { //handler
                app.searchSuperHero(args);
        }
    )
    .help().argv;
