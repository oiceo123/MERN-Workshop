<h1>MERN Workshop Client</h1>
<p>Client is user interface for blog post project made by React</p>
<p>You can see an example of a live application running at: <a href="https://mern-stack-workshop-ui-2e75ebd34bea.herokuapp.com/">here</a></p>

<h2>Required</h2>
<ul>
    <li><a href="https://nodejs.org/en/blog/release/v14.18.1">Node.js version 14.18.1</a></li>
    <li><a href="https://dev.to/ifeanyichima/how-to-downgrade-from-react-18-to-1702-818">React version 17.0.2</a></li>
</ul>

<h2>CSS Framework</h2>
<ul>
    <li><a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/#quick-start">Bootstrap CDN</a></li>
</ul>

<h2>Tools</h2>
<ul>
    <li><a href="https://code.visualstudio.com/">Vscode</a></li>
    <li><a href="https://devcenter.heroku.com/articles/heroku-cli">Heroku CLI</a></li>
</ul>

<h2>Packages</h2>

```bash
npm install axios react-quill html-react-parser sweetalert2
npm install react-router-dom@5.3.0
```

<h2>Deploy Client to Heroku-22</h2>
<p>1. Create a Procfile file in the root directory and copy the command below.</p>

```bash
web:node server.js
```

<p>2. Create a server.js file in the root directory and copy the command below.</p>

```bash
const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3000
app.listen(port,()=>console.log("start server"))
```

<p>3. Set Config Vars (Environment app) on Heroku</p>

<p>4. Deploy using Heroku Git</p>

<h2>.env Example</h2>

```bash
REACT_APP_API=
REACT_APP_PORT=
```
