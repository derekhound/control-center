module.exports = function(api, ProductService) {

  function login(req, res)
  {
    var email       = req.body.email;
    var password    = req.body.password;
    var token       = req.body.token;

    // login
    if (!token) {
      ProductService.login(email, password)
      // success
      .then(function(user) {
        var result = {
          success: true,
          item: user
        };
        res.send(result);
      })
      // fail
      .catch(function(err) {
        res.send({success: false, message: err.message});
      });
    // login auto
    } else {
      ProductService.loginAuto(token)
      // success
      .then(function(user) {
        var result = {
          success: true,
          item: user
        };
        res.send(result);
      })
      // fail
      .catch(function(err) {
        res.send({success: false, message: err.message});
      });
    }
  }

  function logout(req, res)
  {
  }

  function queryProducts(req, res)
  {
    ProductService.queryProducts()
    // success
    .then(function(products) {
      var result = {
        success: true,
        count: products.length,
        items: products
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function createProduct(req, res)
  {
    var name = req.body.name;
    var desc = req.body.desc;

    ProductService.createProduct(name, desc)
    // success
    .then(function(product) {
      var result = {
        success: true
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function getProduct(req, res)
  {
  }

  function updateProduct(req, res)
  {
  }

  function deleteProduct(req, res)
  {
    var product_id = req.params.product_id;

    ProductService.deleteProduct(product_id)
    // success
    .then(function() {
      var result = {
        success: true
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  return {
    queryProducts: queryProducts,
    createProduct: createProduct,
    getProduct:    getProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
  };
};

