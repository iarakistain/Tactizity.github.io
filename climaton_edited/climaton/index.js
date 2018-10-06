var map = new L.Map('map');
map.setView([43.1837782 , -2.4716488], 17, true);
//map.locate({setView: true, timeout: 5000});

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



var linea59 = [
    
	[43.19520752393501,  -2.450281947406495],
	[43.19477990946436,  -2.4522572342105207],
	[43.189805874383666,  -2.4550997649938893],
	[43.188493279788446,  -2.45982688989551],
	[43.1858273274195,  -2.4638355564922847],
	[43.18505442982223,  -2.4665671178900084],
	[43.18626383865774,  -2.47069557354169],
	[43.184614781657245,  -2.473942119100201],
	[43.184554703609564, -2.480118477333434],
];

L.polyline(linea59,
    {color: 'green'}).addTo(map);

	
var linea58 = [
    [43.184554703609564, -2.480118477333434],
    [43.18333190621246, -2.4818248903330584],
    
];

L.polyline(linea58,
    {color: 'red'}).addTo(map);
	
	
	
	

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
//
function onClick(e) {
    
window.location = "http://www.euskotren.eus/sites/www2.euskotren.es/files/170901%20Itinerarios.pdf"; 
  alert(this.getLatLng());
}


var marker_0 = L.icon({
                            iconUrl: '/icon.png',
                        });
						
					
						
// Markers
var marker_0 = L.marker([43.184554703609564, -2.480118477333434]).addTo(map).on('click', onClick);

var marker_0 = L.marker([43.19520752393501,  -2.450281947406495]).addTo(map).on('click', onClick); //Tekniker

var marker_0 = L.marker([43.19477990946436,  -2.4522572342105207]).addTo(map).on('click', onClick); //Debegesa

var marker_0 = L.marker([43.189805874383666,  -2.4550997649938893]).addTo(map).on('click', onClick); //Azitain

var marker_0 = L.marker([43.188493279788446,  -2.45982688989551]).addTo(map).on('click', onClick); //Barrena

var marker_0 = L.marker([43.1858273274195,  -2.4638355564922847]).addTo(map).on('click', onClick); //Urkizu

var marker_0 = L.marker([43.18505442982223,  -2.4665671178900084]).addTo(map).on('click', onClick); //Mercado

var marker_0 = L.marker([43.18626383865774,  -2.47069557354169]).addTo(map).on('click', onClick); //Correos

var marker_0 = L.marker([43.184614781657245,  -2.473942119100201]).addTo(map).on('click', onClick); //San Juan

var marker_0 = L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Torrekua


var marker_0 = L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Wenceslao Orbea

var marker_0 = L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Ziriako Agirre

var marker_0 = L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Asola Igartza

var marker_0 = L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Tiburcio Anitua 21

var marker_0 = L.marker([43.184554703609564,  -2.480118477333434]).addTo(map).on('click', onClick); //Tiburcio Anitua 25

	//MovingMarker Options
                        var animationMarker = L.Marker.movingMarker(
                            [[43.184554703609564, -2.480118477333434],[43.184554703609564, -2.470118477333434]],
                            20000, {autostart: true});
    // Custom Icon Object
                        var greenIcon = L.icon({
                            iconUrl: 'icon.png',
                        });
   // Set icon to movingMarker
                        animationMarker.options.icon = greenIcon;
   // Add marker to Map
                        map.addLayer(animationMarker );