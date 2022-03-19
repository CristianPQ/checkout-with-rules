# Checkout Service

A simple service to calculate the total amount to be paid on a checkout process.

# Requirements

* `npm`
* `node` >= 14.7.0 (will likely work with older versions, but has never been
  tested)

# Installation

`npm install`

# Running

`npm start` will start the application at
[http://localhost:8080](http://localhost:8080) (set environment variable `PORT`
to change the port).

## Cases to execute with curl

```curl --data '{"codes": "VOUCHER, TSHIRT, MUG"}' -H "Content-Type: application/json" http://localhost:8080/checkout```

```curl --data '{"codes": "VOUCHER, TSHIRT, VOUCHER"}' -H "Content-Type: application/json" http://localhost:8080/checkout```

```curl --data '{"codes": "TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT"}' -H "Content-Type: application/json" http://localhost:8080/checkout```

```curl --data '{"codes": "VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT"}' -H "Content-Type: application/json" http://localhost:8080/checkout```

# Testing

Tests can be run with `npm test`.

All tests are colocated with their respective source files in `*.spec.js` files,
using [Jest](https://facebook.github.io/jest/) with default settings.

# Resolution process

- Configure Node API basic config to interact with it as an RestFull API
- Configure an app for this service pourpose
- Design a json schema to store the products and the rules, which ended up to be
```
{
  // list of all the products that can purchased
  "products": [
    { "code": "UpperSnakeCase String", "name": "String", "price": "Double" },
    ...
  ],
  // list of rules that need to be applied
  "rules": [
    {
      // There is a defined number of rules at config rules.js which can be used
      "ruleCode": "lowerCamelCase String",
      // Product's code which this rule applies
      "productCode": "TSHIRT",
      // additional constant variables that needs the rule
      "inputs": {...}
    },
    ...
  ]
}
```

- Add test for rules functions
- Design and implement the rule functions and define the input & output
  - Added a rule template function as a helper for new functions in the future
- Execute test and bug-fixing
- Add notes at test for service, just define because it's a simple service and it would require to much time to add the tests
- Implement the service, controller and router
- Add JSDoc to type input params at rules and service
- Test API with given cases

# Proposal improvements

- Rules: We're only considering one product per rule as the requiremnts consider 1 product as most. For scalability and more rule capabilities we should change it to be able to accept an array of products.

- Rules config: For a JSON like this it may be convenient to define some [jsonSchema schema](https://json-schema.org), for time constraints I'm adding this as a improvement.

- Rules config: If the changes are something really consistent it may be convenient to configure a database to store the products and rulse configuration so it's not required to restart the app to update the config each time.

- API Rest: Add test for proper error handling

- API Rest: add input validation with Joi

- Rules: It can be improved by using classes and inheritance, an interface or abstract classes so each rule extends/implements a predefined class/interface