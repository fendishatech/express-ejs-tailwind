const router = require("express").Router();
const BlogPost = require("../models/blog.model");

// GET /blog-posts
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogPost.findAll();
    res.render("blogs/index", { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /new
router.get("/new", (req, res) => {
  res.render("blogs/new");
});

// GET /:id
router.get("/:id", async (req, res) => {
  try {
    const blog = await BlogPost.findByPk(req.params.id);
    if (!blog) {
      res.status(404).send("Blog Post Not Found");
    } else {
      res.render("blogs/show", { blog });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await BlogPost.create({ title, content });
    console.log("Blog id :", blog.id);
    return res.redirect(`/${blog.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /:id/edit
router.get("/:id/edit", async (req, res) => {
  try {
    const blog = await BlogPost.findByPk(req.params.id);
    if (!blog) {
      res.status(404).send("Blog Post Not Found");
    } else {
      res.render("blogs/edit", { blog });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      res.status(404).send("Blog Post Not Found");
    } else {
      await blogPost.update({ title, content });
      res.redirect(`/blog-posts/${blogPost.id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /blog-posts/:id
router.delete("/:id", async (req, res) => {
  console.log("Id :", req.params.id);
  try {
    const blog = await BlogPost.findByPk(req.params.id);
    console.log("Blog :", blog);
    if (!blog) {
      res.status(404).send("Blog Post Not Found");
    } else {
      await blog.destroy();
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
