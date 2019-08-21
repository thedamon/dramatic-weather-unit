exports.handler = function(event, context, callback) {
  console.log(
    `{\ncontext: ${JSON.stringify(context, null, 2)},\nevent: ${JSON.stringify(
      event,
      null,
      2
    )}\n}`
  );
  callback(null, {
    statusCode: 200,
    body: `Your IP address ${event.headers['client-ip']}`
  });
};

exports.handler = async (event, context, callback) => {
  const ip = event.headers['client-ip'];
  const ipUrl = 'https://ipinfo.io/' + ip;
  const serve = body => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };

  try {
    let response = await fetch(ipUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_IPINFO}`,
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
