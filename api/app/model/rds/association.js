module.exports = function(api) {

  var User              = api.model.rds.User;
  var Product           = api.model.rds.Product;
  var Environment       = api.model.rds.Environment;
  var Role              = api.model.rds.Role;
  var Package           = api.model.rds.Package;
  var PackageVersion    = api.model.rds.Package;

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
      fieldName: 'product_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // Environment
  //------------------------------

  Environment.belongsTo(Product, {
    as: 'product',
    foreignKey: {
      fieldName: 'product_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Environment.hasMany(Role, {
    as: 'role',
    foreignKey: {
      fieldName: 'environment_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // Role
  //------------------------------

  Role.belongsTo(Environment, {
    as: 'environment',
    foreignKey: {
      fieldName: 'environment_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });


  //------------------------------
  // Package
  //------------------------------

  Package.belongsTo(Product, {
    as: 'product',
    foreignKey: {
      fieldName: 'product_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  /*
  Package.hasMany(PackageVersion, {
    as: 'package_version',
    foreignKey: {
      fieldName: 'package_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });
  */
  //------------------------------
  // PackageVersion
  //------------------------------

  /*
  PackageVersion.belongsTo(Package, {
    as: 'package',
    foreignKey: {
      fieldName: 'package_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });
  */
};

