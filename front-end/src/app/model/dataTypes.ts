import { Person } from "./person";

export abstract class Entity {
    protected id?: number;
}

export interface EntityChange {
    change: boolean;
    entity: Entity;
}

export interface ResponseMessage extends JSON {
    message: string;
}

export interface PersonData {
    id: number;
    name: string;
    title: string;
    email: string;
    password: string;
    location: string;
    aboutMe: string;
    imgUrl: string;
    imgBackUrl: string;
    webUrl: string;
}

export interface ProjectData {
    id: number;
    name: string;
    date: string;
    shortDescription: string;
    longDescription: string;
    imgUrl: string;
    webUrl: string;
    person: PersonData;
}

export interface NetworkData {
    id: number;
    name: string;
    netUrl: string;
    person: PersonData;
}

export interface EducationData {
    id: number;
    title: string;
    institution: string;
    description: string;
    startDate: string;
    endDate: string;
    logoUrl: string;
    webUrl: string;
    person: PersonData;
}

export enum EducationProperties {
    Title = 'title',
    Institution = 'institution',
    Description = 'description',
    StartDate = 'startDate',
    EndDate = 'endDate',
    LogoUrl = 'logoUrl',
    WebUrl = 'webUrl'
};

export interface SkillData {
    id: number;
    name: string;
    level: number;
    isTechnical: boolean;
    person: PersonData;
}

export enum SkillProperties {
    Name = 'name',
    Level = 'level',
    IsTechnical = 'isTechnical',
};

export interface ExperienceData {
    id: number;
    position: string;
    description: string;
    company: string;
    startDate: string;
    endDate: string;
    logoUrl: string;
    webUrl: string;
    person: PersonData;
}

export enum ExperienceProperties {
    Position = 'position',
    Description = 'description',
    Company = 'company',
    StartDate = 'startDate',
    EndDate = 'endDate',
    LogoUrl = 'logoUrl',
    WebUrl = 'webUrl'
};

// export class ProjectClassData {
//     protected id: number | undefined;
//     protected name: string | undefined;
//     protected date: string | undefined;
//     protected shortDescription: string | undefined;
//     protected longDescription: string | undefined;
//     protected logoUrl: string | undefined;
//     protected imgUrl: string | undefined;
//     protected webUrl: string | undefined;
//     // person: PersonData;
//     protected person: Person | undefined;
// }


export interface Data {
    "name": string;
    // "img": string;
    // "backImg": string;
    "imgs": Imgs,
    "title": string;
    "email": string;
    "company": DataCompany;
    "networks": DataNetworks[];
    "studies": DataStudies[];
    "location": string;
    "about": DataAbout;
    "experience": DataExperienceProjects[];
    "Projects": DataExperienceProjects[];
    "skills": DataSkills;
    "ContactMe": DataContacMe;
    "footer": DataFooter;
};

export interface DataAbout {
    part: string;
};

export interface DataStudies {
    id: number;
    title: string;
    institution: string;
    inicio: Date;
    fin: Date;
    logo: string;
    url: string;
};

export interface DataExperienceProjects {
    id: number;
    name: string;
    title: string;
    description: string;
    img: Img[];
    url: string;
};

interface Img {
    url: string;
}

interface Imgs {
    logo: Img;
    backImg: Img;
}


export interface DataContacMe {
    name: string;
    title: string;
    description: string;
    url: string;
};

export interface DataFooter {
    name: string;
    url: string;
};

export interface DataCompany {
    name: string;
    img: string;
    url: string;
};

export interface DataSkills {
    hardSkills: Skill[];
    softSkills: Skill[];
}

export interface Skill {
    id: number;
    name: string;
    level: number;
}

export interface DataNetworks {
    id: number;
    name: string;
    logo: string;
    url: string;
}