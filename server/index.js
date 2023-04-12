import express from "express";
import mongoose from "mongoose";
import PostModel from "./models/Post.js";
import CategoryModel from "./models/Category.js";
import cors from "cors";
import adminRouter from "./router/admin-routes.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
const PORT = 3335;

mongoose
  .connect(
    "mongodb+srv://admin:admin04@cluster0.egiwh0f.mongodb.net/post?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));


app.post("/api/post/add", async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      images: req.body.images,
    });
    const post = await doc.save();
    const { ...postData } = post._doc;
    res.json({ ...postData });
  } catch (err) {
    console.log("Не удалось создать продукции");
    res.status(500).json({ message: "Не удалось создать продукции" });
  }
});

app.patch("/api/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        images: req.body.images,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить продукция",
    });
  }
});
app.delete("/api/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    res.json({ message: "Пост успешно удален" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при удалении поста" });
  }
});
app.get("/api/post", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    console.log("Не удалось получить продукции");
    res.status(500).json({ message: "Не удалось получить продукции" });
  }
});
app.post("/api/category/add", async (req, res) => {
  try {
      const doc = new CategoryModel({
          category: req.body.category
      })
      const post = await doc.save()
      const { ...postData } = post._doc
      res.json({ ...postData })
  } catch (err) {
      console.log(err)
      res.status(500).json({
          message: "Не удалось создать продукция"
      })
  }
})
app.patch("/api/category/:id", async (req, res) => {
  try {
      const categoryId = req.params.id
      await CategoryModel.updateOne(
          { _id: categoryId },
          { category: req.body.category }
      )
      res.json(success)
  } catch (err) {
      console.log(err)
      res.status(500).json({
          message: "Не удалось обновить продукция"
      })
  }
})

app.delete("/api/category/:id", async (req, res) => {
  try {
      const category = await CategoryModel.findByIdAndDelete({ _id: req.params.id })
      res.json(category)
  } catch (err) {
      console.log(err)
  }
})

app.get("/api/category", async (req, res) => {
  try {
      const category = await CategoryModel.findById()
      res.json(category)
  } catch (err) {
      console.log(err)
  }
})

app.use("/admin",adminRouter)

app.listen(PORT, () => {
  console.log`('Port'${PORT})`;
});