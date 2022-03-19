const { calculateTotalAmount } = require('./services');

const checkout = (productCodes) => {
  const cleanedProductCodes = Array.isArray(productCodes) ?
    productCodes.map(p => p.trim()) :
    productCodes.split(',').map(p => p.trim());

  return calculateTotalAmount(cleanedProductCodes);
}

module.exports = { checkout };
