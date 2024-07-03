async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    const countryList = document.getElementById('country-list');
    countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.classList.add('country');
        listItem.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
        `;
        countryList.appendChild(listItem);
    });
}

fetchCountries();
