// const express = require('express');
// const webpush = require('web-push');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();

// app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "client")));

// const publicVapidKey = "BC2fDFNkRaVbdnplbDy5Q-oPh70eOFg7VWyL_yHrf9GT8B603d0MTd0hpxobxFu8gfzEACIBI-yUmrzENZy9Yac";
// const privateVapidKey = "LejTqZivbktFmM6FZPJFjZno0xPqCDdwgByutDjQW2c";

// webpush.setVapidDetails(
//   "mailto:rambabu.maurya@iphtechnologies.com",
//   publicVapidKey,
//   privateVapidKey
// );

// app.post('/subscribe', (req, res) => {
//   const subscription = req.body;
//   res.status(201).json({});
//   const payload = JSON.stringify({
//     title: "Hello World",
//     body: "This is your first push notification.",
//     icon: "http://image.ibb.co/frYOFd/tmlogo.png" // Specify the correct path to the icon file
//   });
//   console.log(payload)
//   console.log(subscription)
//   webpush.sendNotification(subscription, payload).catch(console.log);
// });

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log("Server started on port " + PORT);
// });



// use api after add detaisl postman

const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = "BC2fDFNkRaVbdnplbDy5Q-oPh70eOFg7VWyL_yHrf9GT8B603d0MTd0hpxobxFu8gfzEACIBI-yUmrzENZy9Yac";
const privateVapidKey = "LejTqZivbktFmM6FZPJFjZno0xPqCDdwgByutDjQW2c";

webpush.setVapidDetails(
  "mailto:rambabu.maurya@iphtechnologies.com",
  publicVapidKey,
  privateVapidKey
);

// MySQL connection
// MySQL connection
const connection = mysql.createConnection({
  host: 'db', // Use 'db' instead of 'localhost' to connect to the MySQL container
  port: 3306, // Specify the correct port for MySQL
  user: 'root',
  password: '',
  database: 'test',
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.post('/', (req, res) => {
  const subscription = req.body;

  res.status(201).json({});
  const payload = JSON.stringify({
    title: "vhjfvuygugr7id",
    body: "This is t push notification.",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png" // Specify the correct path to the icon file
  });
  console.log(payload);
  console.log("iueryury7ri");
  console.log(subscription);
  console.log("iueryury7ri");
  webpush.sendNotification(subscription, payload).catch(console.log);
}
);

app.post('/addEmployee', (req, res) => {
  const { name, email } = req.body;
  const employee = { name, email };

  const query = connection.query('INSERT INTO emp SET ?', employee, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add employee' });
    } else {
      res.status(200).json({ message: 'Employee added successfully' });
      sendWebNotification(employee.name);
    

    }
  });
  console.log(query.sql);
});

function sendWebNotification(name) {
  console.log(">>>>>>>>>>>>>")
  const payload = JSON.stringify({
    title: "New Employee Added",
    body: `A new employee with the name ${name} has been added.`,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png" // Specify the correct path to the icon file
  });

  connection.query('SELECT * FROM subscriptions', (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    results.forEach((row) => {
      const subscription = JSON.parse(row.subscription);
      webpush.sendNotification(subscription, payload).catch(console.log);
    });
  });
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
