import {
  getProducts,
  getProductByID,
  addNewProduct,
} from "../requests/products";
import { getListAllUsers } from "../requests/users";

//   get markup products
async function getMarkupProducts() {
  const products = await getProducts();

  const productsMarkup = products.reduce(
    (
      acc,
      { title, description, price, rating, stock, brand, category, images }
    ) =>
      acc +
      `<li><h3>${title}</h3><p>${description}</p><p>${price}</p><p>${rating}</p><p>${stock}</p><p>${brand}</p><p>${category}</p><img src=${images[0]} width=200/>></li>`,
    ``
  );
  document.querySelector("#allProducts").innerHTML = productsMarkup;
}

// get markup product by id
async function getMarkupProductByID(id) {
  const { title, description, price, rating, stock, brand, category, images } =
    await getProductByID(id);
  const productMarkup = `<li>${title}</li><li>${description}</li><li>${price}</li><li>${rating}</li><li>${stock}</li><li>${brand}</li><li>${category}</li><img src=${images[0]} width=200/>`;
  document.querySelector("#singleProduct").innerHTML = productMarkup;
}

//add new product

async function getMarkupForNewProduct(newProduct) {
  console.log(newProduct);
  const markupForNewProduct = `<h2>${newProduct.title}</h2><p>${newProduct.description}</p><p>${newProduct.price}</p>`;
  document.querySelector("#newProductSection").innerHTML = markupForNewProduct;
}

//get all users

function markupUsers(users) {
  return users.reduce(
    (acc, { firstName, lastName, age, birthDate, email }) =>
      acc +
      `<ul><li>${firstName}</li><li>${lastName}</li><li>${age}</li><li>${birthDate}</li><li>${email}</li></ul>`,
    ``
  );
}
function getMarkupCardsByID(carts) {
  return carts.reduce((acc, item) => acc + `<li>${item.title}</li>`, ``);
}

function getMarkupPostsById(posts) {
  return posts.reduce(
    (acc, { title, body }) => acc + `<li><h2>${title}</h2><p>${body}</p></li>`,
    ``
  );
}
function getMarkupNewUser({ firstName, lastName, email, password }) {
  const markupNewUser = `<h3>name - ${firstName}</h3><p>lastName - ${lastName}</p><p>email - ${email}</p><p>password- ${password}</p>`;
  document.querySelector("#newUserSection").innerHTML = markupNewUser;
}
function getMarkupPosts(posts) {
  return posts.reduce(
    (acc, { id, reactions, tags, title, userId, body }) =>
      acc +
      `<ul id='id${id}'><li>id: ${id}</li><li>reactions: ${reactions}</li><li>tags: ${tags.join(
        ", "
      )}</li><li>title: ${title}</li><li>userId: ${userId}</li><li>body: ${body}</li><button type='button' data-changePost>Change this Post </button></ul>`,
    ``
  );
}
function getMarkupFormForPosts({ id, reactions, tags, title, userId, body }) {
  const formForPost = `<form id='formChangePost'><label for='title'>Change title</label><input type='text' id='title' name='title'/><label for='body'>Change post's body</label><input type='text' id='body' name='body'/><button type="submit">Change current post</button></form>`;
  return formForPost;
}
export {
  getMarkupProducts,
  getMarkupProductByID,
  getMarkupForNewProduct,
  markupUsers,
  getMarkupCardsByID,
  getMarkupPostsById,
  getMarkupNewUser,
  getMarkupPosts,
  getMarkupFormForPosts,
};
