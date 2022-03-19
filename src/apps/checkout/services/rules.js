
/**
 * 
 * @param {Double} totalAmount 
 * @param {Object[]} allProducts 
 * @param {String[]} checkoutProducts 
 * @param {String} productCode 
 * @returns 
 */
const templateRule = (totalAmount, allProducts, checkoutProducts, productCode, inputs) => {
  // get the product details
  const productDetails = "allProducts.find(productCode)";
  // calculate the discount
  const discount = 2.00;
  // calculate the new total amount
  const newTotalAmount = totalAmount - discount;
  return newTotalAmount;
}

/**
 * 
 * @param {Double} totalAmount 
 * @param {Object[]} allProducts 
 * @param {String[]} checkoutProducts 
 * @param {String} productCode 
 * @returns 
 */
const bulkPurchase = (totalAmount, allProducts, checkoutProducts, productCode, { min, bulkUnitPrice }) => {
  const productDetails = allProducts.find(p => p.code === productCode);
  // if the product involved in the rule doesn't exist, return totalAmount withour modifications
  if (!productDetails) return totalAmount;

  const repetitionsProductInCheckout = checkoutProducts.filter(cp => cp === productCode).length;
  if (repetitionsProductInCheckout < min) return totalAmount;

  const productDiscount = productDetails.price - bulkUnitPrice;
  const totalDiscount = productDiscount * repetitionsProductInCheckout;

  return totalAmount - totalDiscount;
}

/**
 * 
 * @param {Double} totalAmount 
 * @param {Object[]} allProducts 
 * @param {String[]} checkoutProducts 
 * @param {String} productCode 
 * @returns 
 */
const twoForOne = (totalAmount, allProducts, checkoutProducts, productCode) => {
  const productDetails = allProducts.find(p => p.code === productCode);
  if (!productDetails) return totalAmount;

  const repetitionsProductInCheckout = checkoutProducts.filter(cp => cp === productCode).length;
  if (repetitionsProductInCheckout < 2) return totalAmount;

  const amountOfDiscountApplications = parseInt(repetitionsProductInCheckout/2);
  const totalDiscount = amountOfDiscountApplications * productDetails.price;

  return totalAmount - totalDiscount
}

module.exports = {
  bulkPurchase,
  twoForOne
}