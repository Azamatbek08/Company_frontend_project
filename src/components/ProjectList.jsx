"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Style/Project.css"

function ProjectList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      // Tokensiz ishlash uchun Authorization headerni olib tashladik
      const response = await fetch("http://127.0.0.1:8000/api/projects/")
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        // Tokensiz ishlash uchun Authorization headerni olib tashladik
        const response = await fetch(`http://127.0.0.1:8000/api/projects/${id}/`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete project")
        }
        setProjects(projects.filter((project) => project.id !== id))
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) return <p>Loading projects...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>Projects</h2>
        <Link to="/admin/projects/new" className="add-button">
          Add New Project
        </Link>
      </div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>
                  {project.image && (
                    <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" />
                  )}
                </td>
                <td>{project.title}</td>
                <td>{project.description.substring(0, 100)}...</td>
                <td>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="project-actions">
                  <Link to={`/admin/projects/edit/${project.id}`} className="edit-button">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(project.id)} className="delete-button">
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

export default ProjectList
 