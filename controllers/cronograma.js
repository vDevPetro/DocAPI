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
        num_as: doc.data().num_as,
        emissao_et_petro_lb: doc.data().emissao_et_petro_lb,
        analise_et_na: doc.data().analise_et_na,
        reuniao_pre_lb: doc.data().reuniao_pre_lb,
        reuniao_pre_na: doc.data().reuniao_pre_na,
        visita_ida_lb: doc.data().visita_ida_lb,
        visita_ida_na: doc.data().visita_ida_na,
        visita_volta_lb: doc.data().visita_volta_lb,
        visita_volta_na: doc.data().visita_volta_na,
        emitir_rl_visita_lb: doc.data().emitir_rl_visita_lb,
        emitir_rl_visita_na: doc.data().emitir_rl_visita_na,
        aprovar_rl_visita_lb: doc.data().aprovar_rl_visita_lb,
        aprovar_rl_visita_na: doc.data().aprovar_rl_visita_na,
        emitir_orc_lb: doc.data().emitir_orc_lb,
        emitir_orc_rp: doc.data().emitir_orc_rp,
        aprovar_orc_lb: doc.data().aprovar_orc_lb,
        aprovar_orc_rp: doc.data().aprovar_orc_rp,
        emitir_pep_lb: doc.data().emitir_pep_lb,
        emitir_pep_rp: doc.data().emitir_pep_rp,
        aprovar_pep_lb: doc.data().aprovar_pep_lb,
        aprovar_pep_rp: doc.data().aprovar_pep_rp,
        emitir_projeto_lb: doc.data().emitir_projeto_lb,
        comentar_projeto_lb: doc.data().comentar_projeto_lb,
        atender_coment_projeto_lb: doc.data().atender_coment_projeto_lb,
        data_book_lb: doc.data().data_book_lb,
        prazo_lb: doc.data().prazo_lb,
        prazo_rp: doc.data().prazo_rp,
        prazo_real: doc.data().prazo_real

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
    const newItem = {
      num_as: req.body.num_as,
      emissao_et_petro_lb: req.body.emissao_et_petro_lb,
      analise_et_lb: req.body.analise_et_lb,
      analise_et_na: req.body.analise_et_na,
      reuniao_pre_lb: req.body.reuniao_pre_lb,
      reuniao_pre_na: req.body.reuniao_pre_na,
      visita_ida_lb: req.body.visita_ida_lb,
      visita_ida_na: req.body.visita_ida_na,
      visita_volta_lb: req.body.visita_volta_lb,
      visita_volta_na: req.body.visita_volta_na,
      emitir_rl_visita_lb: req.body.emitir_rl_visita_lb,
      emitir_rl_visita_na: req.body.emitir_rl_visita_na,
      aprovar_rl_visita_lb: req.body.aprovar_rl_visita_lb,
      aprovar_rl_visita_na: req.body.aprovar_rl_visita_na,
      emitir_orc_lb: req.body.emitir_orc_lb,
      emitir_orc_rp: req.body.emitir_orc_rp,
      aprovar_orc_lb: req.body.aprovar_orc_lb,
      aprovar_orc_rp: req.body.aprovar_orc_rp,
      emitir_pep_lb: req.body.emitir_pep_lb,
      emitir_pep_rp: req.body.emitir_pep_rp,
      aprovar_pep_lb: req.body.aprovar_pep_lb,
      aprovar_pep_rp: req.body.aprovar_pep_rp,
      emitir_projeto_lb: req.body.emitir_projeto_lb,
      comentar_projeto_lb: req.body.comentar_projeto_lb,
      atender_coment_projeto_lb: req.body.atender_coment_projeto_lb,
      data_book_lb: req.body.data_book_lb,
      prazo_lb: req.body.prazo_lb,
      prazo_rp: req.body.prazo_rp,
      prazo_real: req.body.prazo_real
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
    await db.collection('CRONOGRAMA').doc(cronogramaId).set(updatedData, { merge: true });

    const updatedDoc = await db.collection('CRONOGRAMA').doc(cronogramaId).get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
};


