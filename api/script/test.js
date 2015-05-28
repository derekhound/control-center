var _ = require('lodash');

function run(api, Sequelize)
{
  Sequelize
  .sync({force: true})
  .then(function() {
    var User = api.model.rds.User;
    return User.create({
      email: 'derekhound@gmail.com',
      password: '$2a$10$jpIkBeAF04EfZ9UikLEN8OrjqDhbYo1Tjv5relqu6CG538091kyiO'
    });
  })
  .then(function() {
    var Product = api.model.rds.Product;
    return Product.create({
      name: 'p1'
    });
  })
  .then(function() {
    var Environment = api.model.rds.Environment;
    return Environment.create({
      product_id: 1,
      name: 'e1'
    });
  })
  .then(function() {
    var Environment = api.model.rds.Environment;
    return Environment.create({
      product_id: 1,
      name: 'e2'
    });
  })
  /*
  .then(function() {
    var Product = api.model.rds.Product;
    var Environment = api.model.rds.Environment;
    return Product.findAll({
      where: {
        product_id: 1
      },
      include:
        [{model: Environment, as: 'environment'}]
    })
    .then(function(rows) {
      _.forEach(rows, function(row) {
        console.log(row.environment);
      });
    });
  })
  */
  /*
  .then(function() {
    var Product = api.model.rds.Product;
    var Environment = api.model.rds.Environment;
    return Environment.findAll({
      where: {
        product_id: 1
      },
      include:
        [{model: Product, as: 'product'}]
    })
    .then(function(rows) {
      _.forEach(rows, function(row) {
        console.log("=================================");
        console.log(row.product);
      });
    });
  })
  */

  .catch(function(err) {
    console.log(err.message);
  })
  .finally(function() {
    process.exit();
  });
}
//------------------------------
// setup system
//------------------------------
var api = require('../system')({
  appName: 'test'
});
api.container.resolve(run);

