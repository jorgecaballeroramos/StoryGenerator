var country;
var ip;
function getLocation() {
    loadJSON('https://freegeoip.net/json/', gotDataLocation);
}
function gotDataLocation(data) {
  ip = data.ip;
  country = data.country_name;
  //console.log('IP: '+ip+' COUNTRY: '+country);
}
