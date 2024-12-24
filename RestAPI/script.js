/* Select form */
const search_form = document.querySelector('.header_form');

/* Add event listener to form */
search_form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = document.querySelector('#search').value;
  search_Ip_Address(value);
});

/* Function to search for an IP address */
async function search_Ip_Address(ip_address) {
  const api_key = 'at_s3ME3gJqeWK4W6oHO6lXVH6CxNm5w';
  try {
    const request = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip_address}`
    );
    const response = await request.json();

    const { location, ip, isp } = response;

    /* Update the UI */
    update_ui(ip, location.city, location.timezone, isp);

    /* Update the map */
    if (map !== undefined && map !== null) {
      map.remove();
    }
    create_map(location.lat, location.lng, location.country, location.region);
  } catch (error) {
    alert("Error fetching IP information. Please check the IP address and try again.");
  }
}

/* Function to update UI */
function update_ui(ip_address, location, timezone, isp) {
  document.querySelector('.address').textContent = ip_address;
  document.querySelector('.location').textContent = location;
  document.querySelector('.utc').textContent = 'UTC' + timezone;
  document.querySelector('.isp').textContent = isp;
}

/* Create map */
let map;
function create_map(lat, lng, country, region) {
  map = L.map('map').setView([lat, lng], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`${region}, ${country}`)
    .openPopup();
}

/* Initialize with default IP */
const defaultIp = '8.8.8.8';
search_Ip_Address(defaultIp);
