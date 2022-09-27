const indexes = {
  m: '1',
  cm: '100',
  in: '39.37008',
  ft: '3.28084',
};

const addForm = document.querySelector('.add-form');

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const addFormValue = addForm.querySelector('.add-form-value');
  const addFormUnit = addForm.querySelector('.add-form-unit');
  const unitValueIndex = addFormUnit.value.indexOf(' ') + 1;
  const unitValue = addFormUnit.value.slice(unitValueIndex);
  const list = document.querySelectorAll('.selector');

  indexes[unitValue] = addFormValue.value;
  list[0].insertAdjacentHTML('beforeend', `
    <option>${addFormUnit.value}</option>
  `);

  list[1].insertAdjacentHTML('beforeend', `
  <option>${addFormUnit.value}</option>
`);

  event.target.reset();
});

const selector1 = document.querySelector('.selector1');
const selector2 = document.querySelector('.selector2');

const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');

const selectorForm = document.querySelector('.selector-form');

const converteValues = (data) => {
  const result = {};

  if (data.distance.unit === data.convert_to) {
    result.value = data.distance.value;
  } else {
    result.value = Number(
      ((+input1.value / +indexes[data.distance.unit]) * indexes[data.convert_to]).toFixed(6),
    );
  }

  input2.value = result.value;

  return input2.value;
};

selectorForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!input1.value) {
    return;
  }

  const unitValueIndex1 = selector1.value.indexOf(' ') + 1;
  const unitValue1 = selector1.value.slice(unitValueIndex1);
  const unitValueIndex2 = selector2.value.indexOf(' ') + 1;
  const unitValue2 = selector2.value.slice(unitValueIndex2);

  if (input1.value.includes(',')) {
    input1.value = input1.value
      .split(',').join('.');
  }

  const convertingValues = {
    distance: { unit: unitValue1, value: +input1.value },
    convert_to: unitValue2,
  };

  converteValues(convertingValues);
});
