// server.js (backend)

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const crypto = require('crypto'); // Import the crypto module
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const cors = require('cors'); // Import the cors package
const jwt = require('jsonwebtoken');
const macaddress = require('macaddress'); // Import the macaddress module
const axios = require('axios');



const app = express();
app.use(express.json());
app.use(cors()); 

// MySQL database connection configuration
const dbConfig = {
  host: '127.0.0.1', // Replace with your MySQL host address
  user: 'alvin', // Replace with your MySQL username
  password: '6sehz699a.Top', // Replace with your MySQL password
  database: 'fraud-detection', // Replace with your MySQL database name
};

// Create a connection pool
const pool = mysql.createPool(dbConfig).promise();

// Middleware
app.use(bodyParser.json());

const saltRounds = 10; // The number of salt rounds for bcrypt (higher value increases security but also increases hashing time)



// ... Your imports and constants

// Utility Functions for Fraud Detection
async function checkForFraudulentActivity(username, transactionType, amount, macAddress, receiverAccount) {
  let isFraudulent = false;
  let reason = '';
  


  
  if (amount > 100000) {
      reason = `Large transaction amount`;
      isFraudulent = true;
  }

  const [recentSameAmountTransactions] = await pool.query(`
      SELECT * FROM transactions WHERE 
      sender_username = ? AND amount = ? AND date > NOW() - INTERVAL 5 MINUTE
  `, [username, amount]);
  if (recentSameAmountTransactions.length >= 5) {
      reason = `Frequent same amount transactions`;
      isFraudulent = true;
  }

  const [user] = await pool.query('SELECT mac_address FROM users WHERE username = ?', [username]);
  if (user[0].mac_address !== macAddress) {
      reason = `MAC address mismatch for user`;
      isFraudulent = true;
  }

  if (transactionType === 'Withdrawal') {
      const [recentWithdrawals] = await pool.query(`
          SELECT * FROM transactions WHERE 
          sender_username = ? AND transactiontype = "Withdrawal" AND date > NOW() - INTERVAL 10 MINUTE
      `, [username]);
      if (recentWithdrawals.length >= 3) {
          reason = `Rapid withdrawals detected for user`;
          isFraudulent = true;
      }
  }


  if (transactionType === 'Transfer') {
      const [receiver] = await pool.query('SELECT * FROM users WHERE account_number = ?', [receiverAccount]);
      if (!receiver || receiver.length === 0) {
          reason = `Invalid receiver account detected`;
          isFraudulent = true;
      }
  }

  if (transactionType === 'Deposit' && amount > 100000) {
      reason = `Large deposit detected for user`;
      isFraudulent = true;
  }

 

  if (isFraudulent) {
      console.warn(`ML Model flagged transaction as fraudulent for user ${username} due to ${reason}`);
      const fraudulentTransactionData = {
          sender_username: username,
          receiver_username: (transactionType === 'Transfer' ? receiverAccount : username),
          amount,
          transactiontype: transactionType,
          date: new Date(),
          location: 'Your location',
          ip_address: 'Your IP', // Fetch the real IP
          mac_address: macAddress,
          reason: reason
      };
      await pool.query('INSERT INTO fraud_transactions SET ?', fraudulentTransactionData);
      return true; // Indicate that the transaction was fraudulent
  }

  return false; // Indicate that the transaction was not fraudulent
}





// Generate a unique account number
function generateAccountNumber() {
  // Customize the length and format of the account number as needed
  const bytes = crypto.randomBytes(4);
  const accountNumber = 'ACCT-' + bytes.toString('hex');

  return accountNumber;
}

// Function to generate a JWT token for authentication
function generateJWTToken(username) {
  const jwtSecretKey = '6sehz699a.Top'; // Replace 'your-secret-key' with your actual secret key
  const payload = { username };
  const options = { expiresIn: '1h' }; // Token expiration time (e.g., 1 hour)

  return jwt.sign(payload, jwtSecretKey, options);
}

