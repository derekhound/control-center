module.exports = function(sequelize, DataTypes) {

  return sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    environment_id: {
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

