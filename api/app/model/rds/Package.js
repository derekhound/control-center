module.exports = function(sequelize, DataTypes) {

  return sequelize.define('packages', {
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.TEXT
    },
    latest: {
      type: DataTypes.STRING
    },
    stable: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });

};

