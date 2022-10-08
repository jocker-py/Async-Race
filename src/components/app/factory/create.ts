import {
  BTN_CREATE,
  CARS_ON_PAGE,
  COLOR_CREATE,
  GARAGE,
  NAME_CREATE,
  SLIDER,
} from '../../config/constants';
import { Car, Track } from '../../config/enums';
import { clone, createFragment, findTemplate } from '../../config/utils';
import { createCar } from '../api/api';

const addOptions = (
  item: HTMLElement,
  name: string,
  color: string,
  id: number
): void => {
  (<HTMLElement>item.querySelector(Car.name)).innerText = name;
  (<HTMLElement>item.querySelector(Car.svg)).style.fill = color;
  (<HTMLElement>item.querySelector(Car.id)).id = `item-${id}`;
};

const createTrackTemplate = (page: number): void => {
  const fragment = createFragment();
  const trackTemplate = findTemplate(Track.template);
  const trackClone = clone(trackTemplate);
  const track = <HTMLElement>trackClone.querySelector(Track.id);

  track.id = `page-${page}`;
  fragment.append(trackClone);
  SLIDER.appendChild(fragment);
};

const createCarTemplate = (name: string, color: string, id: number):HTMLElement => {
  const carTemplate = findTemplate(Car.template);
  const carClone = clone(carTemplate);
  addOptions(carClone, name, color, id);
  return carClone;
};

export const add = (
  name: string,
  color: string,
  id: number,
  index: number
): void => {
  const numberOfPage = Math.trunc(index / CARS_ON_PAGE);
  if (index % CARS_ON_PAGE === 0) createTrackTemplate(numberOfPage);

  const fragment = createFragment();
  const root = <HTMLElement>document.querySelector(`#page-${numberOfPage}`);
  const track = <HTMLElement>root.querySelector(Track.list);
  const newCar = createCarTemplate(name, color, id);

  fragment.append(newCar);
  track.appendChild(fragment);
};

const addCar = async (): Promise<void> => {
  GARAGE.innerText = `${Number(GARAGE.innerText) + 1}`;
  const options = await createCar(NAME_CREATE.value, COLOR_CREATE.value);
  if (options) {
    const index = parseInt(GARAGE.innerText);
    const {name, id, color} = options;
    add(name, color, id, index);
  }
};

BTN_CREATE.addEventListener('click', addCar);
