const axios = require('axios');

let configCache = null;

const getConfig = async () => {
  if (!configCache) {
    const [cashIn, cashOutNatural, cashOutJuridical] = await Promise.all([
      axios.get('https://developers.paysera.com/tasks/api/cash-in'),
      axios.get('https://developers.paysera.com/tasks/api/cash-out-natural'),
      axios.get('https://developers.paysera.com/tasks/api/cash-out-juridical'),
    ]);

    configCache = {
      cashIn: cashIn.data,
      cashOutNatural: cashOutNatural.data,
      cashOutJuridical: cashOutJuridical.data,
    };
  }

  return configCache;
};

module.exports = {
  getConfig,
};
