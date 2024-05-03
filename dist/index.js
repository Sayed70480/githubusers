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
     <div class="name">
     <h3>${login}</h3>
     </div>
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
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = userName.value.toLocaleLowerCase();
    try {
        const url = `https://api.github.com/users`;
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchTerm);
        });
        // Clear previous content in main_container
        main_container.textContent = "";
        if (matchingUsers.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users Found</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
