console.log('Reading file...');

const fs = require('fs'); // Node.js file system module

try {
    console.log('Reading the JSON file...');
    let rawData = fs.readFileSync('data.json', 'utf8'); // Add 'utf8' encoding

    console.log('Parsing the JSON data...');
    let x = JSON.parse(rawData);

    console.log('Data:', x); // Output the array to verify
} catch (error) {
    console.error('Error:', error.message); // Log any errors
}
