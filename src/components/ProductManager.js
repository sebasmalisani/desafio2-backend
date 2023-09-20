import { promises as fs } from "fs";

export default class ProductManager {
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

// const productos = new ProductManager();

// productos.addProduct("Titulo1", "Description1", 1000, "url", "Codigo1", 501);
// productos.addProduct("Titulo2", "Description2", 1001, "url2", "Codigo2", 502);
// productos.addProduct("Titulo3", "Description3", 1002, "url3", "Codigo3", 503);
// productos.addProduct("Titulo4", "Description4", 1004, "url4", "Codigo4", 504);
// productos.addProduct("Titulo5", "Description5", 1005, "url5", "Codigo5", 505);
// productos.addProduct("Titulo6", "Description6", 1006, "url6", "Codigo6", 506);
// productos.addProduct("Titulo7", "Description7", 1007, "url7", "Codigo7", 507);
// productos.addProduct("Titulo8", "Description8", 1008, "url8", "Codigo8", 508);
// productos.addProduct("Titulo9", "Description9", 1009, "url9", "Codigo9", 509);
// productos.addProduct("Titulo10", "Description10", 1010, "url10", "Codigo10", 5010);


// productos.getProducts();

// productos.getProductsById(3)

// productos.deleteProductsById(2)

// productos.updateProducts({
//   title: "Titulo3",
//   description: "Description3",
//   price: 1500,
//   thumbnail: "url3",
//   code: "Codigo3",
//   stock: 503,
//   id: 3,
// });
