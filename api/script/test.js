var api = require('../system/index')(run);

function run(api, Sequelize)
{
  Sequelize
  .sync({force: false})
  .then(function() {
    var User = api.model.rds.User;
    return User.create({
      email: 'derekhound@gmail.com',
      password: '$2a$10$jpIkBeAF04EfZ9UikLEN8OrjqDhbYo1Tjv5relqu6CG538091kyiO'
    });
  })
  .finally(function() {
    process.exit();
  });
}