// Function to verify JWT token and extract the username
function verifyJWTToken(token) {
  const jwtSecretKey = '6sehz699a.Top'; // Replace 'your-secret-key' with your actual secret key
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    return decoded.username;
  } catch (error) {
    return null;
  }
}

// Protected route middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('authHeader:', authHeader); // Log the authHeader
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token:', token); // Log the extracted token
  if (!token) return res.sendStatus(401);

  const username = verifyJWTToken(token);
  if (!username) return res.sendStatus(403);

  // Add the authenticated username to the request object for further processing
  req.username = username;
  next();
}

function isAdmin(req, res, next) {
  const username = req.username;
  pool
    .query('SELECT is_admin FROM users WHERE username = ?', [username])
    .then(([rows]) => {
      if (rows.length > 0 && rows[0].is_admin) {
        next();
      } else {
        res.status(403).json({ message: 'Access forbidden: Admins only.' });
      }
    })
    .catch((error) => {
      console.error('Error verifying admin status:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    });
}

// Function to get the MAC address of the device being used
function getMacAddress() {
  return new Promise((resolve, reject) => {
    macaddress.one((err, mac) => {
      if (err) {
        reject(err);
      } else {
        resolve(mac);
      }
    });
  });
}

// Endpoint to handle user registration requests
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Generate a unique account number
    const accountNumber = generateAccountNumber();

    // Get the MAC address of the device being used
    const macAddr = await getMacAddress();

    // Hash the password before saving it to the database
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err.message);
        return res.status(500).json({ message: 'An error occurred while registering user' });
      }

      // Save the user data, hashed password, account number, and MAC address to the database (assuming a 'users' table)
      pool
      .query(
        'INSERT INTO users (username, email, password_hash, account_number, mac_address, balance) VALUES (?, ?, ?, ?, ?, 0)',
        [username, email, hashedPassword, accountNumber, macAddr]
    )
        .then(() => {
          res.json({ message: 'User registered successfully', accountNumber });
        })
        .catch((error) => {
          console.error('Error registering user:', error.message);
          res.status(500).json({ message: 'An error occurred while registering user' });
        });
    });
  } catch (error) {
    console.error('Error getting MAC address:', error.message);
    res.status(500).json({ message: 'An error occurred while registering user' });
  }
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request:', { username, password });

  try {
    // Authenticate the user
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    console.log('Fetched user data:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the user is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'Your account is blocked. Please contact the administrator.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (passwordMatch) {
      // Passwords match, generate JWT token and send it as the response
      const token = generateJWTToken(username);
      return res.json({ token, is_admin: user.is_admin });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }  
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'An error occurred while authenticating' });
  }
});


