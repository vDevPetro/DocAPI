import db from '../firebase.js';

//Pegar todos os cronogramas
export const getAllCronograma = async (req, res) => {
  try {
    const docSnap = await db.collection('CRONOGRAMA').get();
    const itens = docSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
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

    const now = new Date();
    const updateTime = `Atualizado no dia ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })}`;

    console.log(`Cronograma AS: ${num_as} - ${updateTime}`);
    const updatedDoc = await db.collection('CRONOGRAMA').doc(cronogramaId).get();

    res.status(200).json({...updatedDoc.data(), lastUpdate: updateTime});
  } catch (error) {
    res.status(500).send(error.message);
  }
};