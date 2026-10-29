
import { useEffect, useState } from "react"
import * as announcementService from "../../services/announcementService"

const AdminNews = ({ editable = false }) => {
  const [announcement, setAnnouncement] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await announcementService.index()

        // Use the first announcement as the landing-page message.
        const current = Array.isArray(data) ? data[0] : data

        if (current) {
          setAnnouncement(current)
          setMessage(current.message || "")
        }
      } catch (err) {
        console.error("Error loading announcement:", err)
        setError("Unable to load the announcement.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncement()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const data = {
        ...(announcement || {}),
        message,
      }

      let saved

      if (announcement?._id || announcement?.id) {
        saved = await announcementService.update(data)
      } else {
        saved = await announcementService.create(data)
      }

      setAnnouncement(saved)
      setMessage(saved.message ?? message)
      setSuccess("Announcement saved successfully.")
    } catch (err) {
      console.error("Error saving announcement:", err)
      setError("Unable to save the announcement.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading announcements...</p>

  return (
    <section className="bracket center column">
      <h2>Notes & Announcements</h2>

      {editable ? (
        <>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type league notes and announcements here..."
            rows={8}
            maxLength={10000}
            style={{
              width: "100%",
              maxWidth: "800px",
              boxSizing: "border-box",
              padding: "12px",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Announcement"}
          </button>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            textAlign: "left",
          }}
        >
          {message || "There are no announcements at this time."}
        </div>
      )}

      {error && <p role="alert">{error}</p>}
      {success && <p>{success}</p>}
    </section>
  )
}

export default AdminNews
