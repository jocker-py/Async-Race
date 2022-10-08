export enum Menu {
  garage = '#garage',
  winners = '#winners',
}

export enum Create {
  btn = '#create',
  color = '.create__color',
  name = '.create__name',
}

export enum Update {
  btn = '#update',
  color = '.update__color',
  name = '.update__name',
  form = '.update',
}

export enum Control {
  race = '.factory__race',
  reset = '.factory__reset',
  generate = '.factory__generate',
}

export enum Page {
  root = '.pagination',
  first = '.pagination__first',
  prev = '.pagination__prev',
  next = '.pagination__next',
  last = '.pagination__last',
  current = '.pagination__page',
}

export enum Records {
  root = '.records',
  value = '.records__value',
  list = '.records__list',
  first = '.records__first',
  prev = '.records__prev',
  page = '.records__page',
  next = '.records__next',
  last = '.records__last',
  controls = '.records__controls',
  wins = 'records__head-wins',
  time = 'records__head-time',
}

export enum Row {
  template = '.template__row',
  name = '.records__row-name',
  time = '.records__row-time',
  number = '.records__row-number',
  svg = '.records__icon',
  wins = '.records__row-wins',
}

export enum Table {
  template = '.template__table',
  id = '#tableId',
}

export enum Race {
  list = '.race__list',
  garage = '.race__value',
}

export enum Track {
  template = '.template__track',
  select = '.track__select',
  remove = '.track__remove',
  start = '.track__start',
  stop = '.track__stop',
  list = '.track__list',
  item = '.track__item',
  root = '.track',
  id = '#trackId',
}

export enum Car {
  name = '.car__name',
  img = '.car__image',
  template = '.template__item',
  svg = '.car__icon',
  link = '.car__link',
  id = '#itemId',
}

export enum Engine {
  start = 'started',
  stop = 'stopped',
  drive = 'drive',
}

export enum State {
  active = 'active',
  disactive = 'disactive',
  none = 'display--none',
}

export enum API {
  baseLink = 'http://127.0.0.1:3000',
  garage = 'http://127.0.0.1:3000/garage',
  engine = 'http://127.0.0.1:3000/engine',
  winners = 'http://127.0.0.1:3000/winners',
  json = 'application/json',
}

export enum Method {
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
  patch = 'PATCH',
}

export enum PopUp {
  root = '.pop-up',
  name = '.pop-up__name',
  time = '.pop-up__time',
}

export enum Sort {
  wins = 'wins',
  time = 'time',
}