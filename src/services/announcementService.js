
import * as tokenService from "./tokenService"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/announcement`

async function index() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to load announcements")
  return res.json()
}

async function create(announcement) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcement),
  })

  if (!res.ok) throw new Error("Failed to create announcement")
  return res.json()
}

async function update(announcement) {
  const id = announcement._id || announcement.id

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcement),
  })

  if (!res.ok) throw new Error("Failed to update announcement")
  return res.json()
}

export { index, create, update }
