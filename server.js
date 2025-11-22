const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow your website to call this API
app.use(bodyParser.json());

const BREVO_API_KEY = '"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"';
const INBOX_ID = 'Laggy';

app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/conversations/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': "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"
      },
      body: JSON.stringify({
        sender: { name, email },
        message: { text: message },
        inboxId: INBOX_ID
      })
    });

    if (response.ok) {
      res.json({ success: true });
    } else {
      const err = await response.json();
      res.status(500).json({ error: err });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
