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
        perfil: doc.data().perfil,
        nome: doc.data().nome
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
      perfil: req.body.perfil,
      nome: req.body.nome
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

//Atualizar Comentário por id 
export const putComentario = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    const doc = await db.collection('COMENTARIOS').doc(itemId).get();
    
    if (!doc.exists) {
      return res.status(404).send("O ID solicitado não está relacionado com nenhum comentário.");
    }

    await db.collection('COMENTARIOS').doc(itemId).update(updatedData);
    res.status(200).send("Comentário atualizado com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Excluir Comentario por id
export const deleteComentario = async (req, res) => {
  try {
    const itemId = req.params.id;
    const doc = await db.collection('COMENTARIOS').doc(itemId).get();
    
    if (!doc.exists) {
      return res.status(404).send("O ID solicitado não está relacionado com nenhum comentário.");
    }

    await db.collection('COMENTARIOS').doc(itemId).delete();
    res.status(200).send("Comentário excluído com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}