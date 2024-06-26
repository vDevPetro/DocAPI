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
  try {
    const nextIdResponse = await getNextAvailableId();
    const nextId = nextIdResponse.nextId;
    const docRef = db.collection('AS').doc(nextId.toString());
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      res.status(400).json({ message: 'ID já está em uso' });
      return;
    }
    const newItem = {
      contrato_icj: req.body.contratoIcj,
      contrato_sap: req.body.contratoSap,
      desc_projeto: req.body.descProjeto,
      pep: req.body.pep,
      porte: req.body.porte,
      resp_petro: req.body.respPetro,
      resp_contr: req.body.respContr,
      tipo: req.body.tipo,
      unidade: req.body.unidade
    };
    await db.collection('AS').doc(nextId.toString()).set(newItem);

    const updatedDocRef = db.collection('AS').doc(nextId.toString());
    const updatedDocSnap = await updatedDocRef.get();

    if (!updatedDocSnap.exists) {
      res.status(500).json({ message: 'Erro, inserção não foi bem sucedida' });
      return;
    }
    res.status(201).json(updatedDocSnap.data());
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
