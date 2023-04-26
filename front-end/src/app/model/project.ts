import { PersonData, ProjectData } from "./data";
import { Person } from "./person";


export class Project {


    private id?: number;

    private name: string;
    private date: string;
    private shortDescription: string;
    private longDescription: string;
    private logoUrl: string;
    private imgUrl: string;
    private webUrl: string;

    private person: Person;


    // public constructor(name: string, date: string, shortDescription: string, longDescription: string, logoUrl: string, imgUrl: string, webUrl: string, person: Person) {
    //     this.name = name;
    //     this.date = date;
    //     this.shortDescription = shortDescription;
    //     this.longDescription = longDescription;
    //     this.logoUrl = logoUrl;
    //     this.imgUrl = imgUrl;
    //     this.webUrl = webUrl;
    //     this.person = person;
    //   }

    // this.thePerson = new Person(localData.id as number, localData.name, localData.title, localData.email, localData.password, localData.location, localData.aboutMe, localData.imgUrl, localData.imgBackUrl, localData.webUrl);

    constructor(data: ProjectData);
    constructor(id: number, name: string, date: string, shortDescription: string, longDescription: string, logoUrl: string, imgUrl: string, webUrl: string, person: Person);
    constructor(
        dataOrId: ProjectData | number,
        name?: string,
        date?: string,
        shortDescription?: string,
        longDescription?: string,
        logoUrl?: string,
        imgUrl?: string,
        webUrl?: string,
        person?: Person,
    ) {
        if (typeof dataOrId === 'object') {
            const {
                id,
                name,
                date,
                shortDescription,
                longDescription,
                logoUrl,
                imgUrl,
                webUrl,
                person
            } = dataOrId;
            this.id = id as number;
            this.name = name;
            this.date = date;
            this.shortDescription = shortDescription;
            this.longDescription = longDescription;
            this.logoUrl = logoUrl;
            this.imgUrl = imgUrl;
            this.webUrl = webUrl;
            // this.person = person as unknown as PersonData;
            this.person = person;
        } else {
            this.id = dataOrId;
            this.name = name!;
            this.date = date!;
            this.shortDescription = shortDescription!;
            this.longDescription = longDescription!;
            this.logoUrl = logoUrl!;
            this.imgUrl = imgUrl!;
            this.webUrl = webUrl!;
            this.person = person!;
        }
    }


    // constructor(name: string, title: string, email: string, password: string, location: string, aboutMe: string, imgUrl: string, imgBackUrl: string, webUrl: string) {

    //     this.name = name;
    //     this.title = title;

    //     this.email = email;
    //     this.password = password;
    //     this.location = location;
    //     this.aboutMe = aboutMe;
    //     this.imgUrl = imgUrl;
    //     this.imgBackUrl = imgBackUrl;
    //     this.webUrl = webUrl;

    // }

    // constructor(data: PersonData) {
    //     const {
    //         id,
    //         name,
    //         title,
    //         email,
    //         password,
    //         location,
    //         aboutMe,
    //         imgUrl,
    //         imgBackUrl,
    //         webUrl,
    //     } = data;

    //     this.id = id;
    //     this.name = name;
    //     this.title = title;
    //     this.email = email;
    //     this.password = password;
    //     this.location = location;
    //     this.aboutMe = aboutMe;
    //     this.imgUrl = imgUrl;
    //     this.imgBackUrl = imgBackUrl;
    //     this.webUrl = webUrl;
    // }


    //   public get getAboutMe(): string {
    //     return this.aboutMe;
    // }

    //   public set setAboutMe(aboutMe: string) {
    //     this.aboutMe = aboutMe;
    // }




    public get getId(): number | undefined {
        return this.id;
    }
    public set setId(id: number | undefined) {
        this.id = id;
    }


    public get getName(): string {
        return this.name;
    }
    public set SetName(name: string) {
        this.name = name;
    }


    public get getDate(): string {
        return this.date;
    }
    public set SetDate(date: string) {
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


    public get getLogoUrl(): string {
        return this.logoUrl;
    }
    public set setLogoUrl(logoUrl: string) {
        this.logoUrl = logoUrl;
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


}