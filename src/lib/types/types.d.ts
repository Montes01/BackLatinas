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