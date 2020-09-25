let tabCountries = null;
let tabFavorites = null;
let numberFormat = null;

let allCountries = [];
let favoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulation = 0;
let totalPopulationFavorites = 0;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countCountriesFavorites');

  totalPopulation = document.querySelector('#totalList');
  totalPopulationFavorites = document.querySelector('#totalFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });

  render();
}

function render() {
  renderCountryList();
  renderFavoritesCountries();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { id, name, population, formattedPopulation, flag } = country;

    const countryHMTL = `
    <div class='country'>
        <div>
            <button id="${id}" type="button" class="btn btn-success">+</button>
        </div>
        <div>
            <img src="${flag}" alt="${flag}" class="img-fluid" alt="Responsive image">
        </div>
        <div>
            <ul>
                <li>${name}</li>
                <li>${formattedPopulation}</li>
            </ul>
        </div>
    </div>
    `;
    countriesHTML += countryHMTL;
  });

  countriesHTML += '</div> ';

  tabCountries.innerHTML = countriesHTML;
}

function renderFavoritesCountries() {
  let favoritesHTML = '<div>';

  favoritesCountries.forEach((country) => {
    const { id, name, population, formattedPopulation, flag } = country;

    const favoriteCountryHMTL = `
    <div class='country'>
        <div>
            <button id="${id}" type="button" class="btn btn-danger">-</button>
        </div>
        <div>
            <img src="${flag}" alt="${flag}" class="img-fluid" alt="Responsive image">
        </div>
        <div>
            <ul>
                <li>${name}</li>
                <li>${formattedPopulation}</li>
            </ul>
        </div>
    </div>
    `;

    favoritesHTML += favoriteCountryHMTL;
  });

  favoritesHTML += '<div>';
  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoritesCountries.length;

  const totalP = allCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  const totalF = favoritesCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  totalPopulation.textContent = formatNumber(totalP);
  totalPopulationFavorites.textContent = formatNumber(totalF);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);

  favoritesCountries = [...favoritesCountries, countryToAdd];

  favoritesCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoritesCountries.find(
    (country) => country.id === id
  );

  allCountries = [...allCountries, countryToRemove];

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoritesCountries = favoritesCountries.filter(
    (country) => country.id !== id
  );

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
