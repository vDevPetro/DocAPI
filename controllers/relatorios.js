import db from '../firebase.js';

export const postReport = async (req, res) => {
  try {
    const { num_as } = req.params;

    // Cronograma: Pega apenas 1 registro por num_as
    const cronogramaSnapshot = await db.collection('CRONOGRAMAS').where('num_as', '==', num_as).limit(1).get();
    const cronogramaData = cronogramaSnapshot.empty ? null : cronogramaSnapshot.docs[0].data();

    // Indicadores: Pega apenas 1 registro por num_as
    const indicadoresSnapshot = await db.collection('INDICADORES').where('num_as', '==', num_as).limit(1).get();
    const indicadorData = indicadoresSnapshot.empty ? null : indicadoresSnapshot.docs[0].data();

    const comentariosSnapshot = await db.collection('COMENTARIOS').where('num_as', '==', num_as).get();
    const comentarioData = comentariosSnapshot.empty ? null : comentariosSnapshot.docs.reduce((max, doc) => {
      const docData = doc.data();
      const dataEnvioString = docData.data_envio; 

      const [day, month, yearAndTime] = dataEnvioString.split('/');
      const [year, time] = yearAndTime.split(' ');

      const formattedDate = `${year}-${month}-${day}T${time}:00`; 
      const dataEnvioDate = new Date(formattedDate); 

      if (!max || dataEnvioDate > new Date(max.data_envio)) {
        return docData;
      }
      return max;
    }, null);

    const emissaoSnapshot = await db.collection('EMISSAO').where('num_as', '==', num_as).get();
    const emissaoData = emissaoSnapshot.empty ? null : emissaoSnapshot.docs.reduce((max, doc) => {
      const docData = doc.data();
      if (!max || docData.emissao > max.emissao) {
        return docData;
      }
      return max;
    }, null);

    const relatorio = {
      id: num_as,
      ultimaAtualizacaoCronograma: cronogramaData ? cronogramaData.log : 'Não disponível',
      ultimaAtualizacaoIEF: indicadorData ? indicadorData.statusDate : 'Não disponível', 
      ultimoComentario: comentarioData ? comentarioData.comentario : 'Não disponível',
      ultimoLogEmissao: emissaoData ? emissaoData.log : 'Não disponível', 
    };

    const relatorioRef = db.collection('RELATORIOS').doc(num_as);
    await relatorioRef.set(relatorio);

    res.status(201).json({ success: true, message: 'Relatório gerado com sucesso!', data: relatorio });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ success: false, message: 'Erro ao gerar relatório.', error: error.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const docSnap = await db.collection('RELATORIOS').get();
    const itens = docSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getReportByAs = async (req, res) => {
  try {
    const relatorioRef = db.collection('RELATORIOS').doc(req.params.id);
    const relatorioSnap = await relatorioRef.get();

    if (!relatorioSnap.exists) {
      res.status(400).json({ message: 'Documento não encontrado' });
    }
    res.status(200).json(relatorioSnap.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateReport = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const relatorioRef = db.collection('RELATORIOS').doc(id);
    const relatorioSnap = await relatorioRef.get();

    if (!relatorioSnap.exists) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    await relatorioRef.update(updates);
    res.status(200).json({ message: 'Relatório atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
