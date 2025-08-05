"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Style/Project.css"

function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null) // For file object
  const [imageUrl, setImageUrl] = useState("") // For displaying existing image
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      const token = localStorage.getItem("authToken")
      fetch(`http://127.0.0.1:8000/api/projects/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch project")
          return res.json()
        })
        .then((data) => {
          setTitle(data.title)
          setDescription(data.description)
          setImageUrl(data.image) // Set existing image URL
          setLink(data.link || "")
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
    formData.append("title", title)
    formData.append("description", description)
    if (image) {
      formData.append("image", image) // Append file object
    }
    if (link) {
      formData.append("link", link)
    }

    const token = localStorage.getItem("authToken")
    const method = id ? "PUT" : "POST"
    const url = id ? `http://127.0.0.1:8000/api/projects/${id}/` : "http://127.0.0.1:8000/api/projects/"

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type for FormData, browser sets it automatically
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData) || "Failed to save project")
      }

      navigate("/admin/projects")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && id) return <p>Loading project data...</p>

  return (
    <div className="project-form-container">
      <div className="project-form-header">
        <h2>{id ? "Edit Project" : "Add New Project"}</h2>
        <button onClick={() => navigate("/admin/projects")} className="back-button">
          Back to List
        </button>
      </div>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          {imageUrl && !image && <img src={imageUrl || "/placeholder.svg"} alt="Current" className="image-preview" />}
          {image && (
            <img src={URL.createObjectURL(image) || "/placeholder.svg"} alt="Preview" className="image-preview" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="link">Link (Optional):</label>
          <input type="url" id="link" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default ProjectForm
