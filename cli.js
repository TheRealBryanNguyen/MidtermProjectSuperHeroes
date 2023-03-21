const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    // $0 expands the file name
    // <> indicate that the command is manadatory
    // [] indicate that options are optional
    .usage('$0: Usage <command>')
    .command('Search <keyword>','play card games',
        // command
        // <> indicates the command argument required
        // description for the command
        // builder function to build out our command arguments and options
        // the argument inside the function below represents an instance of yargs
        (yargs) => {
            // configures a command argument based off the name
            // first argument below must match the name given in the <>
            // second agument is an options object
            return (
                yargs
                    .positional('keyword', {
                        describe: 'name of the search item',
                        type: 'string'
                    })
            );
        },
        // handler functions for handling parsed command, command arguments, and options
        (args) => {
            //if(args.keyword)
            app.searchSuperHero(args);
        }
    )
    .help().argv;
