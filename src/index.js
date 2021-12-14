const express = require('express');

// Initialize routers here
const signupRouter = require('./routers/signup');
const loginRouter = require('./routers/login');

// Initialize our app
const app = express();

// Port where we want to run
const port = process.env.port || 3000;

app.use(express.json());
app.use(signupRouter);
app.use(loginRouter);

// Start listening to the server
app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
})