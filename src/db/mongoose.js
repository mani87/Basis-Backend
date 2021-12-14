import { connect } from "mongoose";

/**
 *  Create mongoose collection here
 *  We naming it as - BasisBackend
 */
const dbName = "BasisBackend";

connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true,
    // cuseCreateIndex: true,
    useUnifiedTopology: true,
});
