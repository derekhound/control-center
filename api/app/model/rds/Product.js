module.exports = function(sequelize, DataTypes) {

  return sequelize.define('product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

