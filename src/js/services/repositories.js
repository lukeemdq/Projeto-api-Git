
import { baseUrl, repositoriesQuantity } from "../variables.js";

async function repos(userName) {
  const response = await fetch(
    `${baseUrl}${userName}/repos?per_page=${repositoriesQuantity}`
  );
  return response.json();
}

export {repos};