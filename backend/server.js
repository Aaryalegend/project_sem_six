const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(cors());

let clipboardData = [];

app.get('/clipboard', (req, res) => {
  res.json(clipboardData);
});

app.post('/clipboard', (req, res) => {
  const data = req.body.data;
  clipboardData.push(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
  res.status(201).send();
});

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});