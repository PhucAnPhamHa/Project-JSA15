
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFwaHVjYW4iLCJhIjoiY2x1NGFoYnk3MGtkYjJybjRmYzV4ODN3ZSJ9.e7oWi_4uOF9YlJYgOngbqw';

const API_KEY = 'c38b944c5c5d571f612a8c5c7763e912';
const weatherIcon = document.querySelector('.info-icon');
const cityName = document.querySelector('.info-text');
const temperature = document.querySelector('.info-text02');
const humidity = document.querySelector('.info-text10');
const windSpeed = document.querySelector('.info-text14');
const weatherState = document.querySelector('.info-text06');
const feelslike = document.querySelector('.info-text18');

const decityName = document.querySelector('.de-city-name');
const deweatherState = document.querySelector('.de-weather-state');
const detemperature = document.querySelector('.de-temperature');
const dehumidity = document.querySelector('.de-humidity');
const dewindSpeed = document.querySelector('.de-wind-speed');
const deweatherIcon = document.querySelector('.de-weather-icon');

const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v9',
        projection: 'globe', 
        zoom: 1,
        center: [30, 15]
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({});
    });
    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }

    map.on('mousedown', () => {
        userInteracting = true;
    });
    map.on('dragstart', () => {
        userInteracting = true;
    });

    map.on('moveend', () => {
        spinGlobe();
    });

    spinGlobe();
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));

let deData = {};
map.on('click', (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.lngLat.lat)
    console.log(e.lngLat.lng)
    fetch(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${e.lngLat.lng}&latitude=${e.lngLat.lat}&access_token=${mapboxgl.accessToken}`)
    .then((Response) => Response.json())
    .then((data) => {
        console.log(data);
        console.log(data.features[3].properties.name);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.features[3].properties.name}&appid=${API_KEY}&units=metric`)
        .then((response) => response.json())
        .then((wdata) =>{
            console.log(wdata);
            cityName.innerHTML = wdata.name;
            weatherState.innerHTML = wdata.weather[0].description;
            temperature.innerHTML = Math.round(wdata.main.temp) + " C";
            humidity.innerHTML = wdata.main.humidity + " %";
            windSpeed.innerHTML = wdata.wind.speed + " km/h";
            feelslike.innerHTML = wdata.main.feels_like + " C";
            weatherIcon.src = `http://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`;

            deData = [{
                ten : wdata.name,
                mota : wdata.weather[0].description,
                nhiet : Math.round(wdata.main.temp),
                doam : wdata.main.humidity,
                gio : wdata.wind.speed,
                icon : `http://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`,
            }];

            localStorage.setItem('deData', JSON.stringify(deData));
            const detailData = JSON.parse(localStorage.getItem('deData'));
            console.log(detailData);

    })
        .catch((error) =>{
        console.log(error);
        alert('fetch API fail');
        })
    })
});

map.on('click', function(e){
    let marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
});

let sdData = [];
const bookmark = document.getElementById('bookmark');
bookmark.addEventListener('click', () => {
    if (sdData.length < 4) {
        sdData = [{
            savename : cityName.innerHTML,
        }]
    } else {
        sdData.shift();
        sdData.push({
            savename : cityName.innerHTML,
        })
    }
    localStorage.setItem('sdData', JSON.stringify(sdData));
})




