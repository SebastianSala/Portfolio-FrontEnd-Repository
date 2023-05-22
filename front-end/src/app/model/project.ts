import { Entity, PersonData, ProjectData } from "./dataTypes";

import { Person } from "./person";


// export class Project implements ProjectData{
export class Project extends Entity {


    // Inherited from Entity
    // private id?: number;

    private name: string;
    private date: string;
    private shortDescription: string;
    private longDescription: string;
    private imgUrl: string;
    private webUrl: string;

    private person: Person;


    constructor(
        data?: ProjectData,
        id?: number,
        name?: string,
        date?: string,
        shortDescription?: string,
        longDescription?: string,
        imgUrl?: string,
        webUrl?: string,
        person?: PersonData
    ) {

        super();

        if (data) {
            const {
                id,
                name,
                date,
                shortDescription,
                longDescription,
                imgUrl,
                webUrl,
                person
            } = data;
            this.id = id;
            this.name = name;
            this.date = date;
            this.shortDescription = shortDescription;
            this.longDescription = longDescription;
            this.imgUrl = imgUrl;
            this.webUrl = webUrl;
            this.person = new Person(person);
            // return in case is accidentally provided the data object as well as more parameters
            return;
        } else {
            this.id = id ?? undefined;
            this.name = name ?? "";
            this.date = date ?? "";
            this.shortDescription = shortDescription ?? "";
            this.longDescription = longDescription ?? "";
            this.imgUrl = imgUrl ?? "";
            this.webUrl = webUrl ?? "";
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


    public get getDate(): string {
        return this.date;
    }
    public set setDate(date: string) {
        this.date = date;
    }


    public get getShortDescription(): string {
        return this.shortDescription;
    }
    public set setShortDescription(shortDescription: string) {
        this.shortDescription = shortDescription;
    }


    public get getLongDescription(): string {
        return this.longDescription;
    }
    public set setLongDescription(longDescription: string) {
        this.longDescription = longDescription;
    }


    public get getImgUrl(): string {
        return this.imgUrl;
    }
    public set setImgUrl(imgUrl: string) {
        this.imgUrl = imgUrl;
    }


    public get getWebUrl(): string {
        return this.webUrl;
    }
    public set setWebUrl(webUrl: string) {
        this.webUrl = webUrl;
    }


    public get getPerson(): Person {
        return this.person;
    }
    public set setPerson(person: Person) {
        this.person = person;
    }


}