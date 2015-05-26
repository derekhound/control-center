module.exports = function(api) {

  var User        = api.model.rds.User;
  var Product     = api.model.rds.Product;
  var Environment = api.model.rds.Environment;
  var Role        = api.model.rds.Role;
  var Package     = api.model.rds.Package;

  //------------------------------
  // User
  //------------------------------

  //------------------------------
  // Product
  //------------------------------

  Product.hasMany(Environment, {
    as: 'environment',
    foreignKey: {
      fieldName: 'product_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Product.hasMany(Package, {
    as: 'package',
    foreignKey: {
      fieldName: 'package_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // Environment
  //------------------------------

  Environment.hasMany(Role, {
    as: 'role',
    foreignKey: {
      fieldName: 'role_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // Role
  //------------------------------


  //------------------------------
  // Package
  //------------------------------

};

