const block = document.getElementById("block");

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((country) => {
      console.log(country);
      const li = document.createElement("li");
      const img = document.createElement("img");
      const h1 = document.createElement("h1");
      h1.textContent = country.name.common;
      img.setAttribute("src", `${country.coatOfArms.png}`);

      li.appendChild(img);
      li.appendChild(h1);
      block.appendChild(li);
    });
  })
  .catch((err) => {
    console.log(err);
  });
