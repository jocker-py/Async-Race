interface Car {
    readonly id : ID,
}

export interface Winner extends Car {
    wins: number,
    time: number
}

export interface Options {
    name : string,
    color: string,
}

export interface EngineOptions {
    readonly velocity: number,
    readonly distance: number,
}

export type WinnerOptions = Winner & Options;
export type CarOptions = Car & Options;
export type Status = 'stopped'| 'started' | 'drive';
export type ID = number;
