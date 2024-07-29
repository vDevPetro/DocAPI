import db from '../firebase.js';

//Pegar todos os cronogramas por AS
export const getByAsCronograma = async (req, res) => {
  try {
    const num_as = req.params.num_as;
    const docSnap = await db.collection('CRONOGRAMA')
      .where('num_as', '==', num_as)
      .get();

    if (docSnap.empty) {
      return res.status(404).json({ error: `Nenhum cronograma associado com a AS: ${num_as}.` });
    }

    const cronograma = [];

    docSnap.forEach((doc) => {
      cronograma.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(cronograma);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Inserir cronograma
export const postCronograma = async (req, res) => {
  try {
    const docRef = db.collection('CRONOGRAMA').doc();
    const newItem = req.body;
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

//Atualizar cronograma
export const putCronograma = async (req, res) => {
  try {
    const num_as = req.params.num_as;
    const updatedData = req.body;
    const docSnap = await db.collection('CRONOGRAMA')
      .where('num_as', '==', num_as)
      .get();

    if (docSnap.empty) {
      return res.status(404).json({ error: `Nenhum cronograma associado com a AS: ${num_as}.` });
    }

    const cronograma = docSnap.docs[0];
    const cronogramaId = cronograma.id;
    await db.collection('CRONOGRAMA').doc(cronogramaId).update(updatedData);
    const updatedDoc = await db.collection('CRONOGRAMA').doc(cronogramaId).get();

    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const putUrlCronograma = async (req, res) => {
  try {
    const num_as = req.params.num_as;
    const url = req.body.url; 

    const docSnap = await db.collection('CRONOGRAMA')
      .where('num_as', '==', num_as)
      .get();

    if (docSnap.empty) {
      return res.status(404).json({ error: `Nenhum cronograma associado com a AS: ${num_as}.` });
    }

    const cronograma = docSnap.docs[0];
    const cronogramaId = cronograma.id;

    await db.collection('CRONOGRAMA').doc(cronogramaId).update({ url: url }); 
    const updatedDoc = await db.collection('CRONOGRAMA').doc(cronogramaId).get();

    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
};
