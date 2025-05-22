import { baseUrl } from "../variables.js";

async function user(userName) {
  const response = await fetch(`${baseUrl}${userName}`);
  return response.json();
}

export {user};