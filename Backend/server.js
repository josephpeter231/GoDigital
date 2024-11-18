const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const RECAPTCHA_SECRET_KEY = '6LeI3oIqAAAAABWT6cCLymJ8HN5W8lYEJ98SIb3L';
// MongoDB User Model
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  mobileNumber: { type: String, required: true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL of the profile picture
});

const User = mongoose.model("User", userSchema);
const mobileNumberRegex = /^[0-9]{10}$/;
// Registration route
app.post("/register", async (req, res) => {
  const { fullName, address, city, state, country, pincode, mobileNumber, email, password, confirmPassword, profilePicture } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  if (!mobileNumberRegex.test(mobileNumber)) {
    return res.status(400).json({ error: "Invalid mobile number format. Please enter a 10-digit number." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      mobileNumber,
      email,
      password: hashedPassword,
      profilePicture,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "secretKey", { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password, captcha } = req.body;

  // // Verify CAPTCHA
  // if (!captcha) {
  //   return res.status(400).json({ error: "Please complete the CAPTCHA." });
  // }

  try {
    // Verify reCAPTCHA with Google
    // const response = await axios.post(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`
    // );

    // if (!response.data.success) {
    //   return res.status(400).json({ error: "Captcha verification failed." });
    // }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }


    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/GoDigital?retryWrites=true&w=majority')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection failed', err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 
