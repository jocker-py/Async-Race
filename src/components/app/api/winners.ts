import { VALUE_RECORDS } from '../../config/constants';
import { API, Method } from '../../config/enums';
import { Winner, WinnerOptions } from '../../config/interfaces';
import { getId } from '../../config/utils';

export async function getWinners(): Promise<WinnerOptions[] | void> {
    const response = await fetch(`${API.winners}`);
    if (response.status === 200) {
      const json = await response.json();
      return json;
    }
}

async function getWinner(id: number): Promise<WinnerOptions | void>  {
  const response = await fetch(`${API.winners}/${id}`); 
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
}

export async function deleteWinner(track: Element): Promise<void> {
  const id = getId(track);
  const response = await fetch(`${API.winners}/${id}`, {
    method: Method.delete,
  });

  if (response.status === 200) {
    VALUE_RECORDS.innerText = `${parseInt(VALUE_RECORDS.innerText) - 1}`;
  }
}

export async function createWinner(options: Winner):Promise<WinnerOptions | void> {
  const response = await fetch(`${API.winners}`, {
    method: Method.post,
    headers: {
      'Content-Type': API.json,
    },
    body: JSON.stringify(options),
  });
  if (response.status === 201) {
    const create = await response.json();
    return create;
  } else if (response.status === 500) {
    const oldOptions = await getWinner(options.id);
    if(oldOptions){
      const {id, time, wins} = oldOptions;
      const bestTime = Math.min(time, options.time);
    const newOptions: Winner = { id, wins: wins + 1, time: bestTime };
    const update = await updateWinner(newOptions);
    return update;
    }
    
  }
}
async function updateWinner(options: Winner): Promise<WinnerOptions | void> {
  const { id, wins, time } = options;
  const response = await fetch(`${API.winners}/${id}`, {
    method: Method.put,
    headers: {
      'Content-Type': API.json,
    },
    body: JSON.stringify({ wins, time }),
  });
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
}