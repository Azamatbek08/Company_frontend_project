import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import Auth from "./components/Auth"
import AdminLayout from "./components/AdminLayout"
import AdminDashboard from "./components/AdminDashboard"
import ProjectList from "./components/ProjectList"
import ProjectForm from "./components/ProjectForm"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import TeamMemberList from "./components/TeamMemberList"
import TeamMemberForm from "./components/TeamMemberForm"
import "./App.css" // Keep your existing App.css

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null
  }

  return (
    <Router>
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Login Page */}
        <Route path="/admin/login" element={<Auth />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={isAuthenticated() ? <AdminLayout /> : <Navigate to="/admin/login" replace />}>
          <Route index element={<AdminDashboard />} /> {/* Default admin route */}
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Project Routes */}
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          {/* Blog Routes */}
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/edit/:id" element={<BlogForm />} />
          {/* Team Member Routes */}
          <Route path="team" element={<TeamMemberList />} />
          <Route path="team/new" element={<TeamMemberForm />} />
          <Route path="team/edit/:id" element={<TeamMemberForm />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
