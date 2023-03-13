import { instance } from "../services/api";
import { getMarkupCardsByID } from "../services/markupService";

async function getAllCarts() {
  const cartsList = await instance.get("/carts");
  return cartsList.data.carts;
}
async function getListCartsByID() {
  const refFormGetCardsByID = document.querySelector("#userCartsForm");
  refFormGetCardsByID.addEventListener("submit", submitFormGetCartsByID);
  async function submitFormGetCartsByID(event) {
    event.preventDefault();
    const inputId = event.target.userId.value;
    const listAllCarts = await getAllCarts();
    const listCartsCurrentId = listAllCarts.filter(
      (item) => item.id == inputId
    );
    if (listCartsCurrentId.length == 0) {
      console.log("There is no such id");
      return;
    }
    document.querySelector("#carts").innerHTML = getMarkupCardsByID(
      listCartsCurrentId[0].products
    );
  }
}

//getAllCarts();
export { getListCartsByID };
