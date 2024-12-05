import { db } from '../firebase.js';

export const getIndicadorById = async (req, res) => {
  try {
    const indicadorRef = db.collection('INDICADORES').doc(req.params.id);
    const indicadorSnap = await indicadorRef.get();
    
    if (!indicadorSnap.exists) {
      return res.status(404).json({ message: 'Indicador não encontrado' });
    }

    const indicadorData = indicadorSnap.data();

    indicadorData.id = indicadorSnap.id; 
    const dadosIefRef = indicadorRef.collection('DADOSIEF');
    const dadosIefSnap = await dadosIefRef.get();
    
    let dadosIefData = [];
    if (!dadosIefSnap.empty) {
      dadosIefData = dadosIefSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    const indicadores = {
      DADOSIEF: dadosIefData,
      INDICADOR_MES: indicadorData
    };

    res.status(200).json(indicadores);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateCurvaS = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    const doc = await db.collection("INDICADORES").doc(itemId).get();

    if (!doc.exists) {
      await db.collection("INDICADORES").doc(itemId.toString()).set(updatedData);
      res.status(201).send("Dados curva s inseridos");
    } else {
      await db.collection("INDICADORES").doc(itemId.toString()).update(updatedData);
      res.status(200).send("Dados curva s atualizados");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const getCurvaS = async (req, res) => {
  try {
    const docRef = db.collection("INDICADORES").doc(req.params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      res.status(400).json("Documento não encontrado");
    }

    res.status(200).json(docSnap.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const getAllCurvasS = async (req, res) => {
  try {
    const indicadoresSnap = await db.collection("INDICADORES").get();
    
    if (indicadoresSnap.empty) {
      return res.status(404).json({ message: "Nenhum indicador encontrado" });
    }

    const indicadores = indicadoresSnap.docs.map(doc => ({
      id: doc.id,
      num_as: doc.data().num_as,
      data: doc.data().data 
    }));

    res.status(200).json(indicadores);
  } catch (error) {
    res.status(500).send(error.message);
  }
};