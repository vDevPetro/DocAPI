import { db } from '../firebase.js'; 

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
        emissao: doc.data().emissao,
        motivo: doc.data().motivo,
        desc_motivo: doc.data().desc_motivo,
        coment_proj_lb: doc.data().coment_proj_lb,
        coment_proj_rp: doc.data().coment_pro_rp,
        coment_proj_real: doc.data().coment_proj_real,
        emitir_proj_lb: doc.data().emitir_proj_lb,
        emitir_proj_rp: doc.data().emitir_proj_rp,
        emitir_proj_real: doc.data().emitir_proj_real,
        atender_coment_proj_lb: doc.data().atender_coment_proj_lb,
        atender_coment_proj_rp: doc.data().atender_coment_proj_rp,
        atender_coment_proj_real: doc.data().atender_coment_proj_real,
        situacao: doc.data().situacao,
        justificativa: doc.data().justificativa,
        log: doc.data().log
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
      motivo: req.body.motivo,
      desc_motivo: req.body.desc_motivo,
      emitir_proj_lb: req.body.emitir_proj_lb,
      emitir_proj_rp: req.body.emitir_proj_rp,
      emitir_proj_real: req.body.emitir_proj_real,
      coment_proj_lb: req.body.coment_proj_lb,
      coment_proj_rp: req.body.coment_proj_rp,
      coment_proj_real: req.body.coment_proj_real,
      atender_coment_proj_lb: req.body.atender_coment_proj_lb,
      atender_coment_proj_rp: req.body.atender_coment_proj_rp,
      atender_coment_proj_real: req.body.atender_coment_proj_real,
      situacao: req.body.situacao,
      justificativa: req.body.justificativa,
      log: req.body.log
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

//Atualizar Emissao
export const putEmissao = async (req, res) => {
  try{
  const num_as = req.params.num_as;
  const emissao = req.params.emissao;
  const updateData = req.body;

  const docSnap = await db.collection('EMISSAO')
   .where('num_as', '==', num_as)
   .where('emissao', '==', emissao)
   .get();

   if (docSnap.empty) {
    const doc = await db.collection('EMISSAO').where('num_as', '==', num_as).get();
    if (doc.empty) {
      return res.status(404).json({ error: `Nenhuma emissão associada com a AS: ${num_as}.` });
    } else {
      return res.status(404).json({ error: `Nenhuma emissão de número: ${emissao} associada à AS: ${num_as}.` });
    }
  }

  const docEmissao = docSnap.docs[0];
  const emissaoId = docEmissao.id;
  await db.collection('EMISSAO').doc(emissaoId).update(updateData);
  const updateDoc = await db.collection('EMISSAO').doc(emissaoId).get();

  res.status(200).json(updateDoc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
}