import {
  BTN_RACE,
  PAGE,
  SLIDER,
} from '../../config/constants';
import { Engine, Track } from '../../config/enums';
import { findPage } from '../../config/utils';
import { startAnimation, stopAnimation } from '../animation';
import { toggleEngine } from '../api/api';
import { disableAllBtns, disableBtns } from '../slider/slider';

async function startTracks(): Promise<unknown> {
  const currentPage = Number(PAGE.innerText);
  const currentList = findPage(currentPage);
  const tracks = <NodeListOf<Element>>currentList?.querySelectorAll(Track.item);
  const allPromises: unknown[] = [];
  sessionStorage.clear();
  tracks.forEach( async (track: Element) => {
    toggleEngine(track, Engine.start)
    .then((res) =>startAnimation(track, res));
    allPromises.push(
      toggleEngine(track, Engine.drive)
      .catch(() => stopAnimation(track))
    );
  });
  return Promise.all(allPromises);
};

async function startRace():Promise<void> {
  disableAll(true);
  await startTracks(); 
  disableAll(false);
}

function disableRace(disable:boolean):void {
  if(disable){
    BTN_RACE.setAttribute('disabled', 'disabled');
  } else {
    BTN_RACE.removeAttribute('disabled');
  }
}
function disableAll(disable: boolean):void{
  if (disable){
    disableStartStop(true);
    disableAllBtns(true);
    disableRace(true);
  } else {
    disableBtns()
    disableStartStop(false);
  }
}

function disableStartStop(disable: boolean):void{
  const currentPage = Number(PAGE.innerText);
  const currentList = findPage(currentPage);
  let btns;
  if(disable){
    btns = currentList.querySelectorAll(`${Track.start}, ${Track.remove}, ${Track.select}`);  
    btns.forEach((btn) => btn.setAttribute('disabled', 'disabled'));
  } else {
    btns = currentList.querySelectorAll(`${Track.stop}, ${Track.remove}, ${Track.select}`); 
    btns.forEach((btn) => btn.removeAttribute('disabled'));
  }
}

BTN_RACE.addEventListener('click', startRace);
