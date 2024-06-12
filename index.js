import express from 'express';
import admin from 'firebase-admin';

const app = express();

admin.initializeApp({
    credential: admin.credential.cert("ServiceAccountKey.json")
});

// REST API

// GET
app.get('/teste', (req, res) => {
    admin.firestore()
        .collection('teste')
        .get()
        .then(snapshot => {
            const itens = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            res.json(itens)
        })
})

app.listen(3000)