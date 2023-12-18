import * as tokenService from './tokenService' 
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/match`

async function create(match) {
  console.log(match);
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(match)
  })
  return res.json()
}

async function index() {
  try{
    const res = await fetch(BASE_URL)
    return res.json()
  }catch (err) {
    console.log(err);
  }
}

async function update(match) {
  const res = await fetch(`${BASE_URL}/${match._id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(match)
  })
  return res.json()
}

async function deleteOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return res.json()
}

export {
  index,
  create,
  update,
  deleteOne,
}