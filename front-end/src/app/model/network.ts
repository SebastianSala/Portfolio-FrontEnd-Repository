import { Entity, PersonData, NetworkData } from "./dataTypes";

import { Person } from "./person";


export class Network extends Entity {


    // Inherited from Entity
    // private id?: number;

    private name: string;
    private netUrl: string;

    private person: Person;


    constructor(
        data?: NetworkData,
        id?: number,
        name?: string,
        netUrl?: string,
        person?: PersonData
    ) {

        super();

        if (data) {
            const {
                id,
                name,
                netUrl,
                person
            } = data;
            this.id = id;
            this.name = name;
            this.netUrl = netUrl;
            this.person = new Person(person);
            // return in case is accidentally provided the data object as well as more parameters
            return;
        } else {
            this.id = id ?? undefined;
            this.name = name ?? "";
            this.netUrl = netUrl ?? "";
            this.person = (person ? new Person(person) : new Person());
        }
    }


    public get getId(): number | undefined {
        return this.id;
    }
    public set setId(id: number | undefined) {
        this.id = id;
    }


    public get getName(): string {
        return this.name;
    }
    public set setName(name: string) {
        this.name = name;
    }


    public get getNetUrl(): string {
        return this.netUrl;
    }
    public set setNetUrl(netUrl: string) {
        this.netUrl = netUrl;
    }


    public get getPerson(): Person {
        return this.person;
    }
    public set setPerson(person: Person) {
        this.person = person;
    }


}