import { toggleEngine } from '../api/api';
import { stopAnimation } from '../animation';
import { Engine, Track } from '../../config/enums';
import { resetPosition, toggleActive } from '../slider/handler';
import { BTN_RACE, BTN_RESET, PAGE, SLIDER } from '../../config/constants';
import { disableBtns } from '../slider/slider';
import { findPage } from '../../config/utils';

const resetAll = (): void => {
    BTN_RACE.removeAttribute('disabled');
    disableBtns();
    const currentPage = Number(PAGE.innerText);
    const currentList = findPage(currentPage);
    const tracks = <NodeListOf<Element>>currentList!.querySelectorAll(Track.item);
    tracks.forEach((track) => {
        toggleEngine(track, Engine.stop)
        .then( () => stopAnimation(track))
        .then(() => resetPosition(track))
        .then(() => toggleActive(track, false))
        .catch( err => new Error(err))
    })
}

BTN_RESET.addEventListener('click', resetAll);