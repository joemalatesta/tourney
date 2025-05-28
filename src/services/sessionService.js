import * as tokenService from "./tokenService"
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/session`

async function create(session) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  })
  return res.json()
}

async function createMatches(session) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  })
  return res.json()
}

async function update(session) {
  const res = await fetch(`${BASE_URL}/${session._id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  })
  return res.json()
}

async function index() {
  try {
    const res = await fetch(BASE_URL)
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function findOne(id) {
  if (id === undefined || id === null) return
  try {
    const res = await fetch(BASE_URL + `/${id}`)
    return res.json()
  } catch (err) {
    console.log(err)
  }
}
async function findOneMatch(sessionId, matchId) {
  try {
    const response = await fetch(
      `/api/matches?sessionId=${sessionId}&matchId=${matchId}`
    )

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

async function deleteOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  })
  return res.json()
}

export {
  index,
  create,
  findOne,
  deleteOne,
  update,
  findOneMatch,
  createMatches,
}
