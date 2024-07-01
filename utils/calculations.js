const { roundUp } = require('./date');

const calculateCommissionFees = (operations, config) => {
  const fees = [];
  const userCashOutData = {};

  operations.forEach(operation => {
    let fee = 0;

    if (operation.type === 'cash_in') {
      fee = calculateCashInFee(operation.operation.amount, config.cashIn);
    } else if (operation.type === 'cash_out') {
      if (operation.user_type === 'natural') {
        fee = calculateCashOutNaturalFee(
          operation,
          userCashOutData,
          config.cashOutNatural
        );
      } else if (operation.user_type === 'juridical') {
        fee = calculateCashOutJuridicalFee(
          operation.operation.amount,
          config.cashOutJuridical
        );
      }
    }

    fees.push(fee.toFixed(2));
  });

  return fees;
};

const calculateCashInFee = (amount, config) => {
  const fee = amount * (config.percents / 100);
  return Math.min(fee, config.max.amount);
};

const calculateCashOutNaturalFee = (operation, userCashOutData, config) => {
  const {
    user_id,
    date,
    operation: { amount },
  } = operation;
  const weekNumber = getWeekNumber(new Date(date));
  const key = `${user_id}-${weekNumber}`;

  if (!userCashOutData[key]) {
    userCashOutData[key] = {
      totalAmountThisWeek: 0,
      remainingFreeLimit: config.week_limit.amount,
    };
  }

  let { totalAmountThisWeek, remainingFreeLimit } = userCashOutData[key];
  let taxableAmount = 0;

  if (remainingFreeLimit > 0) {
    if (amount <= remainingFreeLimit) {
      taxableAmount = 0;
      remainingFreeLimit -= amount;
    } else {
      taxableAmount = amount - remainingFreeLimit;
      remainingFreeLimit = 0;
    }
  } else {
    taxableAmount = amount;
  }

  totalAmountThisWeek += amount;
  userCashOutData[key] = { totalAmountThisWeek, remainingFreeLimit };

  return roundUp(taxableAmount * (config.percents / 100));
};

const calculateCashOutJuridicalFee = (amount, config) => {
  const fee = amount * (config.percents / 100);
  return Math.max(fee, config.min.amount);
};

const getWeekNumber = date => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
};

module.exports = {
  calculateCommissionFees,
};
