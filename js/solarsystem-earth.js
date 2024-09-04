document.addEventListener('DOMContentLoaded', function () {
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
    "AF": { countryName: "Afghanistan", description: "A landlocked country in South Asia." },
    "AL": { countryName: "Albania", description: "A Balkan nation with a stunning Adriatic coastline." },
    "DZ": { countryName: "Algeria", description: "The largest country in Africa, rich in history." },
    "AMS": { countryName: "American Samoa", description: "A U.S. territory in the South Pacific." },
    "AN": { countryName: "Angola", description: "A Southern African nation with rich resources." },
    "AI": { countryName: "Anguilla", description: "A British territory in the Caribbean." },
    "AB": { countryName: "Antigua and Barbuda", description: "A twin-island nation in the Caribbean." },
    "AG": { countryName: "Argentina", description: "A South American country known for tango." },
    "AM": { countryName: "Armenia", description: "An ancient country in the Caucasus region." },
    "AW": { countryName: "Aruba", description: "A Caribbean island with Dutch influence." },
    "AS": { countryName: "Australia", description: "A vast continent known for unique wildlife." },
    "AT": { countryName: "Austria", description: "A European nation famous for alpine scenery." },
    "AZ": { countryName: "Azerbaijan", description: "A country at the crossroads of Europe and Asia." },
    "BAH": { countryName: "Bahamas", description: "A Caribbean nation known for its beautiful beaches." },
    "BH": { countryName: "Bahrain", description: "A small island nation in the Persian Gulf." },
    "BD": { countryName: "Bangladesh", description: "A densely populated country in South Asia." },
    "BB": { countryName: "Barbados", description: "A Caribbean island known for its beaches." },
    "BY": { countryName: "Belarus", description: "An Eastern European country with Soviet heritage." },
    "BE": { countryName: "Belgium", description: "A Western European country known for its medieval towns." },
    "BZ": { countryName: "Belize", description: "A Central American country with Caribbean shorelines." },
    "BJ": { countryName: "Benin", description: "A West African nation known for its rich culture." },
    "BM": { countryName: "Bermuda", description: "A British island territory in the North Atlantic." },
    "BT": { countryName: "Bhutan", description: "A Himalayan kingdom known for its monasteries." },
    "BO": { countryName: "Bolivia", description: "A landlocked country in South America with diverse terrain." },
    "BA": { countryName: "Bosnia and Herzegovina", description: "A Balkan country with medieval history." },
    "BW": { countryName: "Botswana", description: "A landlocked country in Southern Africa known for wildlife." },
    "BR": { countryName: "Brazil", description: "The largest country in South America, famous for the Amazon." },
    "VG": { countryName: "British Virgin Islands", description: "A British overseas territory in the Caribbean." },
    "BN": { countryName: "Brunei Darussalam", description: "A small, wealthy nation on the island of Borneo." },
    "BG": { countryName: "Bulgaria", description: "A Balkan nation with a rich history and Black Sea coastline." },
    "BF": { countryName: "Burkina Faso", description: "A landlocked country in West Africa." },
    "BI": { countryName: "Burundi", description: "A small, landlocked country in East Africa." },
    "KH": { countryName: "Cambodia", description: "A Southeast Asian nation known for Angkor Wat." },
    "CM": { countryName: "Cameroon", description: "A Central African country with diverse geography." },
    "CF": { countryName: "Central African Republic", description: "A landlocked country in Central Africa." },
    "CV": { countryName: "Cape Verde", description: "An island nation off the northwest coast of Africa." },
    "CA": { countryName: "Canada", description: "The second-largest country in the world, known for its natural beauty." },
    "CS": { countryName: "Canary Islands (Spain)", description: "A Spanish archipelago off the northwest coast of Africa." },
    "CAI": { countryName: "Cayman Islands", description: "A British Overseas Territory in the Caribbean." },
    "TD": { countryName: "Chad", description: "A landlocked country in North-Central Africa." },
    "CL": { countryName: "Chile", description: "A long, narrow country stretching along South America's western edge." },
    "CN": { countryName: "China", description: "A vast East Asian country with a rich history." },
    "CO": { countryName: "Colombia", description: "A South American country with diverse landscapes and coffee." },
    "MO": { countryName: "Comoros", description: "An island nation in the Indian Ocean." },
    "CR": { countryName: "Costa Rica", description: "A Central American country known for its rainforests." },
    "HR": { countryName: "Croatia", description: "A Balkan country with a long Adriatic coastline." },
    "CU": { countryName: "Cuba", description: "A Caribbean island nation known for its history and culture." },
    "CW": { countryName: "Curaçao", description: "A Dutch Caribbean island known for its beaches." },
    "CZ": { countryName: "Czech Republic", description: "A Central European country known for its medieval architecture." },
    "CI": { countryName: "Côte d'Ivoire", description: "A West African country known for its cocoa production." },
    "KP": { countryName: "Dem. Rep. Korea", description: "A reclusive nation in East Asia, also known as North Korea." },
    "CD": { countryName: "Democratic Republic of the Congo", description: "A large Central African nation rich in natural resources." },
    "DK": { countryName: "Denmark", description: "A Scandinavian country known for its high quality of life." },
    "DJ": { countryName: "Djibouti", description: "A small country in the Horn of Africa." },
    "DM": { countryName: "Dominica", description: "A mountainous Caribbean island with natural hot springs." },
    "DO": { countryName: "Dominican Republic", description: "A Caribbean nation sharing the island of Hispaniola with Haiti." },
    "EC": { countryName: "Ecuador", description: "A country in South America known for the Galápagos Islands." },
    "EG": { countryName: "Egypt", description: "A North African country known for its ancient civilization and pyramids." },
    "SV": { countryName: "El Salvador", description: "The smallest and most densely populated country in Central America." },
    "GQ": { countryName: "Equatorial Guinea", description: "A small Central African country with islands and mainland territory." },
    "ER": { countryName: "Eritrea", description: "A Northeast African country on the Red Sea coast." },
    "EE": { countryName: "Estonia", description: "A Baltic nation known for its medieval architecture." },
    "ET": { countryName: "Ethiopia", description: "A landlocked country in the Horn of Africa, rich in history." },
    "FA": { countryName: "Faeroe Islands", description: "A self-governing archipelago part of the Kingdom of Denmark." },
    "FSM": { countryName: "Federated States of Micronesia", description: "An island nation in the Western Pacific Ocean." },
    "FI": { countryName: "Finland", description: "A Nordic country known for its lakes and forests." },
    "FJ": { countryName: "Fiji", description: "An island nation in the South Pacific, known for its coral reefs." },
    "FR": { countryName: "France", description: "A European country famous for its culture, cuisine, and landmarks." },
    "GF": { countryName: "French Guiana", description: "A French overseas region on the northeast coast of South America." },
    "FP": { countryName: "French Polynesia", description: "An overseas collectivity of France in the South Pacific." },
    "GA": { countryName: "Gabon", description: "A Central African country with significant rainforests." },
    "GE": { countryName: "Georgia", description: "A country at the intersection of Europe and Asia, known for its Caucasus Mountains." },
    "DE": { countryName: "Germany", description: "A major European country known for its history and economic strength." },
    "GH": { countryName: "Ghana", description: "A West African nation known for its rich history and culture." },
    "GR": { countryName: "Greece", description: "A southeastern European country known for its ancient history and islands." },
    "GL": { countryName: "Greenland", description: "The world's largest island, an autonomous territory of Denmark." },
    "GD": { countryName: "Grenada", description: "A small island nation in the Caribbean known as the 'Spice Isle'." },
    "GP": { countryName: "Guadeloupe", "description": "An overseas region of France located in the Caribbean." },
    "GU": { countryName: "Guam", description: "A U.S. territory in the Western Pacific Ocean." },
    "GT": { countryName: "Guatemala", description: "A Central American country known for its Mayan heritage." },
    "GW": { countryName: "Guinea-Bissau", description: "A West African country with a mix of cultures." },
    "GN": { countryName: "Guinea", description: "A West African country rich in natural resources." },
    "GY": { countryName: "Guyana", description: "A country on South America's North Atlantic coast, known for its dense rainforest." },
    "HT": { countryName: "Haiti", description: "A Caribbean nation sharing the island of Hispaniola with the Dominican Republic." },
    "HN": { countryName: "Honduras", description: "A Central American country with Caribbean Sea coastlines." },
    "HU": { countryName: "Hungary", description: "A landlocked Central European country known for its architecture and history." },
    "IS": { countryName: "Iceland", description: "A Nordic island country known for its dramatic landscapes." },
    "IN": { countryName: "India", description: "A South Asian country known for its diverse cultures and history." },
    "ID": { countryName: "Indonesia", description: "An archipelago in Southeast Asia made up of thousands of islands." },
    "IR": { countryName: "Iran", description: "A country in the Middle East known for its rich cultural heritage." },
    "IQ": { countryName: "Iraq", description: "A country in the Middle East with a rich history dating back to ancient Mesopotamia." },
    "IE": { countryName: "Ireland", description: "An island nation in the North Atlantic, known for its lush landscapes." },
    "IL": { countryName: "Israel", description: "A Middle Eastern country with a significant historical and religious heritage." },
    "IT": { countryName: "Italy", description: "A European country known for its history, art, and cuisine." },
    "JM": { countryName: "Jamaica", description: "A Caribbean island nation known for its music and culture." },
    "JP": { countryName: "Japan", description: "An island nation in East Asia known for its technology and culture." },
    "JO": { countryName: "Jordan", description: "A Middle Eastern country known for historical sites like Petra." },
    "KZ": { countryName: "Kazakhstan", description: "A vast Central Asian country known for its steppes." },
    "KE": { countryName: "Kenya", description: "An East African country known for its savannas and wildlife." },
    "XK": { countryName: "Kosovo", "description": "A partially recognized country in Southeast Europe." },
    "KW": { countryName: "Kuwait", description: "A small, wealthy country in the Middle East." },
    "KG": { countryName: "Kyrgyzstan", description: "A Central Asian country known for its mountainous terrain." },
    "LA": { countryName: "Lao PDR", description: "A landlocked country in Southeast Asia known for its mountainous terrain." },
    "LV": { countryName: "Latvia", description: "A Baltic nation known for its architecture and forests." },
    "LB": { countryName: "Lebanon", description: "A Middle Eastern country on the Mediterranean coast." },
    "LS": { countryName: "Lesotho", description: "A small, landlocked country in Southern Africa surrounded by South Africa." },
    "LR": { countryName: "Liberia", description: "A West African country founded by freed American slaves." },
    "LY": { countryName: "Libya", description: "A North African country with vast deserts and a Mediterranean coastline." },
    "LT": { countryName: "Lithuania", description: "A Baltic nation with a rich history." },
    "LU": { countryName: "Luxembourg", description: "A small, landlocked country in Western Europe known for its wealth." },
    "MK": { countryName: "Macedonia", "description": "A Balkan country known for its historical significance." },
    "MG": { countryName: "Madagascar", description: "An island nation off the southeast coast of Africa known for its biodiversity." },
    "MW": { countryName: "Malawi", description: "A landlocked country in southeastern Africa known for its lake." },
    "MI": { countryName: "Malaysia", description: "A Southeast Asian country known for its beaches and rainforests." },
    "MV": { countryName: "Maldives", description: "A tropical paradise in the Indian Ocean." },
    "ML": { countryName: "Mali", description: "A landlocked country in West Africa with a rich history." },
    "MT": { countryName: "Malta", description: "A small island nation in the Mediterranean Sea." },
    "MH": { countryName: "Marshall Islands", description: "A sprawling chain of volcanic islands in the central Pacific Ocean." },
    "MQ": { countryName: "Martinique", "description": "A French overseas department in the Caribbean." },
    "MR": { countryName: "Mauritania", description: "A vast desert nation in West Africa." },
    "MU": { countryName: "Mauritius", description: "An island nation in the Indian Ocean known for its beaches." },
    "YT": { countryName: "Mayotte", "description": "A French overseas department located in the Indian Ocean." },
    "MX": { countryName: "Mexico", description: "A North American country known for its rich culture and history." },
    "MD": { countryName: "Moldova", description: "A landlocked country in Eastern Europe." },
    "MN": { countryName: "Mongolia", description: "A landlocked country in East Asia known for its nomadic culture." },
    "ME": { countryName: "Montenegro", description: "A Balkan country with rugged mountains and medieval villages." },
    "MS": { countryName: "Montserrat", description: "A British Overseas Territory in the Caribbean." },
    "MA": { countryName: "Morocco", description: "A North African country known for its culture and landscapes." },
    "MZ": { countryName: "Mozambique", description: "A country in Southeast Africa with a long Indian Ocean coastline." },
    "MM": { countryName: "Myanmar", "description": "A country in Southeast Asia, also known as Burma." },
    "NA": { countryName: "Namibia", description: "A country in Southern Africa known for the Namib Desert." },
    "NR": { countryName: "Nauru", description: "The smallest island country in the world, located in the Pacific Ocean." },
    "NP": { countryName: "Nepal", description: "A landlocked country in South Asia known for the Himalayas." },
    "NL": { countryName: "Netherlands", description: "A European country known for its flat landscape and canals." },
    "NC": { countryName: "New Caledonia", description: "A French territory in the South Pacific." },
    "NZ": { countryName: "New Zealand", description: "An island nation in the South Pacific known for its diverse landscapes." },
    "BQBO": { countryName: "Netherlands", "description": "A country in Western Europe known for its canals and windmills." },
    "NI": { countryName: "Nicaragua", description: "A Central American country known for its lakes and volcanoes." },
    "NE": { countryName: "Niger", description: "A landlocked country in West Africa with vast deserts." },
    "NMI": { countryName: "Northern Mariana Islands", "description": "A U.S. commonwealth in the Pacific Ocean." },
    "NG": { countryName: "Nigeria", description: "The most populous country in Africa, known for its cultural diversity." },
    "NW": { countryName: "Norway", description: "A Scandinavian country known for its fjords and mountains." },
    "OM": { countryName: "Oman", description: "A country on the southeastern coast of the Arabian Peninsula." },
    "PK": { countryName: "Pakistan", description: "A South Asian country with diverse cultures and landscapes." },
    "PW": { countryName: "Palau", description: "An island nation in the Western Pacific Ocean." },
    "PS": { countryName: "Palestine", "description": "A region in the Middle East with complex political and historical issues." },
    "PA": { countryName: "Panama", description: "A Central American country known for the Panama Canal." },
    "PG": { countryName: "Papua New Guinea", description: "An island nation in the Pacific Ocean known for its cultural diversity." },
    "PY": { countryName: "Paraguay", description: "A landlocked country in South America with a rich history." },
    "PE": { countryName: "Peru", description: "A South American country known for its ancient Incan city, Machu Picchu." },
    "PH": { countryName: "Philippines", description: "An archipelago in Southeast Asia with thousands of islands." },
    "PL": { countryName: "Poland", description: "A Central European country with a rich history and culture." },
    "PT": { countryName: "Portugal", description: "A European country on the Iberian Peninsula known for its history and coastline." },
    "PR": { countryName: "Puerto Rico", description: "A Caribbean island and U.S. territory with a vibrant culture." },
    "QA": { countryName: "Qatar", description: "A small, wealthy country in the Middle East." },
    "CG": { countryName: "Republic of Congo", description: "A country located in Central Africa, known for its lush rainforests, diverse wildlife, and the Congo River. Its capital city is Brazzaville." },
    "RE": { countryName: "Réunion", "description": "A French overseas department in the Indian Ocean." },
    "RO": { countryName: "Romania", description: "A European country known for its medieval towns and castles." },
    "RU": { countryName: "Russian Federation", description: "The largest country in the world, spanning Europe and Asia." },
    "RW": { countryName: "Rwanda", description: "A landlocked country in East Africa known as the 'Land of a Thousand Hills'." },
    "BQSA": { countryName: "Saba (Netherlands", description: "A special municipality of the Netherlands located in the Caribbean, known for its volcanic landscapes and rich biodiversity." },
    "KN": { countryName: "Saint Kitts and Nevis", description: "A two-island country in the Caribbean known for its beaches." },
    "LC": { countryName: "Saint Lucia", description: "A Caribbean island nation known for its volcanic beaches." },
    "VC": { countryName: "Saint Vincent and the Grenadines", description: "A country in the Caribbean known for its islands and beaches." },
    "BL": { countryName: "Saint-Barthélemy", description: "A French overseas collectivity located in the Caribbean, known for its luxurious resorts and beautiful beaches." },
    "MF": { countryName: "Saint Martin", "description": "A French overseas collectivity in the Caribbean." },
    "SM": { countryName: "Samoa", description: "An island nation in the South Pacific known for its Polynesian culture." },
    "ST": { countryName: "São Tomé and Principe", description: "An island nation in the Gulf of Guinea." },
    "SA": { countryName: "Saudi Arabia", description: "A Middle Eastern country known for its deserts and oil wealth." },
    "SN": { countryName: "Senegal", description: "A West African country known for its music and culture." },
    "RS": { countryName: "Serbia", "description": "A landlocked country in Southeast Europe known for its history and culture." },
    "SEY": { countryName: "Seychelles", description: "An island nation in the Indian Ocean known for its beaches." },
    "SL": { countryName: "Sierra Leone", description: "A West African country known for its diamond mines." },
    "SX": { countryName: "Sint Maarten", "description": "A Dutch Caribbean island known for its beaches and tourism." },
    "SK": { countryName: "Slovakia", description: "A Central European country known for its castles and mountains." },
    "SI": { countryName: "Slovenia", description: "A Central European country known for its lakes and mountains." },
    "SOL": { countryName: "Solomon Islands", description: "An island nation in the South Pacific known for its WWII history." },
    "SO": { countryName: "Somalia", description: "A country in the Horn of Africa with a long coastline." },
    "ZA": { countryName: "South Africa", description: "A country on the southernmost tip of Africa known for its diversity." },
    "KR": { countryName: "Republic of Korea", description: "A highly developed East Asian country known for its technology." },
    "SS": { countryName: "South Sudan", description: "The youngest country in the world, located in East Africa." },
    "ES": { countryName: "Spain", description: "A European country known for its history, culture, and beaches." },
    "LK": { countryName: "Sri Lanka", description: "An island nation in South Asia known for its beaches and history." },
    "BQSE": { countryName: "Saba (Netherlands", description: "A special municipality of the Netherlands located in the Caribbean, known for its historical sites and marine reserves." },
    "SD": { countryName: "Sudan", description: "A large country in Northeast Africa with a rich history." },
    "SR": { countryName: "Suriname", description: "A small country on the northeastern coast of South America." },
    "SZ": { countryName: "Swaziland", description: "A small, landlocked country in Southern Africa." },
    "SE": { countryName: "Sweden", description: "A Scandinavian country known for its forests and lakes." },
    "CH": { countryName: "Switzerland", description: "A landlocked country in Central Europe known for its mountains." },
    "SY": { countryName: "Syria", description: "A Middle Eastern country with a rich historical and cultural heritage." },
    "TW": { countryName: "Taiwan", description: "An island nation in East Asia known for its technology and night markets." },
    "TJ": { countryName: "Tajikistan", description: "A landlocked country in Central Asia known for its rugged terrain." },
    "TZ": { countryName: "Tanzania", description: "An East African country known for its wildlife and Mount Kilimanjaro." },
    "TH": { countryName: "Thailand", description: "A Southeast Asian country known for its beaches and temples." },
    "GM": { countryName: "The Gambia", "description": "The smallest country in Africa, surrounded by Senegal." },
    "TL": { countryName: "Timor-Leste", description: "A Southeast Asian nation occupying half the island of Timor." },
    "TG": { countryName: "Togo", description: "A small West African country with diverse cultures." },
    "TO": { countryName: "Tonga", description: "A Polynesian kingdom of more than 170 South Pacific islands." },
    "TT": { countryName: "Trinidad and Tobago", description: "A Caribbean nation known for its Carnival and cultural diversity." },
    "TN": { countryName: "Tunisia", description: "A North African country known for its Mediterranean coastline." },
    "TU": { countryName: "Turkey", description: "A transcontinental country known for its cultural and historical sites." },
    "TM": { countryName: "Turkmenistan", description: "A Central Asian country known for its vast deserts." },
    "TCI": { countryName: "Turks and Caicos Islands", description: "A British Overseas Territory known for its beaches." },
    "TV": { countryName: "Tuvalu", description: "A small island nation in the Pacific Ocean." },
    "UG": { countryName: "Uganda", description: "An East African country known for its wildlife and Lake Victoria." },
    "UA": { countryName: "Ukraine", description: "A large country in Eastern Europe known for its history and culture." },
    "AE": { countryName: "United Arab Emirates", description: "A Middle Eastern country known for its modern architecture and wealth." },
    "UK": { countryName: "United Kingdom", description: "A country in Western Europe known for its history and culture." },
    "US": { countryName: "United States", description: "A vast country in North America known for its cultural diversity." },
    "USVI": { countryName: "United States Virgin Island", description: "An unincorporated territory of the United States located in the Caribbean, known for its stunning beaches and tourism industry." },
    "UY": { countryName: "Uruguay", description: "A South American country known for its beaches and progressive policies." },
    "UZ": { countryName: "Uzbekistan", description: "A Central Asian country known for its Silk Road history." },
    "VA": { countryName: "Vanuatu", description: "A South Pacific island nation known for its coral reefs." },
    "VE": { countryName: "Venezuela", description: "A country in South America with vast natural resources." },
    "VN": { countryName: "Vietnam", description: "A Southeast Asian country known for its history and cuisine." },
    "EH": { countryName: "Western Sahara", description: "A disputed territory in North Africa." },
    "YE": { countryName: "Yemen", description: "A country at the southern end of the Arabian Peninsula." },
    "ZM": { countryName: "Zambia", description: "A landlocked country in Southern Africa known for Victoria Falls." },
    "ZW": { countryName: "Zimbabwe", description: "A landlocked country in Southern Africa known for its history and wildlife." }
  };


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
    countries.forEach(function (country) {
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
    const countryInfo = countryData[countryId] || { countryName: "Unknown Country", description: "No data available." };

    // Update the info panel content
    infoPanel.innerHTML = `<h2>${countryInfo.countryName}</h2><p>${countryInfo.description}</p>`;
    infoPanel.style.display = 'block'; // Ensure the panel is visible

    // Position the info panel relative to the clicked country
    const rect = countryElement.getBoundingClientRect();
    infoPanel.style.left = `${Math.min(window.innerWidth - infoPanel.offsetWidth - 10, rect.right + 10)}px`;
    infoPanel.style.top = `${rect.top}px`;
  }

  document.querySelectorAll('path[id]').forEach(function (country) {
    country.addEventListener('click', handleCountryClick);
  });

  // Hide info panel when clicking outside the map
  document.addEventListener('click', function (event) {
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
  document.querySelectorAll('path').forEach(function (country) {
    country.addEventListener('mouseover', function () {
      const countryId = country.id;
      const country = countryData[countryId] || { name: 'Unknown Country' };

      infoPanel.innerHTML = `<h2>${country.name}</h2><p>${country.info || ''}</p>`;
      infoPanel.style.display = 'block';

      const rect = country.getBoundingClientRect();
      infoPanel.style.left = `${Math.min(window.innerWidth - infoPanel.offsetWidth - 10, rect.right + 10)}px`;
      infoPanel.style.top = `${rect.top}px`;
    });

    country.addEventListener('mouseout', function () {
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
  earthMapContainer.addEventListener('click', function (event) {
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
        numberOfCountries: 54
      },
      "Asia": {
        name: "Asia",
        description: "Asia is the Earth's largest and most populous continent.",
        population: "4.7 billion",
        area: "44.58 million km²",
        numberOfCountries: 49
      },
      "Europe": {
        name: "Europe",
        description: "Europe is known for its rich history and diverse cultures.",
        population: "747 million",
        area: "10.18 million km²",
        numberOfCountries: 44
      },
      "North America": {
        name: "North America",
        description: "North America is home to a diverse range of climates and landscapes.",
        population: "592 million",
        area: "24.71 million km²",
        numberOfCountries: 23
      },
      "South America": {
        name: "South America",
        description: "South America is known for its rainforests and vibrant cultures.",
        population: "430 million",
        area: "17.84 million km²",
        numberOfCountries: 12
      },
      "Australia": {
        name: "Australia",
        description: "Australia is the smallest continent and a country known for its unique wildlife.",
        population: "26 million",
        area: "7.68 million km²",
        numberOfCountries: 14
      }
    };

    return continentDataMap[name] || {
      name: name,
      description: "No data available for this continent.",
      population: "N/A",
      area: "N/A",
      numberOfCountries: "N/A"
    };
  }

  // Show information panel for a continent
  function showContinentInfoPanel(continentData, targetElement) {
    infoPanel.innerHTML = `
    <h2>${continentData.name}</h2>
    <p>${continentData.description}</p>
    <p><strong>Population:</strong> ${continentData.population}</p>
    <p><strong>Area:</strong> ${continentData.area}</p>
    <p><strong>Number of Countries:</strong> ${continentData.numberOfCountries}</p>
  `;
    infoPanel.style.display = 'block';

    var rect = targetElement.getBoundingClientRect();
    infoPanel.style.left = `${rect.right + 10}px`;
    infoPanel.style.top = `${rect.top}px`;
  }

  continents.forEach(function (continent) {
    continent.addEventListener('click', handleContinentClick);
  });

  // Hide info panel when clicking on a blank area of the map
  earthMapContainer.addEventListener('click', function (event) {
    // Check if the clicked area is not a continent
    if (!event.target.closest('.continent')) {
      hideInfoPanel(); // Hide the info panel if the click is not on a continent
    }
  });

  // Hide Info Panel When Clicking Outside the Map
  document.addEventListener('click', function (event) {
    // Check if the click is outside the #earth-map-container element
    if (!event.target.closest('#earth-map-container')) {
      hideInfoPanel(); // Hide the info panel if the click is outside the map container
    }
  });

  backToEarthButton.addEventListener('click', async function () {
    await hideEarthMap(); // Hide the enlarged planet view
    // Fetch data for Earth and show it in the info panel
    const planetData = await fetchPlanetData('earth');
    showInfoPanel(planetData, currentClickedElement);
    showEarth(); // Show the Earth in its resized state
  });

  const staticPlanetData = {
    mercury: {
      additionalInfo: "Mercury has no atmosphere and its surface temperatures vary dramatically.",
      detailedDescription: "Mercury, the closest planet to the Sun, is the smallest in our solar system. Despite its proximity to the Sun, it isn't the hottest planet; that title belongs to Venus. Mercury's surface is covered with craters, much like our Moon, and it has no significant atmosphere to retain heat. This causes temperature fluctuations of more than 600 degrees Celsius between day and night. The planet has no moons, and it completes a full orbit around the Sun in just 88 Earth days.",
      imgSource: '<a href="https://wallpapers.com/png/mercury-planet-surface-texture-b14c57xc5tcrfa6w.html" target="_blank">Image Source - License: Free</a>',
    },
    venus: {
      additionalInfo: "Venus has a thick atmosphere that traps heat, making it the hottest planet.",
      detailedDescription: "Venus, often called Earth's 'sister planet' due to its similar size and composition, is a world of extremes. It has the densest atmosphere of the terrestrial planets, composed mainly of carbon dioxide, with clouds of sulfuric acid. This thick atmosphere creates a runaway greenhouse effect, making Venus the hottest planet in the solar system, with surface temperatures hot enough to melt lead. Venus rotates very slowly on its axis and in the opposite direction of most planets, meaning a day on Venus is longer than its year.",
      imgSource: '<a href="https://www.pngall.com/venus-png/download/88372" target="_blank">Image Source - License CC BY-NC 4.0</a>',
    },
    earth: {
      additionalInfo: "Earth is the only planet known to support life.",
      detailedDescription: "Earth, our home planet, is the third planet from the Sun and the only astronomical object known to harbor life. It has a diverse environment with a vast array of climates and ecosystems, supported by a unique atmosphere rich in oxygen and water. The planet is composed of multiple layers, including a solid crust, a molten mantle, and a dense core. Earth has a single moon that stabilizes its axial tilt and influences the tides. Its surface is 71% water, with the remaining 29% consisting of continents and islands.", 
      imgSource: '<a href="https://pngimg.com/image/25375" target="_blank">Image Source - License CC BY-NC 4.0</a>',
    },
    mars: {
      additionalInfo: "Mars is home to the tallest volcano in the solar system, Olympus Mons.",
      detailedDescription: "Mars, often referred to as the 'Red Planet' due to its reddish appearance, is the fourth planet from the Sun. It has the largest volcano in the solar system, Olympus Mons, and a vast canyon system, Valles Marineris. Mars has a thin atmosphere, primarily composed of carbon dioxide, which makes the planet much colder than Earth. Despite its harsh conditions, Mars has been a prime candidate for the search for extraterrestrial life, with evidence suggesting that liquid water once flowed on its surface. Mars has two small moons, Phobos and Deimos.",
      imgSource: '<a href="https://pngimg.com/image/61176" target="_blank">Image Source - License CC BY-NC 4.0</a>',
    },
    jupiter: {
      additionalInfo: "Jupiter is the largest planet in the solar system and has a powerful magnetic field.",
      detailedDescription: "Jupiter, the fifth planet from the Sun, is the largest in our solar system. It's known for its Great Red Spot, a massive storm that has raged for hundreds of years. Jupiter has a thick atmosphere composed mostly of hydrogen and helium, with clouds of ammonia crystals. The planet has at least 79 moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto. Jupiter's immense gravity and powerful magnetic field make it a dominant force in the solar system.",
      imgSource: '<a href="https://photojournal.jpl.nasa.gov/catalog/PIA02873" target="_blank">Cassini spacecraft, NASA - Image Source</a>',
    },
    saturn: {
      additionalInfo: "Saturn is best known for its extensive and complex ring system.",
      detailedDescription: "Saturn, the sixth planet from the Sun, is famous for its stunning ring system, which is composed of ice and rock particles. The planet itself is a gas giant, like Jupiter, with an atmosphere made mostly of hydrogen and helium. Saturn has over 80 known moons, including Titan, the second-largest moon in the solar system, which has a thick atmosphere and liquid methane lakes. Saturn's low density means it could float in water, assuming a body of water large enough could be found.",
      imgSource: '<a href="https://wallpapers.com/png/realistic-saturn-image-png-saj-pyweaoxxuw630fcx.html" target="_blank">Image Source - License: Free</a>',
    },
    uranus: {
      additionalInfo: "Uranus rotates on its side, making its axial tilt unique in the solar system.",
      detailedDescription: "Uranus, the seventh planet from the Sun, is a gas giant with a striking blue-green color due to the methane in its atmosphere. Unlike the other planets, Uranus rotates on its side, with an axial tilt of 98 degrees. This unusual tilt results in extreme seasonal variations, with each pole getting around 42 years of continuous sunlight followed by 42 years of darkness. Uranus has a faint ring system and at least 27 moons, with Miranda, Ariel, and Titania being some of the most notable.",
      imgSource: '<a href="https://wallpapers.com/png/uranus-southern-hemisphere-png-98-5njxvfq1ofdr5lkx.html" target="_blank">Image Source - License: Free</a>',
    },
    neptune: {
      additionalInfo: "Neptune has the strongest winds in the solar system, reaching speeds of up to 1,200 mph.",
      detailedDescription: "Neptune, the eighth and farthest known planet from the Sun, is a gas giant with a deep blue color, also caused by methane in its atmosphere. It has the most powerful winds in the solar system, with storms reaching speeds of up to 1,200 miles per hour. Neptune has a dynamic atmosphere with large storms, including the Great Dark Spot, similar to Jupiter's Great Red Spot. The planet has 14 known moons, with Triton being the largest and most geologically active.",
      imgSource: '<a href="https://commons.wikimedia.org/wiki/File:Neptune_cutout.png" target="_blank">NASA - Image Source</a>',
    },
    sun: {
      additionalInfo: "The Sun is the star at the center of our solar system and is responsible for the Earth's climate and weather.",
      detailedDescription: "The Sun is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process. It is by far the most important source of energy for life on Earth. The Sun's diameter is about 1.39 million kilometers, and it has a mass of about 330,000 times that of Earth. The Sun's surface, or photosphere, has a temperature of about 5,500 degrees Celsius (5,778 K), but its core reaches temperatures of 15 million degrees Celsius. The Sun is approximately 4.6 billion years old and has enough nuclear fuel to last for another 5 billion years.",
      imgSource: '<a href="https://pixabay.com/illustrations/sun-world-star-astronomy-globe-3108640/" target="_blank">Image Source - License: Pixabay Content License</a>',
    }
  };
  
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
    const staticData = staticPlanetData[name]; // Get static data for the planet
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
        discoveredBy: data.discoveredBy || "Unknown",
        discoveryDate: data.discoveryDate || "Unknown",
        avgTemp: `${data.avgTemp} K` || "Unknown",
        additionalInfo: staticData?.additionalInfo || "No additional information available.",
        detailedDescription: staticData?.detailedDescription || "No detailed description available.",
        imgSource: staticData?.imgSource || "Source not avvailable",
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
        discoveredBy: "N/A",
        discoveryDate: "N/A",
        avgTemp: "N/A",
        additionalInfo: "No additional information available.",
        detailedDescription: "No detailed description available.",
        imgSource: "Source not avvailable",
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
    <p><strong>It was discovered by:</strong> ${planetData.discoveredBy}</p>
    <p><strong>It was discovered on:</strong> ${planetData.discoveryDate}</p>
    <p><strong>Average Temperature:</strong> ${planetData.avgTemp}</p>
    <p><strong>Additional Information:</strong> ${planetData.additionalInfo}</p>
    <p><strong>Detailed Description:</strong> ${planetData.detailedDescription}</p>
    <p><strong>Image Source:</strong> ${planetData.imgSource}</p>

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
    planets.forEach(function (orbit) {
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

      turnBackButton.style.display = 'block'; // Show the turn back button
    }
  }

  // Function to handle the "turn back" action
  function handleTurnBack() {
    hideEarthMap(); // Hide the Earth map view

    // Reset and show all planets and their orbits
    planets.forEach(function (orbit) {
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
  planets.forEach(function (orbit) {
    orbit.addEventListener('click', async function (event) {
      event.stopPropagation(); // Prevent event bubbling
      var clickedPlanet = orbit.querySelector('.planet');
      var planetName = clickedPlanet.dataset.name;
      await handleElementClick(clickedPlanet, planetName); // Handle the planet click
    });
  });

  // Add click event listeners to all menu items
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', async function (event) {
      event.preventDefault(); // Prevent default link behavior
      var planetName = menuItem.title;
      var planetElement = document.querySelector(`.planet[data-name="${planetName}"]`);
      if (planetElement) {
        await handleElementClick(planetElement, planetName); // Handle the menu item click
      }
    });
  });

  sunMenuItem.addEventListener('click', async function(event) {
    event.preventDefault();
    if (currentClickedElement === sun) {
      handleTurnBack();
    } else {
      await handleElementClick(sun, sun.dataset.name);
    }
  });

  sun.addEventListener('click', async function() {
    await handleElementClick(sun, sun.dataset.name);
  });

  // Add click event listener to the sun element
  sun.addEventListener('click', async function () {
    await handleElementClick(sun, sun.dataset.name); // Handle sun click
  });

  // Add click event listener to the turn back button
  turnBackButton.addEventListener('click', function () {
    handleTurnBack(); // Handle turn back action
  });

  // Initially hide the turn back button
  turnBackButton.style.display = 'none';
});