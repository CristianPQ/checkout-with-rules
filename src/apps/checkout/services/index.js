const { products: allProducts, rules: applicableRules } = require('../config.json');
const definedRules = require('./rules');

/**
 * 
 * @param {String[]} productCodes 
 */

const calculateTotalAmount = (productCodes) => {
  const invalidCodes = [];
  let basicTotalAmount = productCodes.map(pc => {
    const product = allProducts.find(p => p.code === pc);
    if (!product) {
      invalidCodes.push(pc);
      return 0;
    }
    return product.price;
  }).reduce((p, c) => p + c, 0);

  if (invalidCodes.length > 0) throw Error(`There are invalid products: ${invalidCodes.toString()}`)

  for (const rule of applicableRules) {
    basicTotalAmount = definedRules[rule.id](basicTotalAmount, allProducts, productCodes, rule.productCode, rule.inputs || {});
  }

  return basicTotalAmount;
}

module.exports = {
  calculateTotalAmount
}
