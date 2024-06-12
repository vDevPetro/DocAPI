import express from 'express';
import db from './firebase.js'; 

// REST API
const app = express();

// AS CRUD

// GET ALL https://apisiproj.vercel.app/as
app.get('/as', async (req, res) => {
    try {
        const snapshot = await db.collection('AS').get();
        const itens = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(itens);
    } catch (error) {
        res.status(500).send(error.message);
    }    
});

// GET https://apisiproj.vercel.app/as/:id
app.get('/as/:id', async (req, res) => {
    try {
        const docRef = db.collection('AS').doc(req.params.id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(400).json({message: 'Documento não encontrado'})
        }

        res.json(docSnap.data());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST https://apisiproj.vercel.app/as
app.post('/as', (req, res) => {

});

// PUT https://apisiproj.vercel.app/as/:id
app.put('/as/:id', (req, res) => {
    const id = req.params.id;
    
});

// DELETE https://apisiproj.vercel.app/as/:id
app.delete('/as/:id', (req, res) => {
    const id = req.params.id;
    
});

app.listen(3000);



