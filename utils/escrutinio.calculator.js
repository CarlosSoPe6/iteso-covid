const WEIGHTS = [
  {
    weight: 100,
    fields: [
      'dolorSeveroPecho', 'difExtremaRespirar', 'desorientado', 'respEstimulos',
    ],
  },
  {
    weight: 10,
    fields: [
      'olfato', 'gusto', 'fiebre', 'escalofrios', 'respiracion', 'diarrea', 'vomito',
      'tos', 'dolorMuscular', 'dolorCabeza', 'irritacionOjos', 'sangradoRespiratorio',
    ],
  },
  {
    weight: 1,
    fields: [
      'Embarazada', 'consumeTabaco', 'enfCardiovascular', 'diabetes', 'cancer', 'obeso',
    ],
  },
];

function compute(prueba) {
  const keys = Object.keys(prueba);
  let escrutinio = 0;
  keys.forEach((key) => {
    WEIGHTS.forEach((item) => {
      if (item.fields.includes(key)) {
        if (prueba[key] > 0) {
          escrutinio += (prueba[key] + item.weight);
        }
      }
    });
  });
  if (escrutinio < 1) {
    return 1;
  }
  if (escrutinio <= 10) {
    return 2;
  }
  if (escrutinio <= 100) {
    return 3;
  }
  return 4;
}

module.exports = {
  compute,
};
