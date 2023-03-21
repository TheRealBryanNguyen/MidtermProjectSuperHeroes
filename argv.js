// run with: node argv.js play poker --count 5

const argv = process.argv;

console.log(argv);

// remove the first and second elements to access the arguments/flags
const args = argv.slice(2);

console.log(args);
