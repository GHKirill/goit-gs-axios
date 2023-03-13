import { instance } from "../services/api";
import {
  getMarkupPostsById,
  getMarkupPosts,
  getMarkupFormForPosts,
} from "../services/markupService";

async function getAllPosts() {
  const { data } = await instance.get("/posts");
  console.log(data.posts);
  return data.posts;
}
async function getAllPostsById() {
  const refRenderedFilteredPosts = document.querySelector("#posts");
  const refFormGetAllPostsById = document.querySelector("#userPostsForm");
  refFormGetAllPostsById.addEventListener("submit", submitFormGetAllUsersById);
  async function submitFormGetAllUsersById(event) {
    event.preventDefault();
    const inputId = event.target.userId.value;
    const allPosts = await getAllPosts();
    const filteredPosts = allPosts.filter((item) => item.userId == inputId);
    if (filteredPosts.length == 0) {
      console.log("There is no posts by this Id");
      refRenderedFilteredPosts.innerHTML = "";
      return;
    }
    refRenderedFilteredPosts.innerHTML = getMarkupPostsById(filteredPosts);
  }
}

async function getPostKeyWord(keyWord) {
  const { data } = await instance.get("/posts/search", {
    params: {
      q: keyWord,
    },
  });
  return data.posts;
}
async function renderPostsByKeyWord() {
  const refFormFiltered = document.querySelector("#filteredPostsForm");
  refFormFiltered.addEventListener("submit", submitFormFiltered);
  async function submitFormFiltered(event) {
    event.preventDefault();
    const inputKeyWord = event.target.keyword.value;
    const filteredPosts = await getPostKeyWord(inputKeyWord);
    document.querySelector("#filteredPosts").innerHTML =
      getMarkupPostsById(filteredPosts);
  }
}

async function renderAllPostsWidthUpdate() {
  const allPosts = await getAllPosts();
  document.querySelector("#allPosts").innerHTML = getMarkupPosts(allPosts);
  createFormPostChange();
}

async function updatePost(id, body) {
  const { data } = await instance.patch(`/post/${id}`, body);
  console.log(data);
  return data;
}

function getValuesForPostForm([...listTargetPost]) {
  const listPostValues = {};
  listTargetPost.forEach((item) => {
    const postValues = item.textContent.split(": ");
    listPostValues[postValues[0]] = postValues[1];
  });
  return listPostValues;
}
function changeCurrentPost({ choosenPost, refTargetList }) {
  const refFormChangePost = document.querySelector("#formChangePost");
  refFormChangePost.addEventListener("submit", submitChangesCurrentPost);
  async function submitChangesCurrentPost(event) {
    event.preventDefault();
    const form = new FormData(refFormChangePost);
    const newPost = {};
    for (let [key, value] of form) {
      console.log(`${key} - ${value}`);
      newPost[key] = value;
    }
    const newPostForRender = await updatePost(choosenPost.id, newPost);
    console.log("post for render", newPostForRender);
    refTargetList.outerHTML = getMarkupPosts([newPostForRender]);
  }
}

async function createFormPostChange() {
  const refPostsList = document.querySelector("#allPosts");
  refPostsList.addEventListener("click", postsListOnClick);
  function postsListOnClick(event) {
    if (!event.target.hasAttribute("data-changePost")) return;
    const refTargetList = event.target.closest("ul");
    const listTargetPost = refTargetList.querySelectorAll("li");
    const choosenPost = getValuesForPostForm(listTargetPost);
    const formForCurrentPost = getMarkupFormForPosts(choosenPost);
    refTargetList.insertAdjacentHTML("beforeend", formForCurrentPost);
    changeCurrentPost({ choosenPost, refTargetList });
  }
}

export {
  getAllPosts,
  getAllPostsById,
  renderPostsByKeyWord,
  renderAllPostsWidthUpdate,
};
