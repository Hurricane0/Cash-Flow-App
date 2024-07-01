# Cash Flow App

## How to Run the Program

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run the program with the input file:
   ```sh
   node app.js input.json
   ```

## How to Run Tests

1. Run the tests using Jest:
   ```sh
   npm test
   ```

## Description

This program calculates the commission fees for cash in and cash out operations based on the provided configuration fetched from APIs. The input data is read from a JSON file, and the results are printed to stdout.

### Commission Fees

- **Cash In**: 0.03% of the total amount, but no more than 5.00 EUR.
- **Cash Out (Natural Persons)**: 0.3% of the amount. 1000.00 EUR per week is free of charge. Commission is calculated only on the exceeded amount.
- **Cash Out (Legal Persons)**: 0.3% of the amount, but not less than 0.50 EUR.

### Rounding

After calculating the commission fee, it is rounded to the smallest currency item (cents) to the upper bound (ceiled).
