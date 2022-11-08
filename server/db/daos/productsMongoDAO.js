import { MongoClass } from "../contenedores/mongoClass.js";
import { productsModel as Product } from "../models/products.js";
import { mockProducts } from "../../utils/mocks.js";

class ProductsMongoDAO extends MongoClass {
  constructor() {
    super(Product);
  }

  async save(cant) {
    const productResponse = [];
    for (let i = 1; i <= cant; i++) {
      const mockProduct = mockProducts();
      const productCreated = await this.create(mockProduct);
      productResponse.push(productCreated);
    }
    return productResponse;
  }
}

export default ProductsMongoDAO;
