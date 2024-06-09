const main = document.querySelector("main");
const assetContainer = document.querySelector(".assets-container");

const headerHTML = (title, taskTitle, taskDescription) => {
  const header = `<header>
        <div class="heading-box">
          <h3>${title}</h3>
          <button>Submit Task</button>
          </div>
          <div class="description-box" data="${taskTitle}">
          <div class="description-heading" onclick="showHeader(event)">
          <h4>${taskTitle}</h4>
          <i class="fa-solid fa-angle-down"></i>
          </div>
          <p class="description">${taskDescription}</p>
        </div>
      </header>`;

  main.insertAdjacentHTML("afterbegin", header);
};

const expandDescHTML = (title, assets) => {
  const list = assets.map((asset) => `<li>${asset.asset_title}</li>`).join("");
  const expandDesc = `<div class="expandable-description">
        <div class="heading-box">
          <div class="asset-heading">Journey Board</div>
          <i onclick="showExpandDesc(event)" class="fa-solid fa-arrow-right arrow"></i>
        </div>
        <div class="asset-list">
          <ul>
          <li>${title}</li>
            ${list}
          </ul>
        </div>
      </div>`;

  main.insertAdjacentHTML("beforeend", expandDesc);
};

const assetsHTML = (assets) => {
  assets.forEach((asset) => {
    const assetHTML = `<div class="asset">
            <div class="asset-heading">
              <h4>${asset.asset_title}</h4>
              <i class="fa-solid fa-circle-info"></i>
            </div>
            <div class="description-box" data="${asset.asset_title}">
              <div onclick="showDescription(event)" class="description-heading">
                <p class="description">
                  <span>Description: </span>${asset.asset_description}
                </p>
                <i class="fa-solid fa-angle-down"></i>
              </div>
              <div class="detail">
              ${
                asset.asset_content.length > 0
                  ? `<iframe
                  src="https://www.youtube.com/embed/TiMRwri1xJ8"
                  frameborder="0"
                ></iframe>`
                  : "Content"
              }

              </div>
            </div>
          </div>`;
    assetContainer.insertAdjacentHTML("beforeend", assetHTML);
  });
};

const getData = async () => {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    headerHTML(data.title, data.tasks.task_title, data.tasks.task_description);

    expandDescHTML(data.tasks.task_title, data.tasks.assets);

    assetsHTML(data.tasks.assets);
  } catch (error) {
    console.log(error);
  }
};

getData();

const showLink = () => {
  const width = window.innerWidth;
  const mobileLink = document.querySelector("#mobile-links");
  if (width < 768) {
    if (mobileLink.classList.contains("active")) {
      mobileLink.classList.remove("active");
    } else {
      mobileLink.classList.add("active");
    }
  }
};

const showExpandDesc = (event) => {
  const expandDesc = event.target.closest(".expandable-description");

  if (expandDesc.classList.contains("active")) {
    expandDesc.classList.remove("active");
  } else {
    expandDesc.classList.add("active");
    expandDesc.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const headings = expandDesc.querySelectorAll("li");
        headings.forEach((heading) => heading.classList.remove("active"));
        event.target.classList.add("active");
        const descBoxes = main.querySelectorAll(".description-box");
        descBoxes.forEach((description) => {
          if (description.attributes.data.value === event.target.innerText) {
            descBoxes.forEach((desc) => desc.classList.remove("active"));
            description.classList.add("active");
          }
        });
      }
    });
  }
};

const showHeader = (event) => {
  const descBox = event.target.closest(".description-box");
  const expandDesc = document.querySelector(".expandable-description");
  const headings = expandDesc.querySelectorAll("li");
  if (descBox.classList.contains("active")) {
    descBox.classList.remove("active");
    headings.forEach((heading) => heading.classList.remove("active"));
  } else {
    descBox.classList.add("active");
    headings.forEach((heading) => heading.classList.remove("active"));
    headings.forEach((heading) => {
      if (heading.innerText === event.target.innerText) {
        heading.classList.add("active");
      }
    });
  }
};

const showDescription = (event) => {
  const descBoxes = main.querySelectorAll(".description-box");
  const description = event.target.closest(".description-box");
  const headings = document
    .querySelector(".expandable-description")
    .querySelectorAll("li");
  if (description.classList.contains("active")) {
    description.classList.remove("active");
    headings.forEach((heading) => heading.classList.remove("active"));
  } else {
    headings.forEach((heading) => heading.classList.remove("active"));
    descBoxes.forEach((desc) => desc.classList.remove("active"));
    description.classList.add("active");
    headings.forEach((heading) => {
      if (heading.innerText === description.attributes.data.value) {
        heading.classList.add("active");
      }
    });
  }
};
