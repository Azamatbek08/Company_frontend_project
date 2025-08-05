"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Style/Blog.css"

function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null) // For file object
  const [imageUrl, setImageUrl] = useState("") // For displaying existing image
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Blogni olish (edit qilish uchun)
  useEffect(() => {
    if (id) {
      setLoading(true)
      // Tokensiz ishlash uchun, faqat URLga so‘rov yuboramiz
      fetch(`http://127.0.0.1:8000/api/blogs/${id}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch blog post")
          return res.json()
        })
        .then((data) => {
          setTitle(data.title)
          setContent(data.content)
          setImageUrl(data.image)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id])

  // Formani yuborish
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    if (image) {
      formData.append("image", image)
    }

    const method = id ? "PUT" : "POST"
    const url = id ? `http://127.0.0.1:8000/api/blogs/${id}/` : "http://127.0.0.1:8000/api/blogs/"

    try {
      const response = await fetch(url, {
        method: method,
        body: formData, // Image va boshqa ma'lumotlar bilan yuborish
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData) || "Failed to save blog post")
      }

      navigate("/admin/blogs")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && id) return <p>Loading blog data...</p>

  return (
    <div className="blog-form-container">
      <div className="blog-form-header">
        <h2>{id ? "Edit Blog Post" : "Add New Blog Post"}</h2>
        <button onClick={() => navigate("/admin/blogs")} className="back-button">
          Back to List
        </button>
      </div>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          {imageUrl && !image && <img src={imageUrl || "/placeholder.svg"} alt="Current" className="image-preview" />}
          {image && (
            <img src={URL.createObjectURL(image) || "/placeholder.svg"} alt="Preview" className="image-preview" />
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Blog Post"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default BlogForm