app.get('/api/user', authenticateToken, (req, res) => {
  const username = req.username;
  // Fetch user data based on the username
  pool.query('SELECT * FROM users WHERE username = ?', [username])
    .then(([rows]) => {
      if (rows.length > 0) {
        const user = rows[0];
        // Send a JSON response with the user data
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    });
});





app.post('/api/deposit', authenticateToken, async (req, res) => {
  const { amount, accountNumber } = req.body;
  const username = req.username;

  try {
      const isFraudulent = await checkForFraudulentActivity(username, 'Deposit', amount, await getMacAddress(), null);
      if (isFraudulent) {
          return res.status(400).json({ message: 'Transaction flagged as fraudulent' });
      }

      const [user] = await pool.query('SELECT * FROM users WHERE account_number = ?', [accountNumber]);
      if (!user || user.length === 0) {
          return res.status(400).json({ message: 'Invalid account number. Please provide a valid account number.' });
      }

      await pool.query('UPDATE users SET balance = balance + ? WHERE username = ?', [amount, username]);

      const transactionData = {
          sender_username: username,
          receiver_username: username,
          amount,
          transactiontype: 'Deposit',
          date: new Date(),
          location: 'Your location',
          ip_address: req.ip,
          mac_address: await getMacAddress()
      };
      await pool.query('INSERT INTO transactions SET ?', transactionData);

      res.json({ message: 'Deposit successful' });
  } catch (error) {
      console.error('Error during deposit:', error);
      res.status(500).json({ message: 'An error occurred while processing the deposit.' });
  }
});





// Endpoint to handle user withdrawal requests
app.post('/api/withdraw', authenticateToken, async (req, res) => {
  const { amount, accountNumber } = req.body;
  const username = req.username;

  try {
      const isFraudulent = await checkForFraudulentActivity(username, 'Withdrawal', amount, await getMacAddress(), null);
      if (isFraudulent) {
          return res.status(400).json({ message: 'Transaction flagged as fraudulent' });
      }

      const [user] = await pool.query('SELECT * FROM users WHERE account_number = ?', [accountNumber]);
      if (!user || user.length === 0) {
          return res.status(400).json({ message: 'Invalid account number. Please provide a valid account number.' });
      }

      const [balanceRows] = await pool.query('SELECT balance FROM users WHERE username = ?', [username]);
      const userBalance = balanceRows[0].balance;
      if (userBalance < amount) {
          return res.status(400).json({ message: 'Insufficient funds.' });
      }

      await pool.query('UPDATE users SET balance = balance - ? WHERE username = ?', [amount, username]);

      const transactionData = {
          sender_username: username,
          receiver_username: username,
          amount: -amount,
          transactiontype: 'Withdrawal',
          date: new Date(),
          location: 'Your location',
          ip_address: req.ip,
          mac_address: await getMacAddress()
      };
      await pool.query('INSERT INTO transactions SET ?', transactionData);

      res.json({ message: 'Withdrawal successful' });
  } catch (error) {
      console.error('Error during withdrawal:', error);
      res.status(500).json({ message: 'An error occurred while processing the withdrawal.' });
  }
});

app.post('/api/transfer', authenticateToken, async (req, res) => {
  const { receiverAccount, amount } = req.body;
  const senderUsername = req.username;

  try {
      const isFraudulent = await checkForFraudulentActivity(senderUsername, 'Transfer', amount, await getMacAddress(), receiverAccount);
      if (isFraudulent) {
          return res.status(400).json({ message: 'Transaction flagged as fraudulent' });
      }

      const [receiver] = await pool.query('SELECT * FROM users WHERE account_number = ?', [receiverAccount]);
      if (!receiver || receiver.length === 0) {
          return res.status(400).json({ message: 'Receiver account not found.' });
      }

      const [sender] = await pool.query('SELECT * FROM users WHERE username = ?', [senderUsername]);
      if (!sender || sender.length === 0) {
          return res.status(400).json({ message: 'Sender account not found.' });
      }

      if (sender[0].balance < amount) {
          return res.status(400).json({ message: 'Insufficient funds.' });
      }

      await pool.query('UPDATE users SET balance = balance - ? WHERE username = ?', [amount, senderUsername]);
      await pool.query('UPDATE users SET balance = balance + ? WHERE account_number = ?', [amount, receiverAccount]);

      const transactionData = {
          sender_username: senderUsername,
          receiver_username: receiver[0].username,
          amount,
          transactiontype: 'Transfer',
          date: new Date(),
          location: 'Your location',
          ip_address: req.ip,
          mac_address: await getMacAddress()
      };
      await pool.query('INSERT INTO transactions SET ?', transactionData);

      res.json({ message: 'Transfer successful' });
  } catch (error) {
      console.error('Error during transfer:', error);
      res.status(500).json({ message: 'An error occurred during the transfer.' });
  }
});


app.get('/api/balance', authenticateToken, async (req, res) => {
  const username = req.username;
  try {
      const [rows] = await pool.query('SELECT balance FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
          const balance = rows[0].balance;
          return res.json({ balance });
      } else {
          return res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ message: 'An error occurred while fetching the balance.' });
  }
});

