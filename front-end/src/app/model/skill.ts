import { Entity, PersonData, SkillData } from "./dataTypes";

import { Person } from "./person";


export class Skill extends Entity {


    // Inherited from Entity
    // private id?: number;

    private name: string;
    private level: number;
    private isTechnical: boolean;

    private person: Person;


    constructor(
        data?: SkillData,
        id?: number,
        name?: string,
        level?: number,
        isTechnical?: boolean,
        person?: PersonData
    ) {

        super();

        if (data) {
            const {
                id,
                name,
                level,
                isTechnical,
                person
            } = data;

            this.id = id;
            this.name = name;
            this.level = level;
            this.isTechnical = isTechnical;

            this.person = new Person(person);
            // return in case is accidentally provided the data object as well as more parameters
            return;

        } else {
            this.id = id ?? undefined;
            this.name = name ?? "";
            this.level = level ?? 100;
            this.isTechnical = isTechnical ?? false;

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


    public get getLevel(): number {
        return this.level;
    }
    public set setLevel(level: number) {
        this.level = level;
    }


    public get getIsTechnical(): boolean {
        return this.isTechnical;
    }
    public set setIsTechnical(isTechnical: boolean) {
        this.isTechnical = isTechnical;
    }

    
    public get getPerson(): Person {
        return this.person;
    }
    public set setPerson(person: Person) {
        this.person = person;
    }


}