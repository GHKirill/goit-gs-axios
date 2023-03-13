import { instance } from "../services/api";
import { markupUsers, getMarkupNewUser } from "../services/markupService";

// get all users

export async function getListAllUsers() {
  const { data } = await instance.get("/users");
  console.log(data.users);
  return data.users;
}
export async function getListUsersByName(inputName) {
  const { data } = await instance.get("/users/filter", {
    params: {
      key: "firstName",
      value: `${inputName}`,
    },
  });
  console.log(data.users);
  return data.users;
}

async function renderAllUsers() {
  const listOfAllUsers = await getListAllUsers();
  document.querySelector("#allUsers").innerHTML = markupUsers(listOfAllUsers);
}
// get users by name
async function renderUsersByName() {
  const refFormAllUsersByName = document.querySelector("#userByNameForm");
  refFormAllUsersByName.addEventListener("submit", getUsersListByCurrentName);
  async function getUsersListByCurrentName(event) {
    event.preventDefault();
    const nameInput = event.target.name.value;
    // const listOfAllUsers = await getListAllUsers();
    // const listOfUsersWithCurrentName = listOfAllUsers.filter(
    //   ({ firstName }) => firstName === nameInput
    // );
    const listOfUsersWithCurrentName = await getListUsersByName(nameInput);
    console.log(listOfUsersWithCurrentName);
    document.querySelector("#usersByName").innerHTML = markupUsers(
      listOfUsersWithCurrentName
    );
    event.target.reset();
  }
}

// add new user

async function addNewUser(body) {
  const { data: newUser } = await instance.post("/users/add", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(newUser);
  return newUser;
}
async function renderNewUser() {
  const refFormRenderNewUser = document.querySelector("#addNewUserForm");
  refFormRenderNewUser.addEventListener("submit", submitFormRenderNewUser);
  async function submitFormRenderNewUser(event) {
    event.preventDefault();
    const formNewUser = new FormData(refFormRenderNewUser);
    const newUserPost = {};
    for (let [key, value] of formNewUser) {
      console.log(`${key} - ${value}`);
      newUserPost[key] = value;
    }
    const newUserGet = await addNewUser(newUserPost);
    getMarkupNewUser(newUserGet);
  }
}

export { renderAllUsers, renderUsersByName, renderNewUser };
