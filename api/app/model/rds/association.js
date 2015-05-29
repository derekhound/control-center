module.exports = function(api) {

  var User              = api.model.rds.User;
  var Product           = api.model.rds.Product;
  var Environment       = api.model.rds.Environment;
  var Role              = api.model.rds.Role;
  var Package           = api.model.rds.Package;
  var PackageVersion    = api.model.rds.PackageVersion;
  var RolePackage       = api.model.rds.RolePackage;

  //------------------------------
  // User
  //------------------------------

  //------------------------------
  // Product
  //------------------------------

  Product.hasMany(Environment, {
    as: 'environments',
    foreignKey: {
      fieldName: 'product_id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Product.hasMany(Package, {
    as: 'packages',
    foreignKey: {
      fieldName: 'product_id',
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
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Environment.hasMany(Role, {
    as: 'roles',
    foreignKey: {
      fieldName: 'environment_id',
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
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Role.hasMany(RolePackage, {
    as: 'role_packages',
    foreignKey: {
      fieldName: 'role_id',
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
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Package.hasMany(PackageVersion, {
    as: 'package_versions',
    foreignKey: {
      fieldName: 'package_id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // PackageVersion
  //------------------------------

  PackageVersion.belongsTo(Package, {
    as: 'package',
    foreignKey: {
      fieldName: 'package_id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // RolePackage
  //------------------------------

  RolePackage.belongsTo(Role, {
    as: 'role',
    foreignKey: {
      fieldName: 'role_id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

};

