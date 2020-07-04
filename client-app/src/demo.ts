let data: number | string;

data = 42;
data = 'd';

export interface ICar {
    color: string,
    model: string,
    topSpeed?: number
}

export interface IFruit {
    id: number,
    name: string
}

const car1: ICar = {
    color: 'blue',
    model: 'BMW'
};

const car2: ICar = {
    color: 'red',
    model: 'Mercedes',
    topSpeed: 100
};

const fruits1 = {
    id: 1,
    name: 'watermelon',
};

const fruits2 = {
    id: 2,
    name: 'melon',
};

const multiply = (x: number,y: number): string => {
    return (x * y).toString();
};

export const cars = [car1, car2];
export const fruits = [fruits1, fruits2];