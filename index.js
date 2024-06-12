import express from 'express';
import db from './firebase.js'; // Certifique-se de que o caminho está correto

const app = express();

// REST API

// GET
app.get('/teste', async (req, res) => {
    try {
        const snapshot = await db.collection('teste').get();
        const itens = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        res.json(itens);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
