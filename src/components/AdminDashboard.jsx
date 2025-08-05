"use client"

import { useState, useEffect } from "react"
import "./Style/AdminDashboard.css"

function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    teamMembers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("authToken")
        if (!token) {
          throw new Error("Authentication token not found. Please log in.")
        }

        const headers = {
          Authorization: `${token}`, // Bearer token format
        }

        const [projectsRes, blogsRes, teamRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/projects/", { headers }),
          fetch("http://127.0.0.1:8000/api/blogs/", { headers }),
          fetch("http://127.0.0.1:8000/api/team/", { headers }),
        ])

        if (!projectsRes.ok) throw new Error(`Failed to fetch projects: ${projectsRes.statusText}`)
        if (!blogsRes.ok) throw new Error(`Failed to fetch blogs: ${blogsRes.statusText}`)
        if (!teamRes.ok) throw new Error(`Failed to fetch team members: ${teamRes.statusText}`)

        const projectsData = await projectsRes.json()
        const blogsData = await blogsRes.json()
        const teamData = await teamRes.json()

        setStats({
          projects: projectsData.length,
          blogs: blogsData.length,
          teamMembers: teamData.length,
        })
      } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading dashboard statistics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <p className="error-message">Error: {error}</p>
        <p>Please ensure your backend is running and you are logged in.</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Admin Dashboard!</h2>
      <p>Here's a quick overview of your content:</p>

      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <h3>Total Projects</h3>
          <div className="stat-value">{stats.projects}</div>
        </div>
        <div className="dashboard-stat-card">
          <h3>Total Blog Posts</h3>
          <div className="stat-value">{stats.blogs}</div>
        </div>
        <div className="dashboard-stat-card">
          <h3>Total Team Members</h3>
          <div className="stat-value">{stats.teamMembers}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
