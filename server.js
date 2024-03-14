const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const result = await db.query(`SELECT "Travel Revenue (B)","Famoco Revenue (C)","QR Online Revenue (D)","QR Paper Revenue (E)","Static QR Revenue (E1)","Whats App QR Revenue (E2)","Paytm App QR Revenue (E3)","PhonePe App QR Revenue (E4)","NCMCRevenue (E5)","Line Id", "Name", TO_CHAR("dates", 'MM-DD-YYYY') as "dates", "AFC Revenue (A)" FROM cmrlmgmt WHERE "dates" >= TO_DATE($1, 'YYYY-MM-DD') AND "dates" < TO_DATE($2, 'YYYY-MM-DD')`, [startDate, endDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/generate-graph', async (req, res) => {
  const data = JSON.parse(req.query.data);
  try {
    const result = await db.query(`SELECT "Travel Revenue (B)","Famoco Revenue (C)","QR Online Revenue (D)","QR Paper Revenue (E)","Static QR Revenue (E1)","Whats App QR Revenue (E2)","Paytm App QR Revenue (E3)","PhonePe App QR Revenue (E4)","NCMCRevenue (E5)","Line Id", "Name", TO_CHAR("dates", 'MM-DD-YYYY') as "dates", "AFC Revenue (A)" FROM cmrlmgmt WHERE "dates" = TO_DATE($1, 'MM-DD-YYYY')`, [data.dates]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
