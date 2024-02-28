const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const result = await db.query(`SELECT "Name","AFC Revenue (A)", to_char("Date", 'YYYY-DD-MM') as "formattedDate" FROM cmrlmgmt WHERE "Date" BETWEEN TO_DATE($1, 'YYYY-DD-MM') AND TO_DATE($2, 'YYYY-DD-MM')`, [startDate, endDate]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
