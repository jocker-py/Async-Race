import {
  BTN_GENERATE,
  CARS_GENERATE_VALUE,
  GARAGE,
  SLIDER,
} from '../../config/constants';
import { COMPANIES, MODELS } from '../../config/names';
import { createCar, init } from '../api/api';

const generateColor = (): string =>
  '#' + Math.random().toString(16).substring(4).slice(0, 6);

const generateName = ():string => {
  const company = Math.floor(Math.random() * COMPANIES.length);
  const model = Math.floor(Math.random() * MODELS.length);
  return `${COMPANIES[company]} ${MODELS[model]}`;
};

const generateCars = ():void => {
  for (let i = 0; i < CARS_GENERATE_VALUE; i++) {
    const color = generateColor();
    const name = generateName();
    createCar(name, color);
  }
  SLIDER.innerHTML = '';
  init();
  GARAGE.innerText = `${Number(GARAGE.innerText) + CARS_GENERATE_VALUE}`;
};

BTN_GENERATE.addEventListener('click', generateCars);
