import {
  BTN_FIRST_PAGE,
  BTN_LAST_PAGE,
  BTN_NEXT_PAGE,
  BTN_PREV_PAGE,
  PAGE,
  PAGINATION,
  SLIDER,
} from '../../config/constants';
import { Page } from '../../config/enums';

const currentPage = ():number => parseInt(PAGE.innerText);
const lastPage = ():number => SLIDER.childElementCount;
const delta = ():number => currentPage() - lastPage();

export const disableAllBtns = (disable: boolean): void => {
  if (disable) {
    BTN_FIRST_PAGE.setAttribute('disabled', 'disabled');
    BTN_PREV_PAGE.setAttribute('disabled', 'disabled');
    BTN_NEXT_PAGE.setAttribute('disabled', 'disabled');
    BTN_LAST_PAGE.setAttribute('disabled', 'disabled');
  } else {
    BTN_FIRST_PAGE.removeAttribute('disabled');
    BTN_PREV_PAGE.removeAttribute('disabled');
    BTN_NEXT_PAGE.removeAttribute('disabled');
    BTN_LAST_PAGE.removeAttribute('disabled');
  }
};

export const disableBtns = (): void => {
  if (currentPage() === lastPage()) {
    if (currentPage() === 1) {
      disableAllBtns(true);
    } else {
      BTN_NEXT_PAGE.setAttribute('disabled', 'disabled');
      BTN_LAST_PAGE.setAttribute('disabled', 'disabled');
      BTN_FIRST_PAGE.removeAttribute('disabled');
      BTN_PREV_PAGE.removeAttribute('disabled');
    }
  } else if (currentPage() < lastPage()) {
    if (currentPage() === 1) {
      BTN_FIRST_PAGE.setAttribute('disabled', 'disabled');
      BTN_PREV_PAGE.setAttribute('disabled', 'disabled');
      BTN_NEXT_PAGE.removeAttribute('disabled');
      BTN_LAST_PAGE.removeAttribute('disabled');
    } else {
      disableAllBtns(false);
    }
  }
};

const handler = (e: Event): void => {
  const target:string = `.${(<HTMLElement>e.target)!.className}`;
  if (target == Page.first) {
    PAGE.innerText = `1`;
    SLIDER.style.left = `${0}%`;
  }
  if (target === Page.prev) {
    PAGE.innerText = `${parseInt(PAGE.innerText) - 1}`;
    SLIDER.style.left = `${parseInt(SLIDER.style.left) + 100}%`;
  }
  if (target === Page.next) {
    PAGE.innerText = `${parseInt(PAGE.innerText) + 1}`;
    SLIDER.style.left = `${parseInt(SLIDER.style.left) - 100}%`;
  }
  if (target === Page.last) {
    SLIDER.style.left = `${parseInt(SLIDER.style.left) + delta() * 100}%`;
    PAGE.innerText = `${lastPage()}`;
  }
  disableBtns();
};

PAGINATION.addEventListener('click', (e) => handler(e));
