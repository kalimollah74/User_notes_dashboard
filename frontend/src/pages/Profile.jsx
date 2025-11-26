import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");

  const loadProfile = async () => {
    const res = await api.get("/profile");
    setProfile(res.data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) =>
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const res = await api.put("/profile", { name: profile.name });
    setProfile(res.data);
    setStatus("Profile updated successfully.");
  };

  return (
    <div className="page-container">
      <div className="card profile-card">
        <h1 className="card-title">Profile</h1>
        <p className="card-subtitle">View and update your basic details.</p>

        {status && <div className="status-message">{status}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              value={profile.email}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
