const mongoose = require("mongoose");

/**
 *  Create mongoose collection here
 *  We naming it as - BasisBackend
 */
const dbName = "BasisBackend";

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
  useNewUrlParser: true,
  // cuseCreateIndex: true,
  useUnifiedTopology: true,
});
