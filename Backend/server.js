const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Customer = require('./models/CustomerForm'); 
const Event = require('./models/Eventform');
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
    console.log(newUser)

    const token = jwt.sign({ userId: newUser._id }, "secretKey", { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
//Login Route
app.post('/login', async (req, res) => {
  const { email, password} = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    
    res.status(200).json({ message: "Login successful", token ,user});
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Route for adding a new customer
app.post('/api/customers', async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      address,
      taluka,
      city,
      district,
      state,
      country,
      pincode,
      mobile,
      email,
      cast,
      subcast,
      gotra,
      religion,
      nationality,
      referredBy,
      employed,
      employmentType,
      businessDetails
    } = req.body;
    
    const newCustomer = new Customer({
      firstName,
      middleName,
      lastName,
      address,
      taluka,
      city,
      district,
      state,
      country,
      pincode,
      mobile,
      email,
      cast,
      subcast,
      gotra,
      religion,
      nationality,
      referredBy,
      employed,
      employmentType,
      businessDetails
    });

    await newCustomer.save();
    
    res.status(201).json({ message: 'Customer added successfully', customer: newCustomer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for adding a new event
app.post('/api/events', async (req, res) => {
  try {
    const {
      customerName,
      address,
      taluka,
      city,
      district,
      state,
      country,
      pincode,
      mobile,
      email,
      eventDate,
      eventVenue,
      eventDescription,
      eventAmount,
      advanceAmount,
      remainingAmount,
      eventHoldersName
    } = req.body;

    // If you want to reference an existing customer, ensure customerName is an ObjectId
    const newEvent = new Event({
      customerName,
      address,
      taluka,
      city,
      district,
      state,
      country,
      pincode,
      mobile,
      email,
      eventDate,
      eventVenue,
      eventDescription,
      eventAmount,
      advanceAmount,
      remainingAmount,
      eventHoldersName
    });

    await newEvent.save();
    c
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all customer names
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find({}, 'firstName middleName lastName');
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customer names:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get details of a single customer by ID
app.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
//toget events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
});


// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/GoDigital?retryWrites=true&w=majority')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection failed', err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 
