document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("都市名を入力してください");
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  document.getElementById("result").textContent = data.error
    ? `エラー: ${data.error}`
    : `${data.city} の天気：${data.weather} / ${data.temp}℃`;
});
