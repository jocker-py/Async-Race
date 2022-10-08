import {
  Menu,
  Records,
  Page,
  Control,
  Create,
  Update,
  Race,
  PopUp,
} from './enums';

export const BTN_TO_GARAGE = <HTMLElement>document.querySelector(Menu.garage);
export const BTN_TO_WIN = <HTMLElement>document.querySelector(Menu.winners);

export const NAME_CREATE = <HTMLInputElement>(
  document.querySelector(Create.name)
);
export const COLOR_CREATE = <HTMLInputElement>(
  document.querySelector(Create.color)
);
export const BTN_CREATE = <HTMLElement>document.querySelector(Create.btn);

export const NAME_UPDATE = <HTMLInputElement>(
  document.querySelector(Update.name)
);
export const COLOR_UPDATE = <HTMLInputElement>(
  document.querySelector(Update.color)
);
export const BTN_UPDATE = <HTMLElement>document.querySelector(Update.btn);

export const BTN_RACE = <HTMLElement>document.querySelector(Control.race);
export const BTN_RESET = <HTMLElement>document.querySelector(Control.reset);
export const BTN_GENERATE = <HTMLElement>(
  document.querySelector(Control.generate)
);

export const SLIDER = <HTMLElement>document.querySelector(Race.list);
export const GARAGE = <HTMLElement>document.querySelector(Race.garage);
export const PAGINATION = <HTMLElement>document.querySelector(Page.root);
export const BTN_FIRST_PAGE = <HTMLElement>document.querySelector(Page.first);
export const BTN_NEXT_PAGE = <HTMLElement>document.querySelector(Page.next);
export const BTN_PREV_PAGE = <HTMLElement>document.querySelector(Page.prev);
export const BTN_LAST_PAGE = <HTMLElement>document.querySelector(Page.last);
export const PAGE = <HTMLElement>document.querySelector(Page.current);

export const RECORDS = <HTMLElement>document.querySelector(Records.root);
export const CONTROLS_RECORDS = <HTMLElement>(
  document.querySelector(Records.controls)
);
export const PAGE_RECORDS = <HTMLElement>document.querySelector(Records.page);
export const LIST_RECORDS = <HTMLElement>document.querySelector(Records.list);
export const BTN_FIRST_RECORDS = <HTMLElement>(
  document.querySelector(Records.first)
);
export const BTN_PREV_RECORDS = <HTMLElement>(
  document.querySelector(Records.prev)
);
export const BTN_NEXT_RECORDS = <HTMLElement>(
  document.querySelector(Records.next)
);
export const BTN_LAST_RECORDS = <HTMLElement>(
  document.querySelector(Records.last)
);
export const VALUE_RECORDS = <HTMLElement>document.querySelector(Records.value);

export const POP_UP = <HTMLElement>document.querySelector(PopUp.root);

export const CARS_ON_PAGE = 7;
export const CARS_GENERATE_VALUE = 100;
export const CAR_WITHD = 150;
