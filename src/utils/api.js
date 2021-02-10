const getApiUrl = (uri) => {
  return `http://192.168.31.159:3000/api/${uri}`;
}

const requestHeader = new Headers({
  'Content-Type': 'application/json',
})

export function login(data) {
  return fetch(getApiUrl('login'), {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: requestHeader,
    body: JSON.stringify(data)
  });
}
