import { instance } from "../services/api";
import {
  getMarkupProductByID,
  getMarkupForNewProduct,
} from "../services/markupService";

async function getProducts() {
  const { data } = await instance(`/products`);
  return data.products;
}
async function getProductByID(id) {
  const product = await instance(`/products/${id}`);
  return product.data;
}
const refSingleProductForm = document.querySelector("#singleProductForm");
refSingleProductForm.addEventListener("submit", getIdFromSingleForm);
function getIdFromSingleForm(event) {
  event.preventDefault();
  const value = refSingleProductForm.id.value;
  getMarkupProductByID(value);
  event.target.reset();
}
// add new product
async function addProduct(product) {
  const headers = {
    // method: "POST",
    "Content-Type": "application/json",
  };
  const newProduct = await instance.post("/products/add", product, headers);
  return newProduct;
}

async function addNewProduct() {
  const refFormPostNewProduct = document.querySelector("#task3");
  refFormPostNewProduct.addEventListener("submit", submitNewProduct);
  async function submitNewProduct(event) {
    event.preventDefault();
    console.log("probe");
    const title = event.target.title.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const { data: newProduct } = await addProduct({
      title,
      description,
      price,
    });
    getMarkupForNewProduct(newProduct);
    //console.log(newProduct);
    return newProduct;
  }
}

//delete product

async function deleteProduct(id) {
  try {
    const deleteProduct = await instance.delete(`/products/${id}`);
    alert("SUCCESS");
    console.log(deleteProduct);
  } catch (error) {
    console.log(error.message);
  }
}
function deleteProductByID() {
  const refFormDeleteProduct = document.querySelector("#deletionProductForm");
  refFormDeleteProduct.addEventListener("submit", submitDeleteProduct);
  function submitDeleteProduct(event) {
    event.preventDefault();
    const id = event.target.deletionId.value;
    deleteProduct(id);
  }
}

export { getProducts, getProductByID, addNewProduct, deleteProductByID };