app.get('/api/transactions', authenticateToken, async (req, res) => {
  const username = req.username;
  
  try {
      // Check if the user is an admin
      const [users] = await pool.query('SELECT is_admin FROM users WHERE username = ?', [username]);
      const user = users[0];
      let transactions;

      if (user.is_admin) {
          // Fetch all transactions for admin
          [transactions] = await pool.query('SELECT * FROM transactions');
      } else {
          // Fetch transactions specific to the user for regular users
          [transactions] = await pool.query('SELECT * FROM transactions WHERE sender_username = ? OR receiver_username = ?', [username, username]);
      }

      res.json(transactions);
  } catch (error) {
      console.error("Error fetching user transactions:", error);
      res.status(500).json({ message: 'An error occurred while fetching transactions.' });
  }
});

// Endpoint to fetch daily transaction counts
// Endpoint to fetch daily transaction counts
// Endpoint to fetch monthly transaction counts
app.get('/api/daily-summary', authenticateToken, async (req, res) => {
  const username = req.username;

  try {
      const [transactions] = await pool.query(`
          SELECT transactiontype, SUM(amount) as totalAmount
          FROM transactions 
          WHERE (sender_username = ? OR receiver_username = ?) AND DATE(date) = CURRENT_DATE()
          GROUP BY transactiontype
      `, [username, username]);

      const [balance] = await pool.query('SELECT balance FROM users WHERE username = ?', [username]);

      const summaryData = {
          Deposit: 0,
          Withdrawal: 0,
          Transfer: 0,
          Balance: balance[0] ? balance[0].balance : 0
      };

      transactions.forEach(item => {
          summaryData[item.transactiontype] = item.totalAmount;
      });

      res.json(summaryData);
  } catch (error) {
      console.error("Error fetching daily summary:", error);
      res.status(500).json({ message: 'An error occurred while fetching daily summary.' });
  }
});

app.get('/api/daily-transaction-count', authenticateToken, async (req, res) => {
  try {
      const [rows] = await pool.query(`
          SELECT COUNT(*) as count FROM transactions WHERE DATE(date) = CURRENT_DATE()
      `);
      res.json({ count: rows[0].count });
  } catch (error) {
      console.error("Error fetching daily transaction count:", error);
      res.status(500).json({ message: 'An error occurred while fetching daily transaction count.' });
  }
});

app.get('/api/user-count', authenticateToken, async (req, res) => {
  try {
      const [rows] = await pool.query(`
          SELECT COUNT(*) as count FROM users WHERE is_admin = 0
      `);
      res.json({ count: rows[0].count });
  } catch (error) {
      console.error("Error fetching user count:", error);
      res.status(500).json({ message: 'An error occurred while fetching user count.' });
  }
});


