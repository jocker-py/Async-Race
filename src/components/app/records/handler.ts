import {
  BTN_FIRST_RECORDS,
  BTN_LAST_RECORDS,
  BTN_NEXT_RECORDS,
  BTN_PREV_RECORDS,
  CONTROLS_RECORDS,
  LIST_RECORDS,
  PAGE_RECORDS,
} from '../../config/constants';
import { Records } from '../../config/enums';

const disableAllbtns = (disable: boolean): void => {
  if (disable) {
    BTN_FIRST_RECORDS.setAttribute('disabled', 'disabled');
    BTN_PREV_RECORDS.setAttribute('disabled', 'disabled');
    BTN_NEXT_RECORDS.setAttribute('disabled', 'disabled');
    BTN_LAST_RECORDS.setAttribute('disabled', 'disabled');
  } else {
    BTN_FIRST_RECORDS.removeAttribute('disabled');
    BTN_PREV_RECORDS.removeAttribute('disabled');
    BTN_NEXT_RECORDS.removeAttribute('disabled');
    BTN_LAST_RECORDS.removeAttribute('disabled');
  }
};

export const disableBtns = (): void => {
  const currentPage: number = parseInt(PAGE_RECORDS.innerText);
  const lastPage: number = LIST_RECORDS.childElementCount;
  if (currentPage === lastPage) {
    if (currentPage === 1) {
      disableAllbtns(true);
    } else {
      BTN_NEXT_RECORDS.setAttribute('disabled', 'disabled');
      BTN_LAST_RECORDS.setAttribute('disabled', 'disabled');
      BTN_FIRST_RECORDS.removeAttribute('disabled');
      BTN_PREV_RECORDS.removeAttribute('disabled');
    }
  } else if (currentPage < lastPage) {
    if (currentPage === 1) {
      BTN_FIRST_RECORDS.setAttribute('disabled', 'disabled');
      BTN_PREV_RECORDS.setAttribute('disabled', 'disabled');
      BTN_NEXT_RECORDS.removeAttribute('disabled');
      BTN_LAST_RECORDS.removeAttribute('disabled');
    } else {
      disableAllbtns(false);
    }
  }
};

const handler = (e: Event): void => {
  const target = `.${(<HTMLElement>e.target)!.className}`;
  if (target === Records.first) {
    PAGE_RECORDS.innerText = `1`;
    LIST_RECORDS.style.left = `${0}%`;
  }
  if (target === Records.prev) {
    PAGE_RECORDS.innerText = `${parseInt(PAGE_RECORDS.innerText) - 1}`;
    LIST_RECORDS.style.left = `${parseInt(LIST_RECORDS.style.left) + 100}%`;
  }
  if (target === Records.next) {
    PAGE_RECORDS.innerText = `${parseInt(PAGE_RECORDS.innerText) + 1}`;
    LIST_RECORDS.style.left = `${parseInt(LIST_RECORDS.style.left) - 100}%`;
  }
  if (target === Records.last) {
    const currentPage: number = parseInt(PAGE_RECORDS.innerText);
    const lastPage: number = LIST_RECORDS.childElementCount;
    const delta = currentPage - lastPage;
    PAGE_RECORDS.innerText = `${lastPage}`;
    LIST_RECORDS.style.left = `${
      parseInt(LIST_RECORDS.style.left) + delta * 100
    }%`;
  }
  disableBtns();
};

CONTROLS_RECORDS.addEventListener('click', (e) => handler(e));
