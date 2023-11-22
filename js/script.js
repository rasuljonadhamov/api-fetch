const block = document.getElementById("block");
const search = document.getElementById("search");
const btn = document.getElementById("btn");
const continent = document.getElementById("qita");
const showMoreButton = document.getElementById("show-more-btn");
let countriesData = [];
let displayedCountries = 10;
let totalCountries = 0;

function createCountryListItem(country) {
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
  return li;
}

// Function to display countries based on a provided array
function displayCountries(countryArray, limit) {
  block.innerHTML = "";
  for (let i = 0; i < limit; i++) {
    const li = createCountryListItem(countryArray[i]);
    block.appendChild(li);
  }
}

// Fetch countries data and store it
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((json) => {
    countriesData = json;
    totalCountries = countriesData.length;
    displayCountries(countriesData, displayedCountries);

    if (totalCountries > displayedCountries) {
      showMoreButton.style.display = "block";
    }
  })
  .catch((err) => {
    console.error(err);
  });

showMoreButton.addEventListener("click", function () {
  displayedCountries += 10; // Increase the count of displayed countries
  if (displayedCountries >= totalCountries) {
    showMoreButton.style.display = "block";
  }
  displayCountries(countriesData, displayedCountries);
});

function filterCountriesBySearch() {
  const searchQuery = search.value.toLowerCase();

  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery)
  );

  displayCountries(filteredCountries, displayedCountries);
}

search.addEventListener("input", filterCountriesBySearch);

btn.addEventListener("click", function (e) {
  e.preventDefault();
  filterCountriesBySearch();
});

continent.addEventListener("change", function () {
  const selectedCon = this.value;

  if (selectedCon) {
    const filteredCountries = countriesData.filter(
      (country) => country.continents[0] === selectedCon
    );

    displayCountries(filteredCountries, displayedCountries);
  } else {
    displayCountries(countriesData, displayedCountries);
  }
});
