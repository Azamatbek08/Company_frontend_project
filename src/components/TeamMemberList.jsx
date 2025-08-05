"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Style/TeamMember.css"

function TeamMemberList() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeamMembers = async () => {
    setLoading(true)
    setError(null)
    try {
      // No Authorization header needed for tokensiz
      const response = await fetch("http://127.0.0.1:8000/api/team/")
      if (!response.ok) {
        throw new Error("Failed to fetch team members")
      }
      const data = await response.json()
      setTeamMembers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        // No Authorization header needed for tokensiz
        const response = await fetch(`http://127.0.0.1:8000/api/team/${id}/`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete team member")
        }
        setTeamMembers(teamMembers.filter((member) => member.id !== id))
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) return <p>Loading team members...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="team-member-list-container">
      <div className="team-member-list-header">
        <h2>Team Members</h2>
        <Link to="/admin/team/new" className="add-button">
          Add New Team Member
        </Link>
      </div>
      {teamMembers.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        <table className="team-member-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Position</th>
              <th>Bio</th>
              <th>LinkedIn</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>
                  {member.photo && (
                    <img
                      src={member.photo || "/placeholder.svg"}
                      alt={member.full_name}
                      className="team-member-photo"
                    />
                  )}
                </td>
                <td>{member.full_name}</td>
                <td>{member.position}</td>
                <td>{member.bio.substring(0, 100)}...</td>
                <td>
                  {member.linkedin_url ? (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="team-member-actions">
                  <Link to={`/admin/team/edit/${member.id}`} className="edit-button">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(member.id)} className="delete-button">
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

export default TeamMemberList
