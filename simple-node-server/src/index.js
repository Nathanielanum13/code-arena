const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const { resolveDirectory } = require('./utils/helper')

const app = express();
const port = 3003;

app.use(expressLayouts)
// Middleware to parse JSON in requests
app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static(resolveDirectory('/public')));

// Set EJS as templating engine 
app.set('layout', resolveDirectory('/layouts/global'))
app.set('view engine', 'ejs');
app.set('views', resolveDirectory('/pages'));




// Route for HTML response
app.get('/', (req, res) => {
    const pageData = {
        name: 'John Doe',
        age: '30'
    }
    res.render('home', { title: 'Welcome Home', pageData })
});

app.get('/get-users', (req, res) => {
    const allUsers = [
        {
            name: "Nathaniel",
            age: 30,
            location: "Accra"
        },
        {
            name: "Derek Erik",
            age: 15,
            location: "Lusaka"
        },
        {
            name: "Mike Mills",
            age: 19,
            location: "Kitwe"
        }
    ]
    res.send(allUsers.map((user, index) => `<b ${(index + 1) % 2 === 0 ? 'class="even"' : ""}>${user.name}</b>`).join('\n<br/>\n'));
})

// app.get("/admin", (req, res) => {
//     res.render('admin', { title: 'Admin Portal', layout: resolveDirectory('/layouts/dashboard') })
// })

// Route for JSON response
app.get('/json', (req, res) => {
  const jsonData = {
    message: 'Hello, this is a JSON response!',
  };
  res.json(jsonData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

