// models/auth.js
const jwt = require("jsonwebtoken");
const db = require("../db/connection");
require('dotenv').config();

const secret_key = process.env.LICENSE_KEY;

class Auth { 
  static async loginUser(credentials) {
    const { username, password } = credentials;

    // Retrieve user from the database based on username
    const user = await this.getUserByUsername(username);
    if (!user) {
        console.log("user compare", username, user.name, user);
      throw new Error("Invalid username or password");
    }

    // Compare password hash
    // const passwordMatch = await bcrypt.compare(password.trim(), user.password.trim());
    if (password !== user.password) {
      console.log("password compare", password, user.password, user);
      throw new Error("Invalid username or password");
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      secret_key,
      { expiresIn: "24h" }
    );
    return {
      token: accessToken,
      username: user.name,
      email: username || user.username,
      role: user.role,
    };
  }

  static getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [username], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (rows.length === 0) {
          resolve(null);
          return;
        }
        resolve(rows[0]);
      });
    });
  }
}

module.exports = Auth;
