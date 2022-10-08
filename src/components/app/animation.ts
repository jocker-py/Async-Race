import { Car, PopUp, State } from '../config/enums';
import { CAR_WITHD, POP_UP } from '../config/constants';
import { EngineOptions } from '../config/interfaces';
import { createWinner } from './api/winners';
import { getId } from '../config/utils';

const showWinner = (time:string, track:Element): void => {
  const name = (<HTMLElement>track.querySelector(Car.name)).innerText;
  const popUpName = <HTMLElement>POP_UP.querySelector(PopUp.name);
  const popUpTime = <HTMLElement>POP_UP.querySelector(PopUp.time);
  popUpName.innerText = name || `<No name>`;
  popUpTime.innerText = time;
  POP_UP.classList.add(State.active)
  setTimeout(()=>{POP_UP.classList.remove(State.active)}, 3000)
}

const draw = (progress: number, track: Element, time:string): void => {
  const car = <HTMLElement>track.querySelector(Car.svg);
  const endPoint = window.innerWidth - CAR_WITHD;
  const widthScreen = window.innerWidth;
  car.style.left = `${progress * (endPoint / widthScreen) * 100}%`;
  if (progress === 1) {
    if (!sessionStorage.getItem('winner')){
        sessionStorage.setItem('winner', `${time}-${track.id}`); 
        const id = getId(track);
        showWinner(time, track);
        createWinner({id, wins: 1, time: parseFloat(time)})
    } 
  }
};

export const stopAnimation = (track: Element): void => {
  if (track.hasAttribute('requestId')) {
    cancelAnimationFrame(Number(track.getAttribute('requestId')));
    track.removeAttribute('requestId');
  }
};

export const startAnimation = (
  track: Element,
  options: EngineOptions
): void => {
  const duration = options.distance / options.velocity;
  const timeEnd = (duration / 1000).toFixed(2);
  const timeStart = performance.now();
  let myReq;
  const move = (time: number) => {
    let timeFraction = (time - timeStart) / duration;
    if (timeFraction > 1) timeFraction = 1;
    draw(timeFraction, track, timeEnd);
    if (timeFraction < 1) {
      myReq = requestAnimationFrame(move);
      track.setAttribute('requestId', String(myReq));
    }
  };
  myReq = requestAnimationFrame(move);
};
