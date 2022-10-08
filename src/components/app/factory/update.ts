import {
  BTN_UPDATE,
  COLOR_UPDATE,
  NAME_UPDATE,
} from '../../config/constants';
import { Car } from '../../config/enums';
import { updateCar } from '../api/api';


const update = (track: Element | false): void => {
  if (track && !track.classList.contains('block')) {
    (<HTMLElement>track.querySelector(Car.name))!.innerText = NAME_UPDATE.value;
    (<HTMLElement>track.querySelector(Car.svg))!.style.fill = COLOR_UPDATE.value;
      updateCar(NAME_UPDATE.value, COLOR_UPDATE.value, track);
      toggleDisable(true);
      track.classList.add('block');
  }
}

const toggleDisable = (disable: boolean):void => {
  if (disable) {
    COLOR_UPDATE.setAttribute('disabled', 'disabled');
    BTN_UPDATE.setAttribute('disabled', 'disabled');
    NAME_UPDATE.setAttribute('disabled', 'disabled');
  } else {
    COLOR_UPDATE.removeAttribute('disabled');
    BTN_UPDATE.removeAttribute('disabled');
    NAME_UPDATE.removeAttribute('disabled');
  }
}

export const setActiveUpdate = (track: Element): void => {
  toggleDisable(false);
  NAME_UPDATE.value = (<HTMLElement>track.querySelector(Car.name))!.innerText;
  BTN_UPDATE.addEventListener('click', () => update(track));
};

export const removeActiveUpdate = (): void => {
  toggleDisable(true);
  NAME_UPDATE.value = '';
};




