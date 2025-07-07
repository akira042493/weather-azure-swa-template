const fetch = require("node-fetch");

module.exports = async function (context, req) {
  const city = req.query.city || "Tokyo";
  const apikey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric&lang=ja`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (resp.status !== 200) {
      return context.res = { status: 400, body: { error: data.message } };
    }
    context.res = {
      headers: { "Content-Type": "application/json" },
      body: {
        city: data.name,
        weather: data.weather[0].description,
        temp: data.main.temp
      }
    };
  } catch (err) {
    context.res = { status: 500, body: { error: "Server error" } };
  }
};
