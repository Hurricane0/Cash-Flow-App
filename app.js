const fs = require('fs');
const path = require('path');
const { calculateCommissionFees } = require('./utils/calculations');
const { getConfig } = require('./utils/config');

// Read input file
const inputFilePath = process.argv[2];
if (!inputFilePath) {
  console.error('Please provide the input file path as an argument');
  process.exit(1);
}

const inputFile = path.resolve(__dirname, inputFilePath);
const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Fetch configuration and calculate commission fees
getConfig()
  .then(config => {
    const results = calculateCommissionFees(inputData, config);
    results.forEach(fee => console.log(fee));
  })
  .catch(error => {
    console.error('Error fetching configuration:', error);
  });
