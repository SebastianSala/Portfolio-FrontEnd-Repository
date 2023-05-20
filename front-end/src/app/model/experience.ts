import { Entity, PersonData, ExperienceData } from "./dataTypes";

import { Person } from "./person";


export class Experience extends Entity {


    // Inherited from Entity
    // private id?: number;

    private position: string;
    private description: string;
    private company: string;
    private startDate: string;
    private endDate: string;
    private logoUrl: string;
    private webUrl: string;


    private person: Person;


    constructor(
        data?: ExperienceData,
        id?: number,
        position?: string,
        description?: string,
        company?: string,
        startDate?: string,
        endDate?: string,
        logoUrl?: string,
        webUrl?: string,
        person?: PersonData
    ) {

        super();

        if (data) {
            const {
                id,
                position,
                description,
                company,
                startDate,
                endDate,
                logoUrl,
                webUrl,
                person
            } = data;

            this.id = id;
            this.position = position;
            this.description = description;
            this.company = company;
            this.startDate = startDate;
            this.endDate = endDate;
            this.logoUrl = logoUrl;
            this.webUrl = webUrl;

            this.person = new Person(person);
            // return in case is accidentally provided the data object as well as more parameters
            return;

        } else {
            this.id = id ?? undefined;
            this.position = position ?? "";
            this.description = description ?? "";
            this.company = company ?? "";
            this.startDate = startDate ?? "";
            this.endDate = endDate ?? "";
            this.logoUrl = logoUrl ?? "";
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


    public get getPosition(): string {
        return this.position;
    }
    public set setPosition(position: string) {
        this.position = position;
    }


    public get getDescription(): string {
        return this.description;
    }
    public set setDescription(description: string) {
        this.description = description;
    }


    public get getCompany(): string {
        return this.company;
    }
    public set setCompany(company: string) {
        this.company = company;
    }


    public get getStartDate(): string {
        return this.startDate;
    }
    public set setStartDate(startDate: string) {
        this.startDate = startDate;
    }


    public get getEndDate(): string {
        return this.endDate;
    }
    public set setEndDate(endDate: string) {
        this.endDate = endDate;
    }


    public get getLogoUrl(): string {
        return this.logoUrl;
    }
    public set setLogoUrl(logoUrl: string) {
        this.logoUrl = logoUrl;
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