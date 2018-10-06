var map = new L.Map('map');
map.setView([43.18626383865774,  -2.47069557354169], 15, true);

new L.TileLayer('https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png', {
  attribution: 'Map tiles &copy; <a href="https://mapbox.com">MapBox</a>',
}).addTo(map);

var osmb = new OSMBuildings(map).load();

//Locate Control
L.control.locate().addTo(map);

// Search Control
L.control.scale().addTo(map);
var searchControl = new L.esri.Controls.Geosearch().addTo(map);

  var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

setTimeout(function(){$('.pointer').fadeOut('slow');},3400);
//************************************************************


var now,
  date, time,
  timeRange, dateRange,
  timeRangeLabel, dateRangeLabel;

// Draw Line
var linePoints = [
	[43.19520752393501,  -2.450281947406495],
	[43.19477990946436,  -2.4522572342105207],
	[43.189805874383666,  -2.4550997649938893],
	[43.188493279788446,  -2.45982688989551],
	[43.1858273274195,  -2.4638355564922847],
	[43.18505442982223,  -2.4665671178900084],
	[43.18626383865774,  -2.47069557354169],
	[43.184614781657245,  -2.473942119100201], //Torrekua
	
	[43.184554703609564, -2.480118477333434], // Wenceslao Orbea
	[43.18461589048559,  -2.4807404584191204],
	[43.18525658728478,  -2.4810000963822176],
	[43.18602602691476,  -2.481862145552043], //
	[43.185000779087915,  -2.4815032790156124],
	[43.18446774285371,  -2.4821571996042167],
	
	[43.18498435099974,  -2.482353002959428],
	[43.18505006341775,  -2.4827467513710246],
	[43.184564259349145,  -2.482915194246374],
	[43.18443361573321,  -2.483139427175388],
	[43.18414729400186,  -2.4831952172459353],
	[43.18392169669383,  -2.4830970453033956],
	
	[43.183352079404415,  -2.4832601270913415],
	[43.18286626181251,  -2.483675333187648],
	[43.1823101251141,  -2.484401675586952],
	[43.18195729543248,  -2.48470422888866],
	[43.18162324266106,  -2.4857964202926155], //Tiburcio Anitua 22
	[43.18092852607501,  -2.487841336169936]// Tiburcio Anitua 25
];
var line = L.polyline(linePoints, {color: 'green'}).addTo(map);

// Marker click handler
function onClick(e) {
  window.location = "http://www.euskotren.eus/sites/www2.euskotren.es/files/170901%20Itinerarios.pdf"; 
  alert(this.getLatLng());
}
                
// Draw Markers
L.marker([43.184554703609564, -2.480118477333434]).addTo(map).on('click', onClick);
L.marker([43.19520752393501,  -2.450281947406495]).addTo(map).on('click', onClick); //Tekniker
L.marker([43.19477990946436,  -2.4522572342105207]).addTo(map).on('click', onClick); //Debegesa
L.marker([43.189805874383666,  -2.4550997649938893]).addTo(map).on('click', onClick); //Azitain
L.marker([43.188493279788446,  -2.45982688989551]).addTo(map).on('click', onClick); //Barrena
L.marker([43.1858273274195,  -2.4638355564922847]).addTo(map).on('click', onClick); //Urkizu
L.marker([43.18505442982223,  -2.4665671178900084]).addTo(map).on('click', onClick); //Mercado
L.marker([43.18626383865774,  -2.47069557354169]).addTo(map).on('click', onClick); //Correos
L.marker([43.184614781657245,  -2.473942119100201]).addTo(map).on('click', onClick); //San Juan
L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Torrekua
L.marker([43.18602602691476,  -2.481862145552043]).addTo(map).on('click', onClick); //Wenceslao Orbea
L.marker([43.18446774285371,  -2.4821571996042167]).addTo(map).on('click', onClick); //Ziriako Agirre
L.marker([43.18392169669383,  -2.4830970453033956]).addTo(map).on('click', onClick); //Asola Igartza
L.marker([43.18162324266106,  -2.4857964202926155]).addTo(map).on('click', onClick); //Tiburcio Anitua 21
L.marker([43.18092852607501,  -2.487841336169936]).addTo(map).on('click', onClick); //Tiburcio Anitua 25

// Animated Bus Icon
var animatedMarker = L.animatedMarker(line.getLatLngs());
map.addLayer(animatedMarker);

// Date change handler
function changeDate() {
  var Y = now.getFullYear(),
    M = now.getMonth(),
    D = now.getDate(),
    h = now.getHours(),
    m = now.getMinutes();

  timeRangeLabel.innerText = pad(h) + ':' + pad(m);
  dateRangeLabel.innerText = Y + '-' + pad(M+1) + '-' + pad(D);

  osmb.date(new Date(Y, M, D, h, m));
}

function onTimeChange() {
  now.setHours(0);
  now.setMinutes(this.value);
  changeDate();
}

function onDateChange() {
  now.setMonth(0);
  now.setDate(this.value);
  changeDate();
}

function pad(v) {
  return (v < 10 ? '0' : '') + v;
}

timeRange = document.getElementById('time');
dateRange = document.getElementById('date');
timeRangeLabel = document.querySelector('*[for=time]');
dateRangeLabel = document.querySelector('*[for=date]');

now = new Date;
changeDate();

// init with day of year
var Jan1 = new Date(now.getFullYear(), 0, 1);
dateRange.value = Math.ceil((now-Jan1)/86400000);

timeRange.value = now.getHours()*60+now.getMinutes();

timeRange.addEventListener('change', onTimeChange);
dateRange.addEventListener('change', onDateChange );
timeRange.addEventListener('input', onTimeChange);
dateRange.addEventListener('input', onDateChange);

//ResetDateandTime
document.getElementById("reset").addEventListener("click", resetDate);

function resetDate() {
  now=new Date;
  changeDate();
  var Jan1 = new Date(now.getFullYear(), 0, 1);
  dateRange.value = Math.ceil((now-Jan1)/86400000);
  timeRange.value = now.getHours()*60+now.getMinutes();
}



