import "./styles/normalize.css";
import "./styles/index.css";
import {
  getProducts,
  getProductByID,
  addNewProduct,
  deleteProductByID,
} from "./requests/products";
import {
  getMarkupProducts,
  getMarkupProductByID,
  getMarkupForNewProduct,
  getMarkupAllUsers,
} from "./services/markupService";
import {
  renderAllUsers,
  renderUsersByName,
  renderNewUser,
} from "./requests/users";
import { getListCartsByID } from "./requests/carts";
import {
  getAllPostsById,
  renderPostsByKeyWord,
  renderAllPostsWidthUpdate,
} from "./requests/posts";

//getMarkupProducts();
//getMarkupProductByID();
//addNewProduct();
//deleteProductByID();
// renderAllUsers();
//renderUsersByName();
//getAllCarts();
//getListCartsByID();
//getAllPostsById();
//getListAllUsers();
//renderNewUser();
//renderPostsByKeyWord();
renderAllPostsWidthUpdate();
