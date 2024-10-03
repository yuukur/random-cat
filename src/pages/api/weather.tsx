export default async function handler(req, res) {
  const { city } = req.query;
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
  //.env.local
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();
  res.status(200).json({ data });
}
