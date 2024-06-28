import db from '../firebase.js'; 

export const getNextAvailableId = async (req, res) => {
  try {
    const snapshot = await db.collection('AS').get();
    const existingIds = snapshot.docs.map(doc => doc.id);
    let nextId = 1;
    while (existingIds.includes(nextId.toString())) {
      nextId++;
    }
    res.json({ nextId });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

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
    const id = req.body.id
    try {
      const newItem = {
        contrato_icj: req.body.contrato_icj,
        contrato_sap: req.body.contrato_sap,
        desc_projeto: req.body.desc_projeto,
        pep: req.body.pep,
        porte: req.body.porte,
        resp_petro: req.body.resp_petro,
        resp_contr: req.body.resp_contr,
        tipo: req.body.tipo,
        unidade: req.body.unidade
      }
      const docRef = await db.collection("AS").doc(id).set(newItem);
      res.status(201).send({ id: docRef.id });
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
