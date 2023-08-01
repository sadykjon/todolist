import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { registerValidation, loginValidation } from "./validation.js";
import { handleValidation, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";
// import path from "path";
import adminRouter from "./router/admin-routes.js";
// import PostModel from "./models/Post.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.gi36od3.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Ya rabotau"))
  .catch((err) => console.log("DB ERROR", err));


// users route
app.post(
  "/api/v1/users/register",
  
  registerValidation,
  handleValidation, 
  UserController.register
);

app.post(
  "/api/v1/users/login",
  loginValidation,
  handleValidation,
  UserController.login
);
app.get("/api/v1/users/me", checkAuth, UserController.getMe);

// admin panel route
app.use("/admin", adminRouter);

// post panel routes
app.post("/api/v1/post/add",  PostController.createPost);
app.get("/api/v1/post", PostController.getPost);
app.get("/api/v1/post/all", PostController.getAllPost);
app.delete("/api/v1/post/delete/:id", PostController.deletePost);
app.patch("/api/v1/post/update/:id", PostController.updatePost);
app.get("/api/v1/post/:id", PostController.getPostById);

// app.patch("/api/v1/post/update/:id",  PostController.update)



const PORT = 5500;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
}); 
