const block = document.getElementById("block");
const search = document.getElementById("search");
const btn = document.getElementById("btn");
const continent = document.getElementById("qita");

function searching() {
  if (search.value) {
    let searchQuery = search.value.toLowerCase();

    // Get all list items
    let items = block.getElementsByTagName("li");

    // Loop through each item and hide/show based on the search query
    for (let i = 0; i < items.length; i++) {
      let itemText = items[i].innerText.toLowerCase();

      // If the item contains the search query, show it; otherwise, hide it
      if (itemText.includes(searchQuery)) {
        items[i].style.display = "block";
      } else {
        items[i].style.display = "none";
      }
    }
  }
}

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((json) => {
    return json.forEach((country) => {
      console.log(country);
      const li = document.createElement("li");
      const img = document.createElement("img");
      const h1 = document.createElement("h1");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      h1.textContent = country.name.common;
      h3.textContent = country.capital;
      p.textContent = country.continents;
      img.setAttribute("src", `${country.flags.png}`);

      li.appendChild(img);
      li.appendChild(h1);
      li.appendChild(h3);
      li.appendChild(p);
      block.appendChild(li);
    });
  })
  .catch((err) => {
    console.log(err);
  });

search.addEventListener("input", function (e) {
  searching();
});

btn.addEventListener("click", function (e) {
  e.preventDefault();
  searching();
});

continent.addEventListener("change", function (json) {
  const selectedCon = this.value;

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((json) => {
      let arr = [];
      json.forEach((el) => {
        if (el.continents[0] == selectedCon) {
          arr.push(el);
        }
      });

      if (arr.length) {
        block.innerHTML = "";
        arr.forEach((country) => {
          const li = document.createElement("li");
          const img = document.createElement("img");
          const h1 = document.createElement("h1");
          const h3 = document.createElement("h3");
          const p = document.createElement("p");
          h1.textContent = country.name.common;
          h3.textContent = country.capital;
          p.textContent = country.continents;
          img.setAttribute("src", `${country.flags.png}`);

          li.appendChild(img);
          li.appendChild(h1);
          li.appendChild(h3);
          li.appendChild(p);
          block.appendChild(li);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
