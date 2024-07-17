import db from '../firebase.js';

//Pegar proximo id disponível para AS
export const getNextAvailableId = async (req, res) => {
  try {
    const docSnap = await db.collection('AS').get();
    const existingIds = docSnap.docs.map(doc => doc.id);
    let nextId = 1;
    while (existingIds.includes(nextId.toString())) {
      nextId++;
    }
    res.status(200).json({ nextId });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Pegar todas as AS 
export const getAllBase = async (req, res) => {
  try {
    const docSnap = await db.collection('AS').get();
    const itens = docSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Pegar AS por id 
export const getBaseId = async (req, res) => {
  try {
    const docRef = db.collection('AS').doc(req.params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      res.status(400).json({ message: 'Documento não encontrado' })
    }

    res.status(200).json(docSnap.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Inserir nova AS
export const postBase = async (req, res) => {
  const id = req.body.id
  try {
    const newItem = {
      contrato_icj: req.body.contrato_icj,
      contrato_sap: req.body.contrato_sap,
      desc_projeto: req.body.desc_projeto,
      porte: req.body.porte,
      prioridade: req.body.prioridade,
      resp_petro: req.body.resp_petro,
      resp_contr: req.body.resp_contr
    }
    const docRef = await db.collection("AS").doc(id.toString()).set(newItem);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Atualizar AS por id
export const putBase = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    const doc = await db.collection("AS").doc(itemId).get();

    if (!doc.exists) {
      return res.status(404).send("O Id solicitado não está relacionado com nenhuma AS");
    }

    await db.collection("AS").doc(itemId).update(updatedData);
    res.status(200).send("Item atualizado com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Excluir AS por id
export const deleteBase = async (req, res) => {
  try {
    const itemId = req.params.id;
    const doc = await db.collection("AS").doc(itemId).get();

    if (!doc.exists) {
      return res.status(404).send("O Id solicitado não está relacionado com nenhuma AS");
    }
    
    await db.collection("AS").doc(itemId).delete();
    res.status(200).send("Item excluído com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
