import { Options, Winner, WinnerOptions } from '../../config/interfaces';
import { Car, Records,  Row, Sort, Table } from '../../config/enums';
import { LIST_RECORDS, SLIDER, VALUE_RECORDS } from '../../config/constants';
import { getWinners } from '../api/winners';
import { disableBtns } from './handler';
import { clone, createFragment, findTemplate } from '../../config/utils';

const findTrack = (id:number):HTMLElement => (<HTMLElement>SLIDER.querySelector(`#item-${id}`));
const findTable = (page:number):HTMLElement => <HTMLElement>LIST_RECORDS.querySelector(`#table-${page}`);
const getName = (track:Element):string => (<HTMLElement>track.querySelector(Car.name)).innerText;
const getColor = (track:Element):string => (<HTMLElement>track.querySelector(Car.svg)).style.fill;

const addOptions = (item:HTMLElement, options:WinnerOptions, order:number):void => {
    const {name, color, time, wins} = options;
    (<HTMLElement>item.querySelector(Row.name)).innerText = name;
    (<HTMLElement>item.querySelector(Row.svg)).style.fill = color;
    (<HTMLElement>item.querySelector(Row.time)).innerText = `${time} s`;
    (<HTMLElement>item.querySelector(Row.wins)).innerText = `${wins}`;
    (<HTMLElement>item.querySelector(Row.number)).innerText = `${order + 1}`;
}

const createRow = (options: WinnerOptions, order:number):HTMLElement => {
    const rowTemplate = findTemplate(Row.template);
    const rowClone = clone(rowTemplate);
    addOptions(rowClone, options, order);
    return rowClone;
}

const getFullOptions = (track:HTMLElement):Options => { 
    const name = getName(track);
    const color = getColor(track);
    return {name, color};
}

const addWinner = (options:Winner, page:number, order: number):void => {
    const fragment = createFragment();
    const {id, wins, time} = options;
    const track = findTrack(id);
    if(track){
        const table = findTable(page);
        const {name, color} = getFullOptions(track);
        const newRow = createRow({id, wins, time, name, color}, order);
        fragment.append(newRow);
        table.appendChild(fragment);
    }   
}

const addTable = (page:number):void => {
    const fragment = createFragment();
    const tableTemplate = findTemplate(Table.template);
    const tableClone = clone(tableTemplate);
    const table = <HTMLElement>tableClone.querySelector(Table.id);
    table.id = `table-${page}`;
    fragment.append(tableClone);
    LIST_RECORDS.appendChild(fragment);
}

export const initWinners = async ():Promise<void> => {
    let winners = await getWinners();
    if(winners){
        VALUE_RECORDS.innerText = `${winners.length}`;
        LIST_RECORDS.innerHTML = '';
        const sort = sessionStorage.getItem('sort');
        if (sort === Sort.time){
            winners = sortByTime(winners);
        } 
        if (sort === Sort.wins){
            winners = sortByWins(winners);
        }
        for(let i = 0; i < winners.length; i++){
            let page = Math.trunc(i / 10);
            if(i % 10 === 0){
                addTable(page);
            }
            addWinner(winners[i], page, i);
        }
    }
    disableBtns();
}

const sortByTime = (arr:WinnerOptions[]): WinnerOptions[] => {
    const order = !!sessionStorage.getItem('order');
    if (order) {
        return arr.sort((car1, car2) => car1.time - car2.time);
    } else {
        return arr.sort((car1, car2) => car2.time - car1.time);
    }
};

const sortByWins = (arr:WinnerOptions[]): WinnerOptions[] => {
    const order = !!sessionStorage.getItem('order');
    if (order) {
        return arr.sort((car1, car2) => car1.wins - car2.wins);
    } else {
        return arr.sort((car1, car2) => car2.wins - car1.wins);
    }
};

const handlerSort = (e: Event):void => {
    const target = (<HTMLElement>e.target);
    if (target.classList.contains(Records.time)) {
        const order = sessionStorage.getItem('order');
        sessionStorage.setItem('order', `${order ? '' : true}`);
        sessionStorage.setItem('sort', Sort.time);
        LIST_RECORDS.innerHTML = '';
        initWinners();
    } else if (target.classList.contains(Records.wins)){
        const order = sessionStorage.getItem('order');
        sessionStorage.setItem('order', `${order ? '' : true}`);
        sessionStorage.setItem('sort', Sort.wins);
        LIST_RECORDS.innerHTML = '';
        initWinners();
    }
}


LIST_RECORDS.addEventListener('click', (e) => handlerSort(e));