import express, { json } from "express";
import "./db/mongoose";

// Initialize routers here
import signupRouter from "./routers/signup";
import loginRouter from "./routers/login";

// Initialize our app
const app = express();

// Port where we want to run
const port = process.env.port || 3000;

app.use(json());
app.use(signupRouter);
app.use(loginRouter);

// Start listening to the server
app.listen(port, () => {
    console.log(`Server is running at: ${port}`);
});
