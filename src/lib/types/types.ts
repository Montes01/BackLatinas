export interface Category {
    title: string;
    quantity: number;
}
// User.ts
export interface User {
    id_user: number;
    user_name: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
    nacionality: string;
    profile_photo: string;
    status: UserStatus;
    role: Role;
    comments: Comment[];
    women: Women[];
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

// Women.ts
export interface Women {
    idWomen: number;
    name: string;
    description: string;
    age: number;
    height: number;
    weight: number;
    hips: number;
    shoeSize: number;
    colorHair: string;
    colorEyes: string;
    colorSkin: string;
    cupSize: string;
    shaving: string;
    smoker: string;
    piercings: number;
    tattoos: number;
    status: WomenStatus;
    mediaList: Multimedia[];
    user: User;
    services: Service[];
    categoryFilters: CategoryFilter[];
}

export enum WomenStatus {
    ACCEPTED = "ACCEPTED",
    WAITING = "WAITING",
    REJECTED = "REJECTED",
}

// Service.ts
export interface Service {
    idService: number;
    title: string;
    description: string;
    women: Women[];
    subServices: SubService[];
}

// SubService.ts
export interface SubService {
    idSubService: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    time: number;
    service: Service;
}

// Role.ts
export interface Role {
    id_role: number;
    name: string;
    users: User[];
}

// Multimedia.ts
export interface Multimedia {
    idMedia: number;
    mediaType: MultimediaType;
    url: string;
    women?: Women;
}

export enum MultimediaType {
    PHOTO = "PHOTO",
    VIDEO = "VIDEO",
}

// Comment.ts
export interface Comment {
    idComment: number;
    comment: string;
    stars: number;
    createdAt: string; // Consider using Date type if you convert this string into a Date object
    user: User;
}


// CategoryFilter.ts
export interface CategoryFilter {
    idCategoryFilter: number;
    name: string;
    women: Women[];
}
