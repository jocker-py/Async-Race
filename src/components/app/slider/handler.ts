
import { BTN_RACE, PAGE, SLIDER } from '../../config/constants';
import { Track, Car, Engine } from '../../config/enums';
import { findPage } from '../../config/utils';
import { startAnimation, stopAnimation } from '../animation';
import { deleteCar, init, toggleEngine } from '../api/api';
import { deleteWinner } from '../api/winners';
import { setActiveUpdate, removeActiveUpdate } from '../factory/update';

const deletePage = (track:Element):void => {
  const currentPage = findPage(parseInt(PAGE.innerText));
  const currentList = currentPage.querySelector(Track.list);
  if(currentList?.childElementCount === 0){
    if (parseInt(PAGE.innerText) === 1){
      SLIDER.style.left = `0%`;
    } else if (parseInt(PAGE.innerText) <= SLIDER.childElementCount){
      SLIDER.style.left = `${parseInt(SLIDER.style.left) + 100}%`
      PAGE.innerText = `${parseInt(PAGE.innerText) - 1}`;
    }
    SLIDER.removeChild(currentPage); 
    SLIDER.innerHTML = '';
    init();
  }
}

const checkRace = () => {
  const currentPage = parseInt(PAGE.innerText) - 1;
  const currentList = SLIDER.querySelector(`#page-${currentPage}`);
  const stopBtns = currentList?.querySelectorAll(Track.stop);
  let decision = true
  stopBtns?.forEach((btn) => {
    if(!btn.hasAttribute('disabled')){
      decision = false;
    }
  });
  if(decision){
    BTN_RACE.removeAttribute('disabled');
  } else {
    BTN_RACE.setAttribute('disabled', 'disabled');
  }
}


export const toggleActive = (track: Element, isMove: boolean): void => {
  const start = <Element>track.querySelector(Track.start);
  const stop = <Element>track.querySelector(Track.stop);
  if (isMove) {
    start?.setAttribute('disabled', 'disabled');
    stop?.removeAttribute('disabled');
  } else {
    stop?.setAttribute('disabled', 'disabled');
    start?.removeAttribute('disabled');
  }
};

export const resetPosition = (track: Element):void => {
  const car = <HTMLElement>track.querySelector(Car.svg);
  car.style.left = `0`;
};

const findTrack = (e: Event): Element | false => {
  if ((<Element>e.target)!.closest(Track.item) as Element) {
    return (<Element>e.target)!.closest(Track.item) as Element;
  }
  return false;
};

const isSelect = (e: Event): boolean => {
  if ((<Element>e.target)!.closest(Track.select) as Element) {
    return true;
  }
  return false;
};

const isRemove = (e: Event): boolean => {
  if ((<Element>e.target)!.closest(Track.remove) as Element) {
    return true;
  }
  return false;
};

const isStart = (e: Event): boolean => {
  if ((<Element>e.target)!.closest(Track.start) as Element) {
    return true;
  }
  return false;
};

const isStop = (e: Event): boolean => {
  if ((<Element>e.target)!.closest(Track.stop) as Element) {
    return true;
  }
  return false;
};

const blockTracks = (track: Element):void => {
  const currentPage = Number(PAGE.innerText);
  const currentList = findPage(currentPage);
      const allTracks = currentList?.querySelectorAll(Track.item);
      allTracks?.forEach((item) => {
        if(item !== track){
          item.classList.add('block');
        } else {
          item.classList.remove('block');
        }
      })
}

const handler = async (e: Event): Promise<void> => {
  const track = findTrack(e);
  if (track) {
    if (isSelect(e)) {
      blockTracks(track);
      setActiveUpdate(track);
    } else {
      removeActiveUpdate();
    }
    if (isRemove(e)) {
      track.parentNode?.removeChild(track);
      deleteCar(track);
      deleteWinner(track);
      deletePage(track);
    }
    if (isStart(e)) {
      toggleActive(track, true);
      const time = toggleEngine(track, Engine.start)
      .then((res) => startAnimation(track, res));
      toggleEngine(track, Engine.drive)
        .then((res) => (res ? time : null))
        .catch(() => stopAnimation(track));
    }
    if (isStop(e)) {
      toggleEngine(track, Engine.stop)
        .then(() => stopAnimation(track))
        .then(() => resetPosition(track))
        .then(() => toggleActive(track, false))
        .catch((err) => new Error(err))
        .then(()=> checkRace());
    }
    checkRace();
  } else {
    removeActiveUpdate();
  }
};

SLIDER.addEventListener('click', (e) => handler(e));
