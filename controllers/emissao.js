import db from '../firebase.js'; 

export const getAllEmissao = async (req, res) => {
  try {
    const snapshot = await db.collection('EMISSAO').get();
    const itens = snapshot.docs.map(doc => ({
      id: doc.id,
     ...doc.data()
    }));
    res.json(itens);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const getByIdEmissao = async (req, res) => {
  try {
    const docRef = await db.collection('EMISSAO').doc(req.params.id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      res.status(404).json({ message: 'Emissão não encontrada' });
      return;
    }
    res.json(docSnap.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const postEmissao = async (req, res) => {
  try {
    const docRef = db.collection('EMISSAO').doc();
    const newItem = {
      as: req.body.as,
      emissao: req.body.emissao,
      emitir_projeto_lb: req.body.emitir_projeto_lb,
      comentar_projeto_lb: req.body.comentar_projeto_lb
    };
    await docRef.set(newItem);
    const updatedDocSnap = await docRef.get();
    if (!updatedDocSnap.exists) {
      res.status(400).json({ message: 'Erro, inserção não foi bem sucedida' });
      return;
    }
    res.status(201).json(updatedDocSnap.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
}