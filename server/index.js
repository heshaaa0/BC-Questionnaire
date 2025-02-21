const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up Google Sheets API
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "1pI31c6DgRVtObrhA0oIYjRaVwXa2DlVBZj1wkjGfW9A"; 
const CREDENTIALS_PATH = "credentials.json"; // Path to your credentials file

// Authorize with Google API
const authorize = () => {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

  const token = JSON.parse(fs.readFileSync("token.json")); // This file will store the token

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};

// Function to append data to Google Sheets
const appendToGoogleSheet = async (userData) => {
  const auth = authorize();
  const sheets = google.sheets({ version: "v4", auth });

  const values = [
    [userData.Name, userData.Phone, userData["What is your favorite color?"], userData["What is your favorite food?"], userData["What is your favorite hobby?"]],
  ];

  const resource = {
    values,
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:E", // Adjust range according to your sheet structure
      valueInputOption: "RAW",
      resource,
    });
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
  }
};

// API endpoint to receive user data
app.post("/save", async (req, res) => {
  const { name, phone, answers } = req.body;

  if (!name || !phone || !answers) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const userData = { Name: name, Phone: phone, ...answers };
  await appendToGoogleSheet(userData);

  res.json({ message: "Data saved successfully to Google Sheets!" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
