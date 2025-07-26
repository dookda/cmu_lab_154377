const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Pool = require('pg').Pool

app.use(bodyParser.json())

const db = new Pool({
    host: 'localhost',
    database: 'geo377',
    user: 'sakdahomhuan',
    password: '1234',
    port: 5432,
});

app.get('/api/hospital', async (req, res) => {
    try {
        const sql = "SELECT * FROM cm_hospital_4326";
        const result = await db.query(sql);
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/hospital/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM cm_hospital_4326 WHERE id = ${id}`;
        const result = await db.query(sql);
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/hospital', async (req, res) => {
    try {
        const { name, geom } = req.body;
        const geojsonStr = typeof geom === 'string'
            ? geom
            : JSON.stringify(geom);

        const sql = ` INSERT INTO cm_hospital_4326 (name, geom)
                VALUES ( $1, ST_GeomFromGeoJSON($2) )
                RETURNING id`;

        const { rows } = await db.query(sql, [name, geojsonStr]);
        res.status(201).json({ id: rows[0].id });
    } catch (error) {
        console.error(error);
    }
});

app.put('/api/hospital/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(name);

        const sql = `UPDATE cm_hospital_4326
                SET name = $1
                WHERE id = $2
                RETURNING id, name`;

        const { rows } = await db.query(sql, [name, id]);
        res.json({ hospital: rows[0] });

    } catch (error) {
        console.error(error);
    }
});

app.delete('/api/hospital/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM cm_hospital_4326
                  WHERE id = $1
                  RETURNING id`;
        const { rows } = await db.query(sql, [id]);
        return res.json({ deletedId: rows[0].id });
    } catch (error) {
        console.error(error);
    }
});

app.use('/', express.static('www'))

app.listen(3000, () => {
    console.log("http://localhost:3000")
});

