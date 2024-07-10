import db from '../firebase.js';

//Pegar todos os comentários por AS
export const getComentarioAS = async (req, res) => {
  try {
    const num_as = req.params.num_as;
    const docSnap = await db.collection('COMENTARIOS')
      .where('num_as', '==', num_as)
      .get();
    if (docSnap.empty) {
      return res.status(404).json({ error: `Nenhum comentário associado com a AS: ${num_as}.` });
    }
    const comentarios = [];

    docSnap.forEach((doc) => {
      comentarios.push({
        id: doc.id,
        comentario: doc.data().comentario,
        user: doc.data().user,
        data_envio: doc.data().data_envio,
        num_as: doc.data().num_as,
        perfil: doc.data().perfil
      });
    });

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Inserir Comentario
export const postComentario = async (req, res) => {
  try {
    const docRef = db.collection('COMENTARIOS').doc();
    const newItem = {
      comentario: req.body.comentario,
      user: req.body.user,
      data_envio: req.body.data_envio,
      num_as: req.body.num_as,
      perfil: req.body.perfil
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