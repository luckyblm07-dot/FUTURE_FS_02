import "./App.css";
import { useState, useEffect } from "react";
const API_URL = "https://future-fs-02-zep2.onrender.com";

function App() {
  const [leads, setLeads] = useState([]);

useEffect(() => {
 fetch(`${API_URL}/leads`)
    .then((response) => response.json())
    .then((data) => setLeads(data))
    .catch((error) => console.error(error));
}, []);
const addLead = async () => {
  if (!name || !email || !source) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  name,
  email,
  phone,
  company,
  source,
  priority,
  status: "New",
  notes: "",
}),
    });

    const data = await response.json();

    setLeads([data.lead, ...leads]);

    setName("");
setEmail("");
setPhone("");
setCompany("");
setSource("");
setPriority("Medium");
  } catch (error) {
    console.error(error);
    alert("Failed to add lead");
  }
};
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [source, setSource] = useState("");
const [phone, setPhone] = useState("");
const [company, setCompany] = useState("");
const [priority, setPriority] = useState("Medium");
const [search, setSearch] = useState("");
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loggedIn, setLoggedIn] = useState(false);
if (!loggedIn) {
  return (
    <div className="login-page">

      <div className="login-box">

        <h2>🚀 SmartLead CRM</h2>

        <p className="login-subtitle">
  Manage, Track & Convert Leads Efficiently
</p>

        <input
  type="email"
 placeholder="Enter your email address"
  value={loginEmail}
  onChange={(e) => setLoginEmail(e.target.value)}
/>

        <input
  type="password"
  placeholder=" Enter your password"
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
/>
<div className="login-options">
  <label>
    <input type="checkbox" />
    Remember Me
  </label>

  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      alert("Feature coming soon!");
    }}
  >
    Forgot Password?
  </a>
</div>
        <button
  onClick={() => {
    if (!loginEmail.trim()) {
      alert("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(loginEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!loginPassword) {
      alert("Please enter your password.");
      return;
    }

    if (loginPassword.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    setLoggedIn(true);
  }}
>
  Login
</button>

      </div>

    </div>
  );
}
  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>Mini CRM</h2>

        <ul>
          <li>📊 Dashboard</li>
          <li>👥 Leads</li>
          <li>📝 Notes</li>
          <li>⚙️ Settings</li>
          <button
  className="logout-btn"
  onClick={() => setLoggedIn(false)}
>
  Logout
</button>
        </ul>
      </div>

      <div className="main-content">

       <h1>🚀 SmartLead CRM</h1>
<p className="dashboard-subtitle">
  Manage, Track & Convert your clients efficiently.
</p>

        <div className="stats">

          <div className="card">
            <h3>{leads.length}</h3>
            <p>Total Leads</p>
          </div>
          <div className="card">
  <h3>
    {leads.filter((lead) => lead.status === "New").length}
  </h3>
  <p>New Leads</p>
</div>
          <div className="card">
            <h3>
  {leads.filter(lead => lead.status === "Contacted").length}
</h3>
            <p>Contacted</p>
          </div>

          <div className="card">
            <h3>
  {leads.filter(lead => lead.status === "Converted").length}
</h3>
            <p>Converted</p>
          </div>

        </div>
        <h2>Add New Lead</h2>

<div className="lead-form">

  <input
    type="text"
    placeholder="Enter Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
  type="text"
  placeholder="Enter Phone"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

<input
  type="text"
  placeholder="Enter Company"
  value={company}
  onChange={(e) => setCompany(e.target.value)}
/>
  <input
    type="text"
    placeholder="Enter Source"
    value={source}
    onChange={(e) => setSource(e.target.value)}
  />
  
  <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option value="High">🔥 High</option>
  <option value="Medium">🟡 Medium</option>
  <option value="Low">🟢 Low</option>
</select>  

  <button onClick={addLead}>
    Add Lead
  </button>


</div>
<input
  type="text"
  placeholder="🔍 Search by Name, Email or Company"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>
        <h2>Recent Leads</h2>
       

<table className="lead-table">
  <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Company</th>
    <th>Source</th>
    <th>Priority</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

  <tbody>
  {leads
  .filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
  lead.email.toLowerCase().includes(search.toLowerCase()) ||
  (lead.company || "").toLowerCase().includes(search.toLowerCase())
  )
  .map((lead, index) =>  (
    <tr key={index}>
      <td>{lead.name}</td>
<td>{lead.email}</td>
<td>{lead.phone}</td>
<td>{lead.company}</td>
<td>{lead.source}</td>
<td>
  <span
    className={
      lead.priority === "High"
        ? "priority-high"
        : lead.priority === "Medium"
        ? "priority-medium"
        : "priority-low"
    }
  >
    {lead.priority}
  </span>
</td>
      <td>
       <select
  value={lead.status}
  onChange={async (e) => {
    const newStatus = e.target.value;

    try {
      const response = awaitfetch(`${API_URL}/leads/${lead._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      setLeads(
        leads.map((item) =>
          item._id === lead._id ? data.lead : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  }}
>
  <option>New</option>
  <option>Contacted</option>
  <option>Converted</option>
</select>
      </td>
      <td>
  <button
  onClick={async () => {
    if (window.confirm("Delete this lead?")) {
      try {
        await fetch(`${API_URL}/leads/${lead._id}`, {
          method: "DELETE",
        });

        setLeads(leads.filter((item) => item._id !== lead._id));
      } catch (error) {
        console.error(error);
        alert("Failed to delete lead");
      }
    }
  }}
>
  Delete
</button>
</td>
    </tr>
  ))}
</tbody>
</table>
<h2>Follow-up Notes</h2>

<div className="notes-section">

  <div className="note-card">
    <h4>Rahul Sharma</h4>
    <p>Interested in website development services.</p>
  </div>

  <div className="note-card">
    <h4>Priya Singh</h4>
    <p>Requested pricing details. Follow up next week.</p>
  </div>

  <div className="note-card">
    <h4>Arjun Kumar</h4>
    <p>Converted into a client. Project started.</p>
  </div>

</div>

      </div>

    </div>
  );
}

export default App;