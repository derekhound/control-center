module.exports = function(sequelize, DataTypes) {

  return sequelize.define('environment', {
    environment_id: {
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
    desc: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });

};

