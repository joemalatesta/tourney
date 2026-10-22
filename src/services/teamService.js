import * as tokenService from "./tokenService"
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/team`

async function create(team) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  })
  return res.json()
}

async function update(team) {
  try {
    console.log("Updating team:", team.teamName, team._id)
    console.log("New stats:", {
      wins: team.wins,
      loss: team.loss,
    })

    const res = await fetch(`${BASE_URL}/${team._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    })

    const result = await res.json()

    console.log("Update HTTP status:", res.status)
    console.log("Update response:", result)

    if (!res.ok) {
      throw new Error(
        `Team update failed (${res.status}): ${
          result.message || JSON.stringify(result)
        }`
      )
    }

    return result
  } catch (error) {
    console.error("Error updating team:", error)
    throw error
  }
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

async function deleteOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  })
  return res.json()
}

export { index, create, findOne, deleteOne, update }
