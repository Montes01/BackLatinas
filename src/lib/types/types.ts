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
    user?: User;
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
    description?: string;
    women?: Women[];
    subServices?: SubService[];
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
    createdAt: string;
    userName: string;
}


// CategoryFilter.ts
export interface CategoryFilter {
    idCategoryFilter: number;
    name: string;
    women: Women[];
}

//LoginResponse

export interface LoginResponse {
    sub: string;
    exp: number;
    nombre: string;
    rol: string;
}

// girlList single response

export interface GirlResponse {
    profilePhoto: string;
    name: string
    nationality: string;
    age: number;
    id: number;
    user_name: string;
    namePackage: string;
}

// ServiceList single response

export interface ServiceResponse {
    idService: number;
    title: string;
}

export interface FilterResponse {
    [key: string]: number;
};

export interface WomenRequest {
    user_name: string;
    nationality: string;
    name: string;
    age: number;
    colorEyes: string;
    colorHair: string;
    colorSkin: string;
    cupSize: string;
    description: string;
    height: number;
    hips: number;
    piercings: number;
    shaving: string;
    shoeSize: number;
    smoker: string;
    tattoos: number;
    weight: number;
    selectedFilterNames: string[];
    selectedServiceIds: number[];
    photoProfile: string;
}

export interface PackageResponse {
    idPackage: number;
    name: string;
    price: number;
    description: string;
}

export interface RegisterWomenRequest {
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    nationality: string;
    idPackage: number;
}

export interface CommentRequest {
    comment: string,
    stars: number,
    email: string
}

export interface UserInfoResponse {
    userName: string,
    gender: string,
    numberPhone: string,
    nationality: string,
    profilePhoto: string
}