import express from 'express';
import axios from 'axios';
import { config } from 'dotenv';

config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Kode server is running');
});

app.post('/execute', async (req, res) => {
  try {
    const { script, language, stdin, versionIndex } = req.body;

    if (!script || !language) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const JDOODLE_ApiUrl = 'https://api.jdoodle.com/v1/execute';

    const JDOODLE_RequestData = {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: script,
      language: language,
      stdin: stdin,
      versionIndex: versionIndex
    };

    const response = await axios.post(JDOODLE_ApiUrl, JDOODLE_RequestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('An error occurred:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while making the API request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
