const addbtn = document.getElementById("addbtn");
const deletebtn = document.getElementById("deletebtn")
let websites = [];

function getWebsite() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["websites"], function (result) {
      resolve(result.websites || []);
    });
  });
}

window.addEventListener("load", async function () {
  websites = await getWebsite();
  console.log(websites)
  loadWebsites();
});

addbtn.addEventListener("click", function () {
  const website = document.getElementById("addwebsite").value;
  websites.push(website);
  chrome.storage.local.set({ websites });
  loadWebsites();
});


deletebtn.addEventListener("click", function () {
    const websiteToDelete = document.getElementById("addwebsite").value;
    const websiteIndex = websites.indexOf(websiteToDelete);
    if (websiteIndex > -1) {
      websites.splice(websiteIndex, 1);
      chrome.storage.local.set({ websites });
      loadWebsites();
    }
  });


function loadWebsites() {
  const container = document.getElementById("websitescontainer");
  container.innerHTML = "";
  for (const website of websites) {
    const div = document.createElement("div");
    div.innerHTML = `<h1>${website}</h1>`;
    container.appendChild(div);
  }
}