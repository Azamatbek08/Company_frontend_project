"use client"

import { useEffect } from "react"
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import "./Style/AdminLayout.css"

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      navigate("/admin/login")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/admin/login")
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "active" : ""}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/projects" className={location.pathname.startsWith("/admin/projects") ? "active" : ""}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/admin/blogs" className={location.pathname.startsWith("/admin/blogs") ? "active" : ""}>
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/admin/team" className={location.pathname.startsWith("/admin/team") ? "active" : ""}>
                Team Members
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </aside>
      <main className="admin-content">
        <header className="admin-header">
          <h1>{location.pathname.split("/").pop().replace(/-/g, " ").toUpperCase() || "DASHBOARD"}</h1>
        </header>
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
    </div>
  )
}

export default AdminLayout
