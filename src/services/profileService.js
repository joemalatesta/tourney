import * as tokenService from "./tokenService"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
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

async function update(profile) {
  const res = await fetch(`${BASE_URL}/${profile._id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })
  return res.json()
}

export { getAllProfiles, findOne, update }
