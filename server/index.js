const express = require('express');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const auth = require('basic-auth');
const app = express();
require('dotenv').config()

const CONFIG_FOLDER = process.env.CONFIG_FOLDER || '.';

app.use(express.static(path.join(__dirname, '../build')));


// app.use(basicAuth({
//     users: { [adminUser]: adminPassword }
// }))

app.use(express.json())


app.post('/saveToFile', function (req, res) {
  const configSavePath = CONFIG_FOLDER + '/workspaceConfig.json';
  fs.writeFileSync(configSavePath, JSON.stringify(req.body.workspaceConfig));
  Object.entries(req.body.sourcesConfig).forEach(([writeKey, config])=>{
    fsExtra.outputFileSync(`${CONFIG_FOLDER}/sources/${writeKey}.json`, JSON.stringify(config));
  });
  res.send('Saved to file');
});

app.get('/workspaceConfig', function (req, res) {
  const configPath = CONFIG_FOLDER + '/workspaceConfig.json';
  if (fs.existsSync(configPath)) {
    const workspaceConfig =  JSON.parse(fs.readFileSync(configPath, 'utf8'));
    res.send(workspaceConfig);
  } else {
    res.status(500);
    res.send('Config not found');
  }
});


app.get('/sourceConfig', function (req, res) {
  const bearerHeader = req.headers.authorization;
  const writeKey = auth.parse(bearerHeader) && auth.parse(bearerHeader).name;

  const configPath = `${CONFIG_FOLDER}/sources/${writeKey}.json`;
  if (fs.existsSync(configPath)) {
    const sourceConfig =  JSON.parse(fs.readFileSync(configPath, 'utf8'));
    res.send(sourceConfig);
  } else {
    res.status(500);
    res.send('Config not found');
  }
});

const loadJSONFile = (path) => {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } else {
    return "{}";
  }
}

app.get('/loadConnections', function(req, res) {
  const connections = loadJSONFile(CONFIG_FOLDER+'/connections.json');
  res.send({connections});
});

app.get('/loadSources', function(req, res) {
  const sources = loadJSONFile(CONFIG_FOLDER+'/sources.json');
  res.send({sources});
});

app.get('/loadDestinations', function(req, res) {
  const destinations = loadJSONFile(CONFIG_FOLDER+'/destinations.json');
  res.send({destinations});
});


app.post('/saveConnections', function (req, res) {
  const connectionsSavePath = CONFIG_FOLDER+'/connections.json';
  fs.writeFileSync(connectionsSavePath, JSON.stringify(req.body.connections));
  res.send('Saved connections to file');
});

app.post('/saveDestinations', function (req, res) {
  const destinationsSavePath = CONFIG_FOLDER+'/destinations.json';
  fs.writeFileSync(destinationsSavePath, JSON.stringify(req.body.destinations));
  res.send('Saved destinations to file');
});

app.post('/saveSources', function (req, res) {
  const sourcesSavePath = CONFIG_FOLDER+'/sources.json';
  fs.writeFileSync(sourcesSavePath, JSON.stringify(req.body.sources));
  res.send('Saved sources to file');
});


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(9000);