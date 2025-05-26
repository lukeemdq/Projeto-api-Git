import { getUser } from "./services/user.js";
import { repos } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";



const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

btnSearch.addEventListener("click", () => {
  const userName = inputSearch.value;
  if(validateInput(userName)) return
  getUserData(userName);

  
});


function validateInput(userName) {
   if (userName.length === 0 ) {
    alert('preencha o campo com o nome do usuário do GitHub')
    return true
  }
}

inputSearch.addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if(validateInput(userName)) return
    getUserData(userName);   
  }
});

async function getUserData(userName) {

  const useResponse = await getUser(userName);
  if(useResponse.message === "Not Found") {
    screen.renderNotFound()
  } else {
const repositoriesReponse = await repos(userName)
const eventsResponse = await getEvents(userName)
  user.setInfo(useResponse)
  user.setRepositories(repositoriesReponse)
  user.setEvents(eventsResponse)
  screen.renderUser(user)
  // console.log(eventsResponse)
  }
  
  // user.repositories(repositories)


  
  
}



