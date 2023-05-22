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

// GET /blog-posts/new
router.get("/new", (req, res) => {
  res.render("blogs/new");
});

// GET /blog-posts/:id
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

// POST /blog-posts
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.body);
    console.log(`Title : ${title}`);
    console.log(`Content : ${content}`);
    const blogPost = await BlogPost.create({ title, content });
    res.redirect(`/${blogPost.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /blog-posts/:id/edit
router.get("/:id/edit", async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      res.status(404).send("Blog Post Not Found");
    } else {
      res.render("blog-posts/edit", { blogPost });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /blog-posts/:id
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
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      res.status(404).send("Blog Post Not Found");
    } else {
      await blogPost.destroy();
      res.redirect("/blog-posts");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
