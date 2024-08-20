document.addEventListener('DOMContentLoaded', function() {
  var planets = document.querySelectorAll('.orbit');
  var sun = document.getElementById('sun');
  var turnBackButton = document.getElementById('turn-back');
  var infoPanel = document.createElement('div');
  infoPanel.classList.add('info-panel');
  document.body.appendChild(infoPanel);

  // Variables to keep track of selected continent and country
  let selectedContinent = null;
  let selectedCountry = null;

  var menuItems = document.querySelectorAll('#data a');
  var sunMenuItem = document.getElementById('menu-sun');

  var earthMapContainer = document.getElementById('earth-map-container');
  var backToEarthButton = document.getElementById('back-to-earth');
  var continents = document.querySelectorAll('.continent');

  // Variable to keep track of the currently clicked element
  var currentClickedElement = null;

  // Data mapping from IDs to names
  const countryData = {
    "AF": "Afghanistan", 
     "AL": "Albania", 
     "DZ": "Algeria", 
     "AMS": "American Samoa",
     "AN": "Angola",
     "AI": "Anguilla", 
     "AB": "Antigua and Barbuda",
     "AG": "Argentina",
     "AM": "Armenia", 
     "AW": "Aruba", 
     "AS": "Australia",
     "AT": "Austria", 
     "AZ": "Azerbaijan",
     "BA": "Bahamas",
     "BH": "Bahrain", 
     "BD": "Bangladesh", 
     "BB": "Barbados", 
     "BY": "Belarus", 
     "BE": "Belgium", 
     "BZ": "Belize", 
     "BJ": "Benin", 
     "BM": "Bermuda", 
     "BT": "Bhutan", 
     "BO": "Bolivia", 
     "BA": "Bosnia and Herzegovina", 
     "BW": "Botswana", 
     "BR": "Brazil", 
     "VG": "British Virgin Islands", 
     "BN": "Brunei Darussalam", 
     "BG": "Bulgaria", 
     "BF": "Burkina Faso", 
     "BI": "Burundi", 
     "KH": "Cambodia", 
     "CM": "Cameroon", 
     "CF": "Central African Republic", 
     "CV": "Cape Verde",
     "CA": "Canada",
     "CS": "Canary Islands (Spain)",
     "CAI": "Cayman Islands",
     "TD": "Chad", 
     "CL": "Chile",
     "CN": "China",
     "CO": "Colombia", 
     "MO": "Comoros",
     "CR": "Costa Rica", 
     "HR": "Croatia", 
     "CU": "Cuba", 
     "CW": "Curaçao", 
     "CZ": "Czech Republic", 
     "CI": "Côte d'Ivoire", 
     "KP": "Dem. Rep. Korea", 
     "CD": "Democratic Republic of the Congo", 
     "DK": "Denmark",
     "DJ": "Djibouti", 
     "DM": "Dominica", 
     "DO": "Dominican Republic", 
     "EC": "Ecuador", 
     "EG": "Egypt", 
     "SV": "El Salvador", 
     "GQ": "Equatorial Guinea", 
     "ER": "Eritrea", 
     "EE": "Estonia", 
     "ET": "Ethiopia", 
     "FA": "Faeroe Islands",
     "FSM": "Federated States of Micronesia",
     "FI": "Finland", 
     "FJ": "Fiji",
     "FR": "France",
     "GF": "French Guiana", 
     "FP": "French Polynesia",
     "GA": "Gabon", 
     "GE": "Georgia", 
     "DE": "Germany", 
     "GH": "Ghana", 
     "GR": "Greece",
     "GL": "Greenland", 
     "GD": "Grenada", 
     "GP": "Guadeloupe",
     "GU": "Guam", 
     "GT": "Guatemala", 
     "GN": "Guinea", 
     "GW": "Guinea-Bissau", 
     "GY": "Guyana", 
     "HT": "Haiti", 
     "HN": "Honduras", 
     "HU": "Hungary", 
     "IS": "Iceland", 
     "IN": "India", 
     "ID": "Indonesia",
     "IR": "Iran", 
     "IQ": "Iraq", 
     "IE": "Ireland", 
     "IL": "Israel", 
     "IT": "Italy",
     "JM": "Jamaica", 
     "JP": "Japan",
     "JO": "Jordan", 
     "KZ": "Kazakhstan", 
     "KE": "Kenya", 
     "XK": "Kosovo", 
     "KW": "Kuwait", 
     "KG": "Kyrgyzstan", 
     "LA": "Lao PDR", 
     "LV": "Latvia", 
     "LB": "Lebanon", 
     "LS": "Lesotho", 
     "LR": "Liberia", 
     "LY": "Libya", 
     "LT": "Lithuania", 
     "LU": "Luxembourg", 
     "MK": "Macedonia", 
     "MG": "Madagascar", 
     "MI": "Malaysia",
     "MW": "Malawi", 
     "MV": "Maldives", 
     "ML": "Mali", 
     "MT": "Malta",
     "MH": "Marshall Islands", 
     "MQ": "Martinique", 
     "MR": "Mauritania", 
     "MU": "Mauritius",
     "YT": "Mayotte", 
     "MX": "Mexico", 
     "MD": "Moldova", 
     "MN": "Mongolia", 
     "ME": "Montenegro", 
     "MS": "Montserrat", 
     "MA": "Morocco", 
     "MZ": "Mozambique", 
     "MM": "Myanmar", 
     "NA": "Namibia", 
     "NR": "Nauru", 
     "NC": "New Caledonia",
     "NP": "Nepal", 
     "NZ": "New Zealand",
     "NL": "Netherlands", 
     "BQBO": "Netherlands", 
     "NI": "Nicaragua", 
     "NE": "Niger", 
     "NMI": "Northern Mariana Islands",
     "NW": "Norway",
     "OM": "Oman",
     "NG": "Nigeria", 
     "PK": "Pakistan", 
     "PW": "Palau", 
     "PS": "Palestine", 
     "PA": "Panama", 
     "PG" : "Papua New Guinea",
     "PY": "Paraguay", 
     "PE": "Peru", 
     "PH": "Philippines",
     "PL": "Poland", 
     "PT": "Portugal", 
     "PR": "Puerto Rico",
     "QA": "Qatar", 
     "CG": "Republic of Congo", 
     "KR": "Republic of Korea", 
     "RE": "Reunion", 
     "RO": "Romania", 
     "RU": "Russian Federation",
     "RW": "Rwanda", 
     "BQSA": "Saba (Netherlands)", 
     "SM": "Samoa",
     "LC": "Saint Lucia", 
     "VC": "Saint Vincent and the Grenadines", 
     "BL": "Saint-Barthélemy", 
     "MF": "Saint-Martin", 
     "KN": "Saint Kitts and Nevis",
     "ST": "São Tomé and Principe",
     "SA": "Saudi Arabia", 
     "SN": "Senegal", 
     "RS": "Serbia", 
     "SEY": "Seychelles",
     "SL": "Sierra Leone", 
     "SX": "Sint Maarten", 
     "SK": "Slovakia", 
     "SI": "Slovenia", 
     "SO": "Somalia", 
     "SOL": "Solomon Islands",
     "ZA": "South Africa", 
     "SS": "South Sudan", 
     "ES": "Spain", 
     "LK": "Sri Lanka", 
     "BQSE": "St. Eustatius (Netherlands)", 
     "SD": "Sudan", 
     "SR": "Suriname", 
     "SZ": "Swaziland", 
     "SE": "Sweden", 
     "CH": "Switzerland", 
     "SY": "Syria", 
     "TW": "Taiwan", 
     "TJ": "Tajikistan", 
     "TZ": "Tanzania", 
     "TH": "Thailand", 
     "GM": "The Gambia", 
     "TL": "Timor-Leste", 
     "TG": "Togo", 
     "TO": "Tonga",
     "TT": "Trinidad and Tobago",
     "TN": "Tunisia", 
     "TU": "Turkey",
     "TM": "Turkmenistan", 
     "TCI": "Turks and Caicos Islands",
     "TV": "Tuvalu", 
     "UG": "Uganda", 
     "UA": "Ukraine", 
     "AE": "United Arab Emirates", 
     "UK": "United Kingdom",
     "US": "United States",
     "USVI": "United States Virgin Island",
     "UY": "Uruguay", 
     "UZ": "Uzbekistan", 
     "VA": "Vanuatu",
     "VE": "Venezuela", 
     "VN": "Vietnam", 
     "EH": "Western Sahara", 
     "YE": "Yemen", 
     "ZM": "Zambia", 
     "ZW": "Zimbabwe"
   }

  function showEarthMap() {
    if (earthMapContainer) {
      earthMapContainer.style.display = 'flex';
      infoPanel.style.display = 'none';
    }
  }

  // Function to hide the earth map and show the info panel
  async function hideEarthMap() {
    if (earthMapContainer) {
        earthMapContainer.style.display = 'none'; // Hide the map
        infoPanel.style.display = 'block'; // Show the info panel
       // Fetch and display data related to the planet
       const planetData = await fetchPlanetData('earth');
       showInfoPanel(planetData, currentClickedElement);
    }
}

function handleCountryClick(event) {
  const clickedCountry = event.target.closest('path');

  if (!clickedCountry) return; // Exit if no country was clicked

  const countryId = clickedCountry.getAttribute('id');

  // Deselect previously selected countries
  if (selectedCountry && selectedCountry.getAttribute('id') !== countryId) {
    deselectAllCountries();
  }

  // Check if the clicked country is already selected
  const allCountries = document.querySelectorAll(`path[id="${countryId}"]`);
  const isSelected = Array.from(allCountries).some(country => country.classList.contains('selected'));

  if (isSelected) {
    deselectAllCountries();
  } else {
    // Select all countries with the same ID
    allCountries.forEach(country => country.classList.add('selected'));
    selectedCountry = clickedCountry;
    showCountryInfoPanel(clickedCountry); // Display the country information
  }
}

// Show all countries within a given continent element
function showCountries(continentElement) {
  const countries = continentElement.querySelectorAll('path');
  countries.forEach(function(country) {
    country.style.display = 'block'; // Make sure the countries are visible
    country.addEventListener('click', handleCountryClick);
  });
}

// Deselect all selected elements (continent and countries)
function deselectAll() {
  // Deselect continent
  if (selectedContinent) {
    selectedContinent.classList.remove('selected');
    selectedContinent = null;
  }
  // Deselect countries
  deselectAllCountries();
}

// Deselect all selected countries
function deselectAllCountries() {
  document.querySelectorAll('path[id]').forEach(country => {
    country.classList.remove('selected');
  });
  selectedCountry = null;
  infoPanel.style.display = 'none'; // Hide the info panel
}

// Show information panel for a country
function showCountryInfoPanel(countryElement) {
  const countryId = countryElement.getAttribute('id');
  const countryName = countryData[countryId] || "Unknown Country";

  // Update the info panel content
  infoPanel.innerHTML = `<h2>${countryName}</h2><p>Some more information about ${countryName} could go here.</p>`;
  infoPanel.style.display = 'block'; // Ensure the panel is visible

  // Position the info panel relative to the clicked country
  const rect = countryElement.getBoundingClientRect();
  infoPanel.style.left = `${Math.min(window.innerWidth - infoPanel.offsetWidth - 10, rect.right + 10)}px`;
  infoPanel.style.top = `${rect.top}px`;
}

document.querySelectorAll('path[id]').forEach(function(country) {
  country.addEventListener('click', handleCountryClick);
});

// Hide info panel when clicking outside the map
document.addEventListener('click', function(event) {
  if (!event.target.closest('.continent') && !event.target.closest('path')) {
    if (selectedContinent) {
      selectedContinent.classList.remove('selected');
      selectedContinent = null;
    }
    if (selectedCountry) {
      deselectAllCountries();
    }
    infoPanel.style.display = 'none';
  }
});

// Add hover events to display info on hover
document.querySelectorAll('path').forEach(function(country) {
  country.addEventListener('mouseover', function() {
      const countryId = country.id;
      const country = countryData[countryId] || { name: 'Unknown Country' };

      infoPanel.innerHTML = `<h2>${country.name}</h2><p>${country.info || ''}</p>`;
      infoPanel.style.display = 'block';

      const rect = country.getBoundingClientRect();
      infoPanel.style.left = `${Math.min(window.innerWidth - infoPanel.offsetWidth - 10, rect.right + 10)}px`;
      infoPanel.style.top = `${rect.top}px`;
  });

  country.addEventListener('mouseout', function() {
      if (selectedCountry !== country) {
          infoPanel.style.display = 'none';
      }
  });
});

// Event listeners for continent click
continents.forEach(continent => {
  continent.addEventListener('click', handleContinentClick);
});

// Event listener for clicking on the earth map container
earthMapContainer.addEventListener('click', function(event) {
  if (!event.target.closest('.continent')) {
    deselectAllCountries();
    if (selectedContinent) {
      selectedContinent.classList.remove('selected');
      selectedContinent = null;
    }
    infoPanel.style.display = 'none';
  }
});

// Handle click events on continent elements
function handleContinentClick(event) {
  const clickedContinent = event.target.closest('.continent');
  if (!clickedContinent) return;

  if (selectedContinent && selectedContinent !== clickedContinent) {
    deselectAllCountries();
    selectedContinent.classList.remove('selected');
  }

  if (clickedContinent.classList.contains('selected')) {
    selectedContinent = clickedContinent;
    showCountries(clickedContinent);
  } else {
    deselectAll();
    clickedContinent.classList.add('selected');
    selectedContinent = clickedContinent;

    const continentName = clickedContinent.getAttribute('title');
    const continentData = fetchContinentData(continentName);
    showContinentInfoPanel(continentData, clickedContinent);
  }
}

// Fetch data related to a continent
function fetchContinentData(name) {
  const continentDataMap = {
    "Africa": {
      name: "Africa",
      description: "Africa is the second-largest and second-most-populous continent on Earth.",
      population: "1.3 billion",
      area: "30.37 million km²",
      numberOfCountries: 54,
      majorLandmarks: ["Sahara Desert", "Mount Kilimanjaro", "Nile River"]
    },
    "Asia": {
      name: "Asia",
      description: "Asia is the Earth's largest and most populous continent.",
      population: "4.7 billion",
      area: "44.58 million km²",
      numberOfCountries: 49,
      majorLandmarks: ["Great Wall of China", "Mount Everest", "Taj Mahal"]
    },
    "Europe": {
      name: "Europe",
      description: "Europe is known for its rich history and diverse cultures.",
      population: "747 million",
      area: "10.18 million km²",
      numberOfCountries: 44,
      majorLandmarks: ["Eiffel Tower", "Colosseum", "Big Ben"]
    },
    "North America": {
      name: "North America",
      description: "North America is home to a diverse range of climates and landscapes.",
      population: "592 million",
      area: "24.71 million km²",
      numberOfCountries: 23,
      majorLandmarks: ["Grand Canyon", "Statue of Liberty", "Niagara Falls"]
    },
    "South America": {
      name: "South America",
      description: "South America is known for its rainforests and vibrant cultures.",
      population: "430 million",
      area: "17.84 million km²",
      numberOfCountries: 12,
      majorLandmarks: ["Amazon Rainforest", "Christ the Redeemer", "Machu Picchu"]
    },
    "Australia": {
      name: "Australia",
      description: "Australia is the smallest continent and a country known for its unique wildlife.",
      population: "26 million",
      area: "7.68 million km²",
      numberOfCountries: 14,
      majorLandmarks: ["Sydney Opera House", "Great Barrier Reef", "Uluru"]
    }
  };

  return continentDataMap[name] || {
    name: name,
    description: "No data available for this continent.",
    population: "N/A",
    area: "N/A",
    numberOfCountries: "N/A",
    majorLandmarks: []
  };
}

// Show information panel for a continent
function showContinentInfoPanel(continentData, targetElement) {
  const landmarksList = continentData.majorLandmarks.map(landmark => `<li>${landmark}</li>`).join('');
  infoPanel.innerHTML = `
    <h2>${continentData.name}</h2>
    <p>${continentData.description}</p>
    <p><strong>Population:</strong> ${continentData.population}</p>
    <p><strong>Area:</strong> ${continentData.area}</p>
    <p><strong>Number of Countries:</strong> ${continentData.numberOfCountries}</p>
    <p><strong>Major Landmarks:</strong></p>
    <ul>${landmarksList}</ul>
  `;
  infoPanel.style.display = 'block';

  var rect = targetElement.getBoundingClientRect();
  infoPanel.style.left = `${rect.right + 10}px`;
  infoPanel.style.top = `${rect.top}px`;
}

continents.forEach(function(continent) {
  continent.addEventListener('click', handleContinentClick);
});

// Hide info panel when clicking on a blank area of the map
earthMapContainer.addEventListener('click', function(event) {
  // Check if the clicked area is not a continent
  if (!event.target.closest('.continent')) {
    hideInfoPanel(); // Hide the info panel if the click is not on a continent
  }
});

// Hide Info Panel When Clicking Outside the Map
document.addEventListener('click', function(event) {
  // Check if the click is outside the #earth-map-container element
  if (!event.target.closest('#earth-map-container')) {
    hideInfoPanel(); // Hide the info panel if the click is outside the map container
  }
});

  backToEarthButton.addEventListener('click', async function() {
    await hideEarthMap(); // Hide the enlarged planet view
    // Fetch data for Earth and show it in the info panel
    const planetData = await fetchPlanetData('earth');
    showInfoPanel(planetData, currentClickedElement);
    showEarth(); // Show the Earth in its resized state
  });

  // Function to fetch planet data from an API
  async function fetchPlanetDataFromAPI(name) {
    try {
      // Fetch data from the API
      const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${name.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json(); // Parse the response data
        return data;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Fetch error:', error); // Log any errors that occur during fetch
      return null;
    }
  }

  // Function to format and fetch planet data
  async function fetchPlanetData(name) {
    const data = await fetchPlanetDataFromAPI(name); // Get data from the API
    if (data) {
      // Return formatted planet data
      return {
        name: data.englishName || "Unknown",
        description: `${data.englishName} is a ${data.isPlanet ? "planet" : "celestial body"} with a gravity of ${data.gravity} m/s². It has a mean radius of ${data.meanRadius} km and a mass of ${data.mass.massValue} × 10^${data.mass.massExponent} kg.`,
        gravity: data.gravity,
        radius: data.meanRadius,
        mass: `${data.mass.massValue} × 10^${data.mass.massExponent} kg`,
        moons: data.moons ? data.moons.length : 0,
        orbit: `${data.semimajorAxis / 1e6} million km`,
        orbitPeriod: `${data.sideralOrbit} days`,
        rotationPeriod: `${data.sideralRotation} hours`,
      };
    } else {
      // Return default values if no data is available
      return {
        name: name,
        description: `No data available for ${name}.`,
        gravity: "N/A",
        radius: "N/A",
        mass: "N/A",
        moons: "N/A",
        orbit: "N/A",
        orbitPeriod: "N/A",
        rotationPeriod: "N/A",
      };
    }
  }

  // Function to show the info panel with planet data
  function showInfoPanel(planetData, planetElement) {
    if (planetData && planetElement) {
    // Set the content of the info panel
    infoPanel.innerHTML = `
    <h2>${planetData.name}</h2>
    <p>${planetData.description}</p>
    <p><strong>Gravity:</strong> ${planetData.gravity} m/s²</p>
    <p><strong>Radius:</strong> ${planetData.radius} km</p>
    <p><strong>Mass:</strong> ${planetData.mass}</p>
    <p><strong>Moons:</strong> ${planetData.moons}</p>
    <p><strong>Orbit:</strong> ${planetData.orbit}</p>
    <p><strong>Orbital Period:</strong> ${planetData.orbitPeriod}</p>
    <p><strong>Rotation Period:</strong> ${planetData.rotationPeriod}</p>
  `;
    infoPanel.style.display = 'block'; // Make the info panel visible

    // Position the info panel near the planet element
    var rect = planetElement.getBoundingClientRect();
    var panelWidth = infoPanel.offsetWidth;
    var panelHeight = infoPanel.offsetHeight;

    // Calculate the position for the info panel
    var top = Math.max((rect.top + rect.bottom) / 2 - panelHeight / 2, 10);
    var left = (rect.left + rect.right) / 2 < window.innerWidth / 2
      ? Math.min(rect.right + 10, window.innerWidth - panelWidth - 10)
      : Math.max(rect.left - panelWidth - 10, 10);

    left = Math.max(left, 10); // Ensure the panel is not off-screen
    top = Math.min(top, window.innerHeight - panelHeight - 10); // Ensure the panel is not off-screen

    infoPanel.style.left = `${left}px`;
    infoPanel.style.top = `${top}px`;
  }
}

  // Function to hide the info panel
  function hideInfoPanel() {
    deselectAll(); // Deselect any selected elements
    infoPanel.innerHTML = ''; // Clear the info panel content
    infoPanel.style.display = 'none'; // Hide the info panel
  }

  // Function to handle the click event on a planet or element
  async function handleElementClick(element, name) {
    const isEarth = name.toLowerCase() === 'earth';
    const isEarthResized = element.style.width === '800px' && element.style.height === '800px';

    // Reset the currently clicked element if it is not the same as the new one
    if (currentClickedElement && currentClickedElement !== element) {
        resetPlanet(currentClickedElement);
    }

      // Handle non-Earth elements
      if (!isEarth) {
        if (!isEarthResized) {
            resizeAndDisplayPlanet(element); // Resize and display the planet
            const elementData = await fetchPlanetData(name);
            showInfoPanel(elementData, element); // Show the info panel
            turnBackButton.style.display = 'block'; // Show the turn back button
            currentClickedElement = element; // Update the currently clicked element
          } else {
            // If the planet is already resized, just show its info
            const elementData = await fetchPlanetData(name);
            showInfoPanel(elementData, element); // Show the info panel
            turnBackButton.style.display = 'block'; // Show the turn back button
            currentClickedElement = element; // Update the currently clicked element
        }
    } else {
        // Handle Earth element separately
        if (!isEarthResized) {
            resizeAndDisplayPlanet(element); // Resize and display the Earth
            const elementData = await fetchPlanetData(name);
            showInfoPanel(elementData, element); // Show the info panel
            turnBackButton.style.display = 'block'; // Show the turn back button
            currentClickedElement = element; // Update the currently clicked element
        } else {
      // Earth is already resized; show the Earth map and hide the info panel
            showEarthMap();
            hideInfoPanel();
        }
    }
}

// Function to resize and display a planet element
function resizeAndDisplayPlanet(element) {
  // Hide all planets and their orbits
  planets.forEach(function(orbit) {
      orbit.style.display = 'none';
  });
  if (sun !== element) {
      sun.style.display = 'none'; // Hide the sun if it's not the clicked element
  }

  // Resize the clicked planet
  element.style.width = '800px';
  element.style.height = '800px';
  element.style.transformOrigin = 'center center'; 
  element.classList.add('clicked');

  // Show the ring of the planet if it has one
  var clickedRing = element.querySelector('.ring');
  if (clickedRing) {
      clickedRing.style.transition = 'width 0.5s ease, height 0.5s ease';
      clickedRing.classList.add('clicked');
  }

  // Show the orbit of the planet
  var orbit = element.closest('.orbit');
  if (orbit) {
      orbit.style.display = 'block';
  }

  // Show the sun if the clicked element is the sun
  if (element === sun) {
      sun.style.display = 'block';
  }
}
// Function to reset the size and state of a planet element
function resetPlanet(element) {
  element.classList.remove('clicked'); // Remove the clicked class
  element.style.width = ''; // Reset width
  element.style.height = ''; // Reset height
  element.style.transform = ''; // Reset transform
  element.style.transition = ''; // Reset transition

  // Reset the ring of the planet if it has one
  var ring = element.querySelector('.ring');
  if (ring) {
      ring.classList.remove('clicked');
  }
}

// Function to show Earth in its resized state
function showEarth() {
  var earthElement = document.querySelector('.planet[data-name="earth"]');
  if (earthElement) {
    earthElement.style.display = 'block'; // Make Earth visible
    earthElement.style.width = '800px'; // Resize Earth
    earthElement.style.height = '800px'; // Resize Earth
    earthElement.classList.add('clicked'); // Mark Earth as clicked

    // Show the orbit of Earth
    var earthOrbit = earthElement.closest('.orbit');
    if (earthOrbit) {
      earthOrbit.style.display = 'block';
    }

    // Show the ring of Earth if it has one
    var earthRing = earthElement.querySelector('.ring');
    if (earthRing) {
      earthRing.classList.add('clicked');
    }

    turnBackButton.style.display = 'block'; // Show the turn back button
  }
}

// Function to handle the "turn back" action
function handleTurnBack() {
  hideEarthMap(); // Hide the Earth map view

  // Reset and show all planets and their orbits
  planets.forEach(function(orbit) {
    orbit.style.display = 'block';
    var planet = orbit.querySelector('.planet');
    if (planet) {
      planet.style.height = ''; // Reset height
      planet.style.width = ''; // Reset width
      planet.style.transform = ''; // Reset transform
      planet.style.transition = ''; // Reset transition
      planet.classList.remove('clicked'); // Remove clicked class
    }
    var ring = orbit.querySelector('.ring');
    if (ring) {
      ring.classList.remove('clicked'); // Remove clicked class
    }
  });

  sun.style.display = 'block'; // Show the sun
  sun.style.width = ''; // Reset width
  sun.style.height = ''; // Reset height
  sun.classList.remove('clicked'); // Remove clicked class

  turnBackButton.style.display = 'none'; // Hide the turn back button
  hideInfoPanel(); // Hide the info panel
  currentClickedElement = null; // Clear the current clicked element
}

// Add click event listeners to all planet elements
planets.forEach(function(orbit) {
  orbit.addEventListener('click', async function(event) {
    event.stopPropagation(); // Prevent event bubbling
    var clickedPlanet = orbit.querySelector('.planet');
    var planetName = clickedPlanet.dataset.name;
    await handleElementClick(clickedPlanet, planetName); // Handle the planet click
  });
});

// Add click event listeners to all menu items
menuItems.forEach(function(menuItem) {
  menuItem.addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent default link behavior
    var planetName = menuItem.title;
    var planetElement = document.querySelector(`.planet[data-name="${planetName}"]`);
    if (planetElement) {
      await handleElementClick(planetElement, planetName); // Handle the menu item click
    }
  });
});

// Add click event listener to the sun element
sun.addEventListener('click', async function() {
  await handleElementClick(sun, sun.dataset.name); // Handle sun click
});

// Add click event listener to the turn back button
turnBackButton.addEventListener('click', function() {
  handleTurnBack(); // Handle turn back action
});

// Initially hide the turn back button
turnBackButton.style.display = 'none';
});