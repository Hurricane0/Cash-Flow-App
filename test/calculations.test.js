const { calculateCommissionFees } = require('../utils/calculations');

describe('Commission Fee Calculations', () => {
  const config = {
    cashIn: {
      percents: 0.03,
      max: {
        amount: 5,
        currency: 'EUR',
      },
    },
    cashOutNatural: {
      percents: 0.3,
      week_limit: {
        amount: 1000,
        currency: 'EUR',
      },
    },
    cashOutJuridical: {
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: 'EUR',
      },
    },
  };

  const inputData = [
    {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: { amount: 200, currency: 'EUR' },
    },
    {
      date: '2016-01-06',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_out',
      operation: { amount: 300, currency: 'EUR' },
    },
    {
      date: '2016-01-06',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 30000, currency: 'EUR' },
    },
    {
      date: '2016-01-07',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1000, currency: 'EUR' },
    },
    {
      date: '2016-01-07',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 100, currency: 'EUR' },
    },
    {
      date: '2016-01-10',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 100, currency: 'EUR' },
    },
    {
      date: '2016-01-10',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_in',
      operation: { amount: 1000000, currency: 'EUR' },
    },
    {
      date: '2016-01-10',
      user_id: 3,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1000, currency: 'EUR' },
    },
    {
      date: '2016-02-15',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 300, currency: 'EUR' },
    },
  ];

  const expectedFees = [
    '0.06',
    '0.90',
    '87.00',
    '3.00',
    '0.30',
    '0.00',
    '5.00',
    '0.00',
    '0.00',
  ];

  test('should calculate correct commission fees', () => {
    const results = calculateCommissionFees(inputData, config);
    expect(results).toEqual(expectedFees);
  });
});
