import { SLIDER } from './constants';
import { ID } from './interfaces';

export const getId = (track:Element):ID => Number(track.id.split('-')[1]);
export const clone = (item:HTMLTemplateElement):HTMLElement => <HTMLElement>item.content.cloneNode(true);
export const createFragment = ():DocumentFragment => <DocumentFragment>document.createDocumentFragment();
export const findTemplate = (item:string):HTMLTemplateElement => <HTMLTemplateElement>document.querySelector(item);
export const findPage = (page:number):HTMLElement => <HTMLElement>SLIDER.querySelector(`#page-${page - 1}`);