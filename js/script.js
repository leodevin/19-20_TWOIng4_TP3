function findCity(){
    let cityValue = document.getElementById('city-input').value;
    start(cityValue)

}


// Fonction appelée lors du click du bouton
function start(city) {
    // Création de l'objet apiWeather
    const apiWeather = new API_WEATHER(city);

    // Appel de la fonction fetchTodayForecast
    apiWeather
        .fetchTodayForecast()
        .then(function(response) {
            // Récupère la donnée de l'API au format JSON
            const data = response.data;
            console.log(data);

            // On récupère l'information principal
            const main = data.weather[0].main;
            const description = data.weather[0].description;
            const temp = data.main.temp;
            const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

            // Modifier le DOM
            document.getElementById('today-forecast-main').innerHTML = main;
            document.getElementById('today-forecast-more-info').innerHTML = description;
            document.getElementById('icon-weather-container').innerHTML = icon;
            document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;

        })
        .catch(function(error) {
            // Affiche une erreur
            console.error(error);
        });

    //appel de la fonction fetchThreeDaysForecast
    apiWeather
        .getThreeDayForecast()
        .then(function (response) {
            // Récupère la donnée de l'API au format JSON
            const data = response.data.list;
            console.log(data);

            getInformationDayFromJson(data[1],'tomorrow');
            getInformationDayFromJson(data[2],'after-tomorrow');
            getInformationDayFromJson(data[3],'after-tomorrow2');

        })
        .catch(function (error) {
            console.error(error);
        });

    function getInformationDayFromJson(dayData, domPrefix) {
        // On récupère l'information principal
        const main = dayData.weather[0].main;
        const description = dayData.weather[0].description;
        const temp = dayData.temp.day;
        const icon = apiWeather.getHTMLElementFromIcon(dayData.weather[0].icon);

        // Modifier le DOM
        document.getElementById(domPrefix + '-forecast-main').innerHTML = main;
        document.getElementById(domPrefix + '-forecast-more-info').innerHTML = description;
        document.getElementById(domPrefix + '-icon-weather-container').innerHTML = icon;
        document.getElementById(domPrefix + '-forecast-temp').innerHTML = `${temp}°C`;
    }
}
