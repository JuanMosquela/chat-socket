import Product from "../db/models/productSchema";
import mockProducts from "../utils/mocks";

export const saveProducts = async (cantidad) => {
  const arrayProducts = -[];

  for (let i = 0; i < cantidad; i++) {
    const product = mockProducts();
    const productCreated = await new Product(product);
    arrayProducts.push(productCreated);
  }

  return arrayProducts;
};
