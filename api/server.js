const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

//  Allow larger JSON body for base64 CVs
app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.post('/submit-application', async (req, res) => {
    console.log('>>>> Request received:', JSON.stringify(req.body, null, 2));

    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzpOeUhQl3TCtl803p_3UZCWd6_6lsDAVnRNQRHSYX7yPEubrP3UdFb3aZdZm9aTNXOVA/exec?sheet=sheet4';

        console.log('Forwarding to Google Script:', scriptUrl);

        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        console.log('Google Script response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Google Script error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Successful response from Google Script:', data);

        res.status(200).json(data);
    } catch (error) {
        console.error('Full error:', {
            message: error.message,
            stack: error.stack,
            requestBody: req.body
        });

        res.status(500).json({
            error: error.message,
            details: 'development'
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
    console.log(`🔌 Ready to handle requests to /submit-application`);
});

process.on('uncaughtException', (error) => {
    console.error('⚠️ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});
