import mongoose from "mongoose";
import { Product } from "./src/models/product.js";
import { Category } from "./src/models/category.js";
import { categories, products } from "./seedData.js";
import { DATABASE_URI } from "./src/config/config.js";

async function seedDatabase() {
  try {
    await mongoose.connect(DATABASE_URI, { connectTimeoutMS: 30000 });
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoriesDocs = await Category.insertMany(categories);

    // Map category names to their IDs
    const categoryMap = categoriesDocs.reduce((map, category) => {
      map[category.name] = category._id; // map category name to ID
      return map;
    }, {});

    // Assign correct category ID to each product
    const productWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category], // look up ID by name
    }));

    await Product.insertMany(productWithCategoryIds);

    console.log("Data seeded successfully ✅");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
