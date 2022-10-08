import { BTN_TO_GARAGE, BTN_TO_WIN, RECORDS } from '../config/constants';
import { initWinners } from './records/records';
import { State } from '../config/enums';

const setActive = ():void => {
    initWinners();
    RECORDS?.classList.remove(State.disactive);
    RECORDS?.classList.add(State.active);
}

const removeActive = ():void => {
    RECORDS?.classList.remove(State.active);
    RECORDS?.classList.add(State.disactive);
}

BTN_TO_WIN?.addEventListener('click', setActive);
BTN_TO_GARAGE?.addEventListener('click', removeActive);
