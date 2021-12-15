const express = require("express");
require("./db/mongoose");

// Initialize routers here
const signupRouter = require("./routers/user.signup");
const loginRouter = require("./routers/user.login");
const timelineRouter = require("./routers/timeline");

// Initialize our app
const app = express();

// Port where we want to run
const port = process.env.port || 3000;

app.use(express.json());
app.use(signupRouter);
app.use(loginRouter);
app.use(timelineRouter);

// Start listening to the server
app.listen(port, () => {
    console.log(`Server is running at: ${port}`);
});
