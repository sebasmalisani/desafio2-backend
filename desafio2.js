import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;

    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("Producto no Encontrado");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };

  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((productos) => productos.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado");
  };

  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts()
    let productsModif = [{ ...producto, id }, ...productOld]
    await fs.writeFile(this.patch, JSON.stringify(productsModif)); 
  };
}

const productos = new ProductManager();

// productos.addProduct("Titulo1", "Description1", 1000, "url", "Codigo1", 501);
// productos.addProduct("Titulo2", "Description2", 1001, "url2", "Codigo2", 502);
// productos.addProduct("Titulo3", "Description3", 1002, "url3", "Codigo3", 503);

// productos.getProducts();

// productos.getProductsById(3)

// productos.deleteProductsById(2)

productos.updateProducts({
  title: "Titulo3",
  description: "Description3",
  price: 1500,
  thumbnail: "url3",
  code: "Codigo3",
  stock: 503,
  id: 3,
});
