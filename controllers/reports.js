import db from '../firebase.js';
import { getFirestore, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export const postReport = async (req, res) => {
  try {
    const { num_as } = req.params;
    const firestore = getFirestore();

    const cronogramaRef = collection(firestore, 'CRONOGRAMAS');
    const cronogramaQuery = query(cronogramaRef, where('num_as', '==', num_as), limit(1));
    const cronogramaSnapshot = await getDocs(cronogramaQuery);
    const cronogramaData = cronogramaSnapshot.empty ? null : cronogramaSnapshot.docs[0].data();

    const indicadoresRef = collection(firestore, 'INDICADORES');
    const indicadoresQuery = query(indicadoresRef, where('num_as', '==', num_as), limit(1));
    const indicadoresSnapshot = await getDocs(indicadoresQuery);
    const indicadorData = indicadoresSnapshot.empty ? null : indicadoresSnapshot.docs[0].data();

    const comentariosRef = collection(firestore, 'COMENTARIOS');
    const comentariosQuery = query(comentariosRef, where('num_as', '==', num_as));
    const comentariosSnapshot = await getDocs(comentariosQuery);
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

    const emissaoRef = collection(firestore, 'EMISSAO');
    const emissaoQuery = query(emissaoRef, where('num_as', '==', num_as));
    const emissaoSnapshot = await getDocs(emissaoQuery);
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
