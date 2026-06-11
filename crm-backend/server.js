require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Lead = require("./models/lead");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});

// Get all leads
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new lead
app.post("/leads", async (req, res) => {
  try {
    const lead = new Lead({
  name: req.body.name,
  email: req.body.email,
  phone: req.body.phone || "",
  company: req.body.company || "",
  source: req.body.source,
  priority: req.body.priority || "Medium",
  status: req.body.status || "New",
  notes: req.body.notes || "",
});

    const savedLead = await lead.save();

    res.status(201).json({
      message: "Lead added successfully",
      lead: savedLead,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update lead status
app.put("/leads/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json({
      message: "Status updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete lead
app.delete("/leads/:id", async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});