module.exports = function(sequelize, DataTypes) {

  var Model = sequelize.define('role_package', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    version: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: false
  });

  Model.removeAttribute('id');

  return Model;
};