// Your other routes and middleware can be defined here
// ...
// Delete a user
app.delete('/api/admin/delete-user/:username', authenticateToken, isAdmin, async (req, res) => {
  const username = req.params.username;
  try {
      await pool.query('DELETE FROM users WHERE username = ?', [username]);
      res.json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

// Block a user
app.put('/api/admin/block-user/:username', authenticateToken, isAdmin, async (req, res) => {
  const username = req.params.username;
  try {
      await pool.query('UPDATE users SET status = "blocked", last_blocked_time = NOW() WHERE username = ?', [username]);
      res.json({ message: 'User blocked successfully' });
  } catch (error) {
      console.error('Error blocking user:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

// Unblock a user
app.put('/api/admin/unblock-user/:username', authenticateToken, isAdmin, async (req, res) => {
  const username = req.params.username;
  try {
      await pool.query('UPDATE users SET status = "active" WHERE username = ?', [username]);
      res.json({ message: 'User unblocked successfully' });
  } catch (error) {
      console.error('Error unblocking user:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch all users (excluding admins)
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
      const [users] = await pool.query('SELECT username, email, account_number, balance, status FROM users WHERE is_admin = 0');
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});


app.get('/api/fraud-notifications', authenticateToken, async (req, res) => {
  const username = req.username;
  
  try {
      const [user] = await pool.query('SELECT is_admin FROM users WHERE username = ?', [username]);
      let fraudulentTransactions;
      
      if(user[0].is_admin) {
          // If the user is an admin, fetch all unread fraudulent transactions
          [fraudulentTransactions] = await pool.query('SELECT * FROM fraud_transactions WHERE `read` = FALSE');
      } else {
          // Otherwise, fetch only the unread fraudulent transactions specific to the user
          [fraudulentTransactions] = await pool.query('SELECT * FROM fraud_transactions WHERE sender_username = ? AND `read` = FALSE', [username]);
      }

      res.json(fraudulentTransactions);
  } catch (error) {
      console.error('Error fetching fraudulent transactions:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});



app.get('/api/fraud-transaction-count', authenticateToken, async (req, res) => {
  try {
      const [rows] = await pool.query(`
          SELECT COUNT(*) as count FROM fraud_transactions
      `);
      res.json({ count: rows[0].count });
  } catch (error) {
      console.error("Error fetching fraudulent transaction count:", error);
      res.status(500).json({ message: 'An error occurred while fetching fraudulent transaction count.' });
  }
});

// Endpoint to fetch total transaction count
app.get('/api/total-transaction-count', authenticateToken, async (req, res) => {
  try {
      const [rows] = await pool.query(`SELECT COUNT(*) as count FROM transactions`);
      res.json({ count: rows[0].count });
  } catch (error) {
      console.error("Error fetching total transaction count:", error);
      res.status(500).json({ message: 'An error occurred while fetching total transaction count.' });
  }
});

// Endpoint to fetch transaction trends over time
app.get('/api/transaction-trends', authenticateToken, isAdmin, async (req, res) => {
  try {
      // Fetch count of legitimate transactions grouped by date
      const [legitimateTransactions] = await pool.query(`
          SELECT DATE(date) as transactionDate, COUNT(*) as count
          FROM transactions
          GROUP BY DATE(date)
          ORDER BY DATE(date)
      `);

      // Fetch count of fraudulent transactions grouped by date
      const [fraudulentTransactions] = await pool.query(`
          SELECT DATE(date) as transactionDate, COUNT(*) as count
          FROM fraud_transactions
          GROUP BY DATE(date)
          ORDER BY DATE(date)
      `);

      // Merge the results
      let result = {};
      for (let transaction of legitimateTransactions) {
          if (!result[transaction.transactionDate]) {
              result[transaction.transactionDate] = { legitimate: 0, fraudulent: 0 };
          }
          result[transaction.transactionDate].legitimate = transaction.count;
      }

      for (let transaction of fraudulentTransactions) {
          if (!result[transaction.transactionDate]) {
              result[transaction.transactionDate] = { legitimate: 0, fraudulent: 0 };
          }
          result[transaction.transactionDate].fraudulent = transaction.count;
      }

      // Convert the result object to an array format suitable for the chart
      let finalResult = [];
      for (let date in result) {
          finalResult.push({
              date: date,
              legitimate: result[date].legitimate,
              fraudulent: result[date].fraudulent
          });
      }

      res.json(finalResult);
  } catch (error) {
      console.error('Error fetching transaction trends:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

app.put('/api/mark-notification-read/:transaction_id', authenticateToken, async (req, res) => {
  const { transaction_id } = req.params;
  try {
      await pool.query('UPDATE fraud_transactions SET `read` = TRUE WHERE transaction_id = ?', [transaction_id]);
      res.json({ message: 'Notification marked as read successfully' });
  } catch (error) {
      console.error('Error marking the notification as read:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});



app.put('/api/mark-all-notifications-read', authenticateToken, async (req, res) => {
  const username = req.username;
  try {
      const [user] = await pool.query('SELECT is_admin FROM users WHERE username = ?', [username]);
      
      // If user is an admin, mark all notifications as read
      if (user[0].is_admin) {
          await pool.query('UPDATE fraud_transactions SET read = TRUE');
      } else {
          // Otherwise, only mark the current user's notifications as read
          await pool.query('UPDATE fraud_transactions SET read = TRUE WHERE sender_username = ?', [username]);
      }
      
      res.json({ message: 'All notifications marked as read successfully' });
  } catch (error) {
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});




// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
