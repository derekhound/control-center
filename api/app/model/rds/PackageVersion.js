module.exports = function(sequelize, DataTypes) {

  var Model = sequelize.define('package_version', {
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    version: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    dependencies: {
      type: DataTypes.TEXT,
      set: function(val) {
        this.setDataValue('dependencies', JSON.stringify(val));
      },
      get: function() {
        var dependencies = this.getDataValue('dependencies');
        return JSON.parse(dependencies);
      }
    },
    url: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true
  });

  Model.removeAttribute('id');

  return Model;
};

