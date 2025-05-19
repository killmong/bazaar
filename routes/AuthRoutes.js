const router = require("express").Router();
const User = require("../models/UserModel");

// Signup route
router.post("/signup", async (req, res, next) => {
  console.log("🚀 Signup request received:", req.body); // log incoming payload
  const { firstName, lastName, email, password, username } = req.body;

  try {
    // Check username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.error("❌ Signup error: Username already exists –", username); // log conflict
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.error("❌ Signup error: Email already exists –", email); // log conflict
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      username: username,
    });

    await user.save();
    console.log("✅ User created successfully:", user._id); // success log
    res.status(201).json(user);
  } catch (error) {
    console.error("🔥 Error in /signup:", error); // catch-all log
    next(error); // forward to error middleware :contentReference[oaicite:0]{index=0}
  }
});
router.put("/admin/update", async (req, res) => {
  try {
    const role = req.header("role");
    if (role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = req.body;

    const results = await Promise.all(
      updates.map(async (update) => {
        const { _id, ...fields } = update;
        return await User.findByIdAndUpdate(
          _id,
          { $set: fields },
          { new: true }
        );
      })
    );

    res.status(200).json({ message: "Users updated successfully", results });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update/:id", async (req, res, next) => {
  console.log("🔄 Update request received for user ID:", req.params.id);
  const { firstName, lastName, email, password, username } = req.body;
  const userId = req.params.id;

  try {
    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      console.error("❌ Update error: User not found –", userId); // log missing user
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.email = email || existingUser.email;
    existingUser.password = password || existingUser.password;
    existingUser.username = username || existingUser.username;

    await existingUser.save();
    console.log("✅ User updated successfully:", userId); // success log
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("🔥 Error in /update:", error); // catch-all log
    next(error); // forward to error middleware :contentReference[oaicite:1]{index=1}
  }
});
// Login route
router.post("/login", async (req, res, next) => {
  console.log("🔑 Login attempt:", req.body.username); // log login attempt
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error("❌ Login error: User not found –", username); // log missing user
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      console.error("❌ Login error: Invalid password for user –", username); // log bad password
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("🎉 Login successful for user:", username); // success log
    res.status(200).json(user);
  } catch (error) {
    console.error("🔥 Error in /login:", error); // catch-all log
    next(error); // forward to error middleware :contentReference[oaicite:1]{index=1}
  }
});

router.get("/getUsers", async (req, res) => {
  const { role } = req.headers;
  console.log("🚀 Role from headers:", role); // log incoming role
  console.log(role);

  if (role === "user") return res.status(403).json({ message: "Unauthorized" });
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error fetching users" });
  }
});
// Error‐handling middleware for this router
router.use((err, req, res, next) => {
  console.error("🚨 Unhandled error in auth router:", err.stack || err); // log stack trace :contentReference[oaicite:2]{index=2}
  res.status(500).json({ message: "Internal server error" });
});
module.exports = router;
