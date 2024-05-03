"use strict";
const userName = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network Response was not ok - status : ${response.status}`);
    }
    const data = await response.json();
    return data;
}
function showResultUI(singleUser) {
    const { location, login, avatar_url, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `
      <div class="card">
        <img src="${avatar_url}" alt="${login}"/> <!-- Inserting user avatar image -->
        <hr/> <!-- Horizontal line -->
        <div class="footer">
          <img src="${avatar_url}" alt="${login}" class="small-img"/> <!-- Inserting user avatar image again -->
          <a href="${url}"> GitHub </a> <!-- Link to user's GitHub profile -->
        </div>
      </div>
      `);
}
async function fetchUserData(url) {
    try {
        const userinfo = await myCustomFetcher(url, {});
        for (const singleUser of userinfo) {
            showResultUI(singleUser);
        }
    }
    catch (error) {
        console.error("Error fetching user data:", error);
    }
}
fetchUserData("https://api.github.com/users");
formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
});
