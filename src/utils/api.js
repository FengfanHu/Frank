const getApiUrl = (uri) => {
  return `http://47.114.102.21:3000/api/${uri}`;
}

const requestHeader = new Headers({
  'Content-Type': 'application/json',
})

const authHeader = new Headers({
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('token')
})

export function login(data) {
  return fetch(getApiUrl('login'), {
    mode: 'cors',
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(data)
  });
}

export function getToken() {
  return fetch(getApiUrl('getToken'), {
    mode: 'cors',
    method: 'GET',
    headers: authHeader
  })
}

export function getCategories() {
  return fetch(getApiUrl('categories'), {
    mode: 'cors',
    method: 'GET'
  })
}

export function addCategory(value) {
  return fetch(getApiUrl('categories/add'), {
    mode: 'cors',
    method: 'POST',
    headers: authHeader,
    body: JSON.stringify({
      name: value
    })
  })
}

export function addArticle(data) {
  return fetch(getApiUrl('articles/add'), {
    mode: 'cors',
    method: 'POST',
    headers: authHeader,
    body: JSON.stringify(data)
  })
}
