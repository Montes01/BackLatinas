export interface Service {
    title: string;
    url: string;
}

export interface Comment {
    text: string;
    rate: 0 | 1 | 2 | 3 | 4 | 5;
    username: string;
    avatar?: string;
}

export interface Category {
    title: string;
    quantity: number;
}

interface Girl {
    name: string;
    country: string;
    picture: string;
    isVerified: boolean;
}