// setup system
var api = require('../system')({
  appName: 'build-package'
});
api.container.resolve(run);


function run(api)
{
  console.log('-------------------------');
  console.log(api.config);
}
