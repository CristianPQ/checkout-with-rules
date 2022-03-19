const { bulkPurchase, twoForOne } = require('./rules');

describe("Rule: Discount on bulk purchase", () => {
  it("On be first rule to be applied: should apply new product price on buy more than min amount of the same product", () => {
    const totalAmount = 11.00;
    const allProducts = [
      { "code": "A", "name": "a", "price": 3.00 },
      { "code": "B", "name": "b", "price": 5.00 }
    ];
    const checkoutProducts = ["A", "B", "A"];
    const productCode = "A";
    const inputs = { min: 2, bulkUnitPrice: 2.00 };
    expect(bulkPurchase(totalAmount, allProducts, checkoutProducts, productCode, inputs)).toBe(9.00)
  });

  it("On be second or consequent rule to be applied: should apply new product price on buy more than min amount of the same product", () => {
    const totalAmount = 10.00;
    const allProducts = [
      { "code": "A", "name": "a", "price": 3.00 },
      { "code": "B", "name": "b", "price": 5.00 }
    ];
    const checkoutProducts = ["A", "B", "A"];
    const productCode = "A";
    const inputs = { min: 2, bulkUnitPrice: 2.00 };
    expect(bulkPurchase(totalAmount, allProducts, checkoutProducts, productCode, inputs)).toBe(8.00)
  });

  it("Should not apply new product price on buy less than min amount of the same product", () => {
    const totalAmount = 10.00;
    const allProducts = [
      { "code": "A", "name": "a", "price": 3.00 },
      { "code": "B", "name": "b", "price": 5.00 }
    ];
    const checkoutProducts = ["A", "B", "A", "A"];
    const productCode = "A";
    const inputs = { min: 5, bulkUnitPrice: 2.00 };
    expect(bulkPurchase(totalAmount, allProducts, checkoutProducts, productCode, inputs)).toBe(10.00)
  });

});

describe("Rule: On buy Two pay for One", () => {
  it("On be first rule to be applied: should apply the discount because of buying 2 product", () => {
    const totalAmount = 11.00;
    const allProducts = [
      { "code": "A", "name": "a", "price": 3.00 },
      { "code": "B", "name": "b", "price": 5.00 }
    ];
    const checkoutProducts = ["A", "B", "A"];
    const productCode = "A";
    const inputs = {};
    expect(twoForOne(totalAmount, allProducts, checkoutProducts, productCode, inputs)).toBe(8.00)
  });

  it("On be second or consequent rule to be applied: should apply the discount because of buying 2 product", () => {
    const totalAmount = 10.00;
    const allProducts = [
      { "code": "A", "name": "a", "price": 3.00 },
      { "code": "B", "name": "b", "price": 5.00 }
    ];
    const checkoutProducts = ["A", "B", "A"];
    const productCode = "A";
    const inputs = {};
    expect(twoForOne(totalAmount, allProducts, checkoutProducts, productCode, inputs)).toBe(7.00)
  });

  it("Should apply the discount twice because of buying 5 product", () => {
    const totalAmount = 25.00;
    const allProducts = [
      { "code": "A", "name": "a", "price": 3.00 },
      { "code": "B", "name": "b", "price": 5.00 }
    ];
    const checkoutProducts = ["A", "B", "A", "B", "A", "A", "A"];
    const productCode = "A";
    const inputs = {};
    expect(twoForOne(totalAmount, allProducts, checkoutProducts, productCode, inputs)).toBe(19.00)
  });

});