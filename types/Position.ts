import { Person } from "./Person";

export type Position = {

    _id: string;
    _createdAt: Date;
    title: string;
    number: number;
    people: Person[];

}