var _             = require('lodash');
var Promise       = require('bluebird');

module.exports = function(api, Sequelize) {

  var Product = api.model.rds.Product;

  /**
   * Query products
   *
   * @promise {product[]} - An array of product objects
   */
  function queryProducts()
  {
    var options = {
      order: [
        ['name', 'ASC']
      ]
    };
    return Product.findAll(options, {raw: true});
  }

  /**
   * Create a product
   *
   * @param {string} name
   * @param {string} desc - description
   * @promise {product} - A product model instance
   */
  function createProduct(name, desc)
  {
    // get product
    return Product.findOne({
      where: {
        name: name
      }
    }, {raw: true})
    .then(function(row) {
      // product exists
      if (row) {
        throw new Error('This product name has been used');
      }

      // create product
      return Product.create({
        name: name,
        desc: desc
      });
    });
  }

  function getProduct()
  {
  }

  function updateProduct(product_id)
  {
  }

  /**
   * Delete a product
   *
   * @param {number} product_id
   * @promise {undefined}
   */
  function deleteProduct(product_id)
  {
    return Product.destroy({
      where: {
        product_id: product_id
      }
    });
  }

  // interface
  return {
    queryProducts: queryProducts,
    createProduct: createProduct,
    getProduct:    getProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
  };
};

