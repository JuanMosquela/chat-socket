import { Router } from "express";
import { saveProducts } from "../helpers/products-helpers";
import Product from "../db/models/productSchema";
const router = Router();

router.get("/", async (req, res) => {
  const productos = await Product.find({});
  if (!productos) return res.json({ msg: "no hay productos actualmente" });

  res.json({
    productos,
  });
});

router.post("/productos-test", async (req, res) => {
  const { cantidad = 15 } = req.query;

  await saveProducts(cantidad);
  await Product.save();

  res.json({
    saveProducts,
  });
});

export default router;
