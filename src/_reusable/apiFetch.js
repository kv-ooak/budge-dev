const apiFetch = async (method, api, token, body) => {
  let headers;
  if (method === 'GET') {
    headers = { token };
  } else {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token,
    };
  }

  try {
    const res = await fetch(api, {
      method,
      body: JSON.stringify(body),
      headers,
    });

    const json = await res.json();
    if (json.error) throw json.error;
    return json;
  } catch (e) {
    return e;
  }
};

export default apiFetch;
