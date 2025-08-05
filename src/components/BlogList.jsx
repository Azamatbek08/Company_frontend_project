"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Style/Blog.css"

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlogs = async () => {
    setLoading(true)
    setError(null)
    try {
      // Tokenni olib tashladik
      const response = await fetch("http://127.0.0.1:8000/api/blogs/") // Tokenni yuborish o'chirildi

      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }
      const data = await response.json()
      setBlogs(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`, {
          method: "DELETE",
        }) // Tokenni yuborish o'chirildi

        if (!response.ok) {
          throw new Error("Failed to delete blog post")
        }
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) return <p>Loading blogs...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h2>Blogs</h2>
        <Link to="/admin/blogs/new" className="add-button">
          Add New Blog Post
        </Link>
      </div>
      {blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <table className="blog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Content</th>
              <th>Published At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>
                  {blog.image && <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="blog-image" />}
                </td>
                <td>{blog.title}</td>
                <td>{blog.content.substring(0, 100)}...</td>
                <td>{new Date(blog.published_at).toLocaleDateString()}</td>
                <td className="blog-actions">
                  <Link to={`/admin/blogs/edit/${blog.id}`} className="edit-button">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(blog.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BlogList
