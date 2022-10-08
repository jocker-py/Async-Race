import { GARAGE } from '../../config/constants';
import { API, Method } from '../../config/enums';
import { add } from '../factory/create';
import { CarOptions, EngineOptions, Status } from '../../config/interfaces';
import { getId } from '../../config/utils';

async function getCars():Promise<CarOptions[] | never > {
  const response = await fetch(`${API.garage}`);
  if (response.status === 200) {
    let json = await response.json();
    return json;
  }
  throw new Error(`Something wrong, code:${response.status}`);
}

function addAllCars(res: CarOptions[]):number {
  res.forEach((options: CarOptions, idx: number) => {
    const { name, color, id } = options;
    add(name, color, id, idx);
  });
  return res.length;
}

function addTitle(values: number):void {
  GARAGE.innerHTML = `${values}`;
}

export function init():void {
  getCars()
    .then((res) => addAllCars(res))
    .then((values) => addTitle(values));
}

export async function createCar(name: string, color: string): Promise<CarOptions | never> {
  const response = await fetch(`${API.garage}`, {
    method: Method.post,
    headers: {
      'Content-Type': API.json,
    },
    body: JSON.stringify({ name, color }),
  });
  if(response.status === 201){
    const json = await response.json();
    return json;
  } else {
    throw new Error("Car wasn't created");
  }
}

export async function deleteCar(track: Element): Promise<void | never> {
  const id = getId(track);
  const response = await fetch(`${API.garage}/${id}`, {
    method: Method.delete,
  });
  if(response.status === 200){
    GARAGE.innerText = `${parseInt(GARAGE.innerText) - 1}`;
  } else if (response.status === 404) {
    throw new Error('Error 404 Car is not Found');
  }
}

export async function getCar(track:Element): Promise<CarOptions | void> {
  const id = getId(track);
  const response = await fetch(`${API.garage}/${id}`);
  if (response.status === 200) {
    const json = await response.json();
    return json
  }
}

export async function updateCar(
  name: string,
  color: string,
  track: Element
): Promise<CarOptions | void> {
  const id = getId(track);
  const response = await fetch(`${API.garage}/${id}`, {
    method: Method.put,
    headers: {
      'Content-Type': API.json,
    },
    body: JSON.stringify({ name, color }),
  });
  if(response.status === 200){
    const json = await response.json();
    return json;
  }
}

export async function toggleEngine(
  track: Element,
  status: Status
): Promise<EngineOptions | never> {
  const id = getId(track);
  const response = await fetch(`${API.engine}?id=${id}&status=${status}`, {
    method: Method.patch,
  });
  if (response.status === 200) {
    let json = await response.json();
    return json;
  } else {
    throw new Error();
  }
}
