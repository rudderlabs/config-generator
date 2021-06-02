const express = require('express');
const path = require('path');
const fs = require('fs');
// const auth = require('koa-basic-auth');
// const Router = require('koa-router');
const app = express();

// const basicAuth = require('express-basic-auth')
// const adminUser = process.env.ADMIN_USER || 'admin';
// const adminPassword = process.env.ADMIN_PASSWORD || 'password';

app.use(express.static(path.join(__dirname, '../build')));


// app.use(basicAuth({
//     users: { [adminUser]: adminPassword }
// }))

app.use(express.json())


app.post('/saveToFile', function (req, res) {
  const configSavePath = process.env.REACT_APP_SAVE_TO_FILE_PATH || './config.json';
  fs.writeFileSync(configSavePath, JSON.stringify(req.body.workspaceConfig));
  res.send('Saved to file');
});

const loadJSONFile = (path) => {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } else {
    return "{}";
  }
}

app.get('/loadConnections', function(req, res) {
  connections = loadJSONFile('./connections.json');
  res.send({connections});
});

app.get('/loadSources', function(req, res) {
  sources = loadJSONFile('./sources.json');
  res.send({sources});
});

app.get('/loadDestinations', function(req, res) {
  destinations = loadJSONFile('./destinations.json');
  res.send({destinations});
});


app.post('/saveConnections', function (req, res) {
  const connectionsSavePath = './connections.json';
  fs.writeFileSync(connectionsSavePath, JSON.stringify(req.body.connections));
  res.send('Saved connections to file');
});

app.post('/saveDestinations', function (req, res) {
  const destinationsSavePath = './destinations.json';
  fs.writeFileSync(destinationsSavePath, JSON.stringify(req.body.destinations));
  res.send('Saved destinations to file');
});

app.post('/saveSources', function (req, res) {
  const sourcesSavePath = './sources.json';
  fs.writeFileSync(sourcesSavePath, JSON.stringify(req.body.sources));
  res.send('Saved sources to file');
});


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(9000);