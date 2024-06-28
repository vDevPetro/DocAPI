import db from '../firebase.js'; 

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
      res.status(500).json({ message: 'Erro, inserção não foi bem sucedida' });
      return;
    }
    res.status(201).json(updatedDocSnap.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
}