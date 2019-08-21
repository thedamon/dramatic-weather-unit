exports.handler = async (event, context, callback) => {
  const { city, country } = event.headers;
  const weatherUrl = `//api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${
    process.env.API_KEY_OPENWEATHER
  }`;
  const serve = body => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };

  try {
    let response = await fetch(weatherUrl, {
      method: 'GET',
      headers: {
        //   Authorization: `Bearer ${process.env.API_KEY_IPINFO}`,
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    await serve(data);
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
    await serve(error);
  }
};
