async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = '';
    countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.classList.add('country');
        listItem.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <div>
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            </div>
        `;
        listItem.addEventListener('click', () => {
            displayCountryDetails(country);
        });
        countryList.appendChild(listItem);
    });
}

function displayCountryDetails(country) {
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 100px;">
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
        <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
        <p><strong>Borders:</strong> ${country.borders ? country.borders.join(', ') : 'No borders'}</p>
    `;
}

async function searchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchInput));
        
        displayCountries(filteredCountries);

        if (filteredCountries.length > 0) {
            displayCountryDetails(filteredCountries[0]);
        }
    } catch (error) {
        console.error('Error searching countries:', error);
    }
}

document.getElementById('search-button').addEventListener('click', searchCountries);

fetchCountries();
