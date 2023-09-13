const routerAuth = require("./auth.router"); 
const routerUsers = require("./user.router");
const createRouters = (app) => {
  app.use("/api/v1/auth", routerAuth);
 
  app.use("/api/v1/users", routerUsers);
  
};

module.exports = createRouters;
