"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Style/Auth.css"

function Auth() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Siz bergan fetch so'rovi shu yerga joylashtirildi
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // State'dan olingan username
          password: password, // State'dan olingan password
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        // Xato xabarini backenddan olishga harakat qilamiz
        throw new Error(errorData.detail || JSON.stringify(errorData) || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      localStorage.setItem("authToken", `Bearer ${data.access}`) // Tokenni saqlash
      navigate("/admin/dashboard") // Muvaffaqiyatli kirishdan keyin yo'naltirish
    } catch (err) {
      setError(err.message) // Xatolarni ko'rsatish
    } finally {
      setLoading(false) // Yuklanish holatini tugatish
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Auth
