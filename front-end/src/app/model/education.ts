import { Entity, PersonData, EducationData } from "./dataTypes";

import { Person } from "./person";


export class Education extends Entity {


    // Inherited from Entity
    // private id?: number;

    private title: string;
    private institution: string;
    private description: string;
    private startDate: string;
    private endDate: string;
    private logoUrl: string;
    private webUrl: string;


    private person: Person;


    constructor(
        data?: EducationData,
        id?: number,
        title?: string,
        institution?: string,
        description?: string,
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
                title,
                institution,
                description,
                startDate,
                endDate,
                logoUrl,
                webUrl,
                person
            } = data;

            this.id = id;
            this.title = title;
            this.institution = institution;
            this.description = description;
            this.startDate = startDate;
            this.endDate = endDate;
            this.logoUrl = logoUrl;
            this.webUrl = webUrl;

            this.person = new Person(person);
            // return in case is accidentally provided the data object as well as more parameters
            return;

        } else {
            this.id = id ?? undefined;
            this.title = title ?? "";
            this.institution = institution ?? "";
            this.description = description ?? "";
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


    public get getTitle(): string {
        return this.title;
    }
    public set setTitle(title: string) {
        this.title = title;
    }


    public get getInstitution(): string {
        return this.institution;
    }
    public set setInstitution(institution: string) {
        this.institution = institution;
    }


    public get getDescription(): string {
        return this.description;
    }
    public set setDescription(description: string) {
        this.description = description;
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