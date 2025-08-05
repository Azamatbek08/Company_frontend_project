"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Style/TeamMember.css"

function TeamMemberForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [position, setPosition] = useState("")
  const [bio, setBio] = useState("")
  const [photo, setPhoto] = useState(null) // For file object
  const [photoUrl, setPhotoUrl] = useState("") // For displaying existing photo
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`http://127.0.0.1:8000/api/team/${id}/`) // Tokensiz so'rov
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch team member")
          return res.json()
        })
        .then((data) => {
          setFullName(data.full_name)
          setPosition(data.position)
          setBio(data.bio)
          setPhotoUrl(data.photo)
          setLinkedinUrl(data.linkedin_url || "")
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("full_name", fullName)
    formData.append("position", position)
    formData.append("bio", bio)
    if (photo) {
      formData.append("photo", photo)
    }
    if (linkedinUrl) {
      formData.append("linkedin_url", linkedinUrl)
    }

    const method = id ? "PUT" : "POST"
    const url = id ? `http://127.0.0.1:8000/api/team/${id}/` : "http://127.0.0.1:8000/api/team/"

    try {
      const response = await fetch(url, {
        method: method,
        body: formData, // no Authorization header for tokensiz
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData) || "Failed to save team member")
      }

      navigate("/admin/team")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && id) return <p>Loading team member data...</p>

  return (
    <div className="team-member-form-container">
      <div className="team-member-form-header">
        <h2>{id ? "Edit Team Member" : "Add New Team Member"}</h2>
        <button onClick={() => navigate("/admin/team")} className="back-button">
          Back to List
        </button>
      </div>
      <form onSubmit={handleSubmit} className="team-member-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
          {photoUrl && !photo && <img src={photoUrl || "/placeholder.svg"} alt="Current" className="image-preview" />}
          {photo && (
            <img src={URL.createObjectURL(photo) || "/placeholder.svg"} alt="Preview" className="image-preview" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="linkedinUrl">LinkedIn URL (Optional):</label>
          <input type="url" id="linkedinUrl" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Team Member"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default TeamMemberForm
