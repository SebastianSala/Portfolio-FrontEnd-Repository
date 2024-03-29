import { Entity, PersonData } from "./dataTypes";

export class Person extends Entity {


    //inherited from Entity class
    // private id?: number;

    private name: string;
    private title: string;

    private email: string;
    private password: string;

    private location: string;
    private aboutMe: string;
    private imgUrl: string;
    private imgBackUrl: string;
    private webUrl: string;



    // various contructors for the different cases, passing and object, by individual argument, etc.

    constructor(
        data?: PersonData,
        id?: number,
        name?: string,
        title?: string,
        email?: string,
        password?: string,
        location?: string,
        aboutMe?: string,
        imgUrl?: string,
        imgBackUrl?: string,
        webUrl?: string
    ) {

        super();

        if (data) {
            const {
                id,
                name,
                title,
                email,
                password,
                location,
                aboutMe,
                imgUrl,
                imgBackUrl,
                webUrl,
            } = data;
            this.id = id;
            this.name = name;
            this.title = title;
            this.email = email;
            this.password = password;
            this.location = location;
            this.aboutMe = aboutMe;
            this.imgUrl = imgUrl;
            this.imgBackUrl = imgBackUrl;
            this.webUrl = webUrl;
            return;
        } else {
            // this.id ??= undefined;
            this.id = id ?? undefined;
            this.name = name ?? "";
            this.title = title ?? "";
            this.email = email ?? "";
            this.password = password ?? "";
            this.location = location ?? "";
            this.aboutMe = aboutMe ?? "";
            this.imgUrl = imgUrl ?? "";
            this.imgBackUrl = imgBackUrl ?? "";
            this.webUrl = webUrl ?? "";
        }
    }


    public get getId(): number | undefined {
        return this.id;
    }
    public set setId(value: number | undefined) {
        this.id = value;
    }


    public get getName(): string {
        return this.name;
    }
    public set setName(value: string) {
        this.name = value;
    }


    public get getTitle(): string {
        return this.title;
    }
    public set setTitle(title: string) {
        this.title = title;
    }


    public get getEmail(): string {
        return this.email;
    }
    public set setEmail(email: string) {
        this.email = email;
    }


    public get getPassword(): string {
        return this.password!;
    }
    public set setPassword(password: string) {
        this.password = password;
    }


    public get getLocation(): string {
        return this.location;
    }
    public set setLocation(location: string) {
        this.location = location;
    }


    public get getAboutMe(): string {
        return this.aboutMe;
    }
    public set setAboutMe(aboutMe: string) {
        this.aboutMe = aboutMe;
    }


    public get getImgUrl(): string {
        return this.imgUrl;
    }
    public set setImgUrl(imgUrl: string) {
        this.imgUrl = imgUrl;
    }


    public get getImgBackUrl(): string {
        return this.imgBackUrl;
    }
    public set setImgBackUrl(imgBackUrl: string) {
        this.imgBackUrl = imgBackUrl;
    }


    public get getWebUrl(): string {
        return this.webUrl;
    }
    public set setWebUrl(webUrl: string) {
        this.webUrl = webUrl;
    }


}