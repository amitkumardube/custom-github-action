// We are using export statement to export the function readJson.
// same can be achieved by prepending the readJson function with export keyword.
export { readJson };

// We are use the standard fs library to run the code. 
const fs = require('fs')

// read and parse the JSON file
let readJson = (filename : string) => {
    // read the file passed as argument to the function
    const rawdata = fs.readFileSync(filename);

    // Once we read the file. let's parse it
    const benchmarkJSON = JSON.parse(rawdata);

    return benchmarkJSON;
}
