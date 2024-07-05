import db from '../firebase.js'; 

//GET emissao por AS
export const getByASEmissao = async (req, res) => {
  try {
    const num_as = req.params.num_as;
    const docSnapshot = await db.collection('EMISSAO')
     .where('num_as', '==', num_as)
     .get();
     if(docSnapshot.empty){
      return res.status(404).json({error: `Nenhuma emissão associada com a AS: ${num_as}.`})
     }
     const emissoes = [];
     docSnapshot.forEach((doc) => {
      emissoes.push({
        id: doc.id,
        num_as: doc.data().num_as,
        comentar_projeto_lb: doc.data().comentar_projeto_lb,
        emissao: doc.data().emissao,
        emitir_projeto_lb: doc.data().emitir_projeto_lb
      });
     });

     res.status(200).json(emissoes);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Inserir Emissao 
export const postEmissao = async (req, res) => {
  try {
    const docRef = db.collection('EMISSAO').doc();
    const newItem = {
      num_as: req.body.num_as,
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