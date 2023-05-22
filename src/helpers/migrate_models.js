const BlogPost = require("../models/blog.model");

// DEV
const migrate_tables = async () => {
  try {
    await BlogPost.sync();
    console.log("Table Migrated Successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = migrate_tables;
