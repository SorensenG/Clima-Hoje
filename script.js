//0aff54a4e292337e5978f24f0c974e24
document.getElementById('search').addEventListener('submit', async (event) => {
event.preventDefault();

const cityName = document.getElementById('city-name').value;

if(!cityName){
    return showAlert('Digite o nome de uma cidade!!!');
}
const apiKey = '0aff54a4e292337e5978f24f0c974e24'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

const response = await fetch(url);
const json = await response.json();

if(json.cod === 200){
showInfo({
    cidade: json.name,
    pais :json.sys.country,
    temp: json.main.temp,
    tempMin: json.main.temp_min,
    tempMax: json.main.temp_max,
    desci: json.weather[0].description,
    icon: json.weather[0].icon,
    vento: json.wind.speed,
    umidade: json.main.humidity
})
} else {
    showAlert('Cidade não encontrada');
    document.getElementById('weather').classList.remove('show');
}
});


function showInfo(json) {
    showAlert('');
    document.getElementById('weather').classList.add('show');

    document.getElementById('title').innerHTML = `${json.cidade}/${json.pais}`;
    document.getElementById('temp_value').innerHTML = `${json.temp.toFixed(1)} <sup>°C</sup>`;
    document.getElementById('temp_description').innerHTML = `${json.desci}`;
    document.getElementById('min_temp').innerHTML = `Min: ${json.tempMin.toFixed(1)} <sup>°C</sup>`;
    document.getElementById('max_temp').innerHTML = `Max: ${json.tempMax.toFixed(1)} <sup>°C</sup>`;
    document.getElementById('wind').innerHTML = `Vento: ${json.vento} m/s`;
    document.getElementById('humidity').innerHTML = `Umidade: ${json.umidade}%`;
    document.getElementById('temp_img').src = `https://openweathermap.org/img/wn/${json.icon}@4x.png`;

    // Mapeamento de descrições para IDs
    const backgroundMapping = {
        'algumas nuvens': 'algumasnuvens',
        'nublado': 'nublado',
        'nuvens dispersas': 'nuvensdispersas',
        'céu limpo': 'limpo',
        'chuva leve': 'chuva-leve',
        'chuva': 'nuvens',
        'pouca neve': 'neve',
        'tempestade': 'tempestade',
        'névoa': 'nevoa'
    };

    // Selecionar o wrapper
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
        // Remover IDs anteriores
        wrapper.className = 'wrapper';
        // Adicionar novo ID com base na descrição
        const newId = backgroundMapping[json.desci.toLowerCase()];
        if (newId) {
            wrapper.id = newId;
        }
    }
}



function showAlert(msg){
    document.getElementById('alert').innerHTML= msg;
}



const element = document.querySelector('.wrapper');

if (temp_description=='nuvens dispersas'){
    element.id = 'algumasnuvens';
}if (temp_description=='nublado'){
    element.id = 'newWeather';
}if (temp_description=='sol'){
    element.id = 'newWeather';
}