// default
//   - auth: true


exports.default = {

  UserRoute: [
    // REST APIs
    {method: 'get',       path: '/api/1/users',             action: 'queryUsers'},
    {method: 'get',       path: '/api/1/users/:user_id',    action: 'getUser'},
    {method: 'post',      path: '/api/1/users',             action: 'createUser',       auth: false},
    {method: 'put',       path: '/api/1/users/:user_id',    action: 'updateUser'},
    {method: 'delete',    path: '/api/1/users/:user_id',    action: 'deleteUser'},

    // NON-REST APIs
    {method: 'post',      path: '/api/1/login',             action: 'login',            auth: false},
    {method: 'post',      path: '/api/1/logout',            action: 'logout'}
  ],

  ProductRoute: [
    // REST APIs
    {method: 'get',       path: '/api/1/products',                        action: 'queryProducts'},
    {method: 'get',       path: '/api/1/products/:product_id',            action: 'getProduct'},
    {method: 'post',      path: '/api/1/products',                        action: 'createProduct'},
    {method: 'put',       path: '/api/1/products/:product_id',            action: 'updateProduct'},
    {method: 'delete',    path: '/api/1/products/:product_id',            action: 'deleteProduct'}
  ],

  EnvironmentRoute: [
    // REST APIs
    {method: 'get',       path: '/api/1/environments',                    action: 'queryEnvironments'},
    {method: 'get',       path: '/api/1/environments/:environment_id',    action: 'getEnvironment'},
    {method: 'post',      path: '/api/1/environments',                    action: 'createEnvironment'},
    {method: 'put',       path: '/api/1/environments/:environment_id',    action: 'updateEnvironment'},
    {method: 'delete',    path: '/api/1/environments/:environment_id',    action: 'deleteEnvironment'}
  ],
/*
  RoleRoute: [
    // REST APIs
    {method: 'get',       path: '/api/1/roles',                           action: 'queryRoles'},
    {method: 'get',       path: '/api/1/roles/:role_id',                  action: 'getRole'},
    {method: 'post',      path: '/api/1/roles',                           action: 'createRole'},
    {method: 'put',       path: '/api/1/roles/:role_id',                  action: 'updateRole'},
    {method: 'delete',    path: '/api/1/roles/:role_id',                  action: 'deleteRole'}
  ],
*/
};