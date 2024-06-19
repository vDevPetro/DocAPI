import db from '../firebase.js'; 

export const getAllBase = async (req, res) => {
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
}

export const getBaseId = async (req, res) => {
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
}

export const postBase = async (req, res) => {
  try {
    const newItem = req.body; 
    const docRef = await db.collection("AS").add(newItem);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const putBase =  async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body; 
    await db.collection("AS").doc(itemId).set(updatedData, { merge: true });
    res.status(200).send("Item atualizado com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteBase = async (req, res) => {
  try {
    const itemId = req.params.id;
    await db.collection("AS").doc(itemId).delete();
    res.status(200).send("Item excluído com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
