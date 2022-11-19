const Weather = ({ weather, city }) => {
  return `
    <html>
      <head>
        <style>
          *,*::before,*::after {
            padding: 0;
            margin: 0;
          }
          .wrap {
            padding: 20px;
          }
          .heading {
            display: flex;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1 class="heading">
          It’s <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" decoding="async" width="50" height="50" alt="${weather[0].main}" /> in ${city}!
          </h1>
          <p class="description">This page shows weather in your current location.</p>
        </div>
      </body>
    </html>
  `;
};

export default {
  async fetch(request, environment) {
    const { latitude: lat, longitude: lon, city } = request.cf;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return new Response(Weather({ weather: data.weather, city }), {
      headers: {
        "content-type": "text/html;charset=utf-8;",
      },
    });
    console.log(data.weather);
    return new Response(JSON.stringify(request.cf, null, 2), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
