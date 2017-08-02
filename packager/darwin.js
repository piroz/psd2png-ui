const packager = require("electron-packager");  
const config = require("./config.js");
config.platform = "darwin";

packager(config, function done (err, appPath) {
  if(err) {
    throw new Error(err);
  }
  console.log("Done!!");
});
