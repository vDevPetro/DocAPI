import db from '../firebase.js';

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
    const as = req.body.num_as;
    const updatedData = req.body;
    const doc = await db.collection("INDICADORES").doc(as).get();

    if (!doc.exists) {
      await db.collection("INDICADORES").doc(as).set(updatedData);
      res.status(201).send("Dados curva s inseridos");
    } else {
      await db.collection("INDICADORES").doc(as).update(updatedData);
      res.status(200).send("Dados curva s atualizados");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}