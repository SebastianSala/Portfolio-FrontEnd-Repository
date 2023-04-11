export interface Data {
    "name": string;
    "img": string;
    "backImg": string;
    "expertise": string;
    "company": DataCompany;
    "studies": DataStudies[];
    "location": string;
    "about": DataAbout;
    "works": DataWorksProjects[];
    "Projects": DataWorksProjects[];
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

export interface DataWorksProjects {
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