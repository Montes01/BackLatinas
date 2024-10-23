import { Ro } from "react-flags-select";
import { ROUTES } from "./routes";

export const PROYECT_NAME = 'LatinasSexCam';

export const GENDER_OPTIONS = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' },
];

export const tokenName = 'LatinasSexCamToken';

export interface MenuItem {
    text: string;
    path: string;
}


export const unloggedMenu: MenuItem[] = [
    {
        text: 'Home',
        path: ROUTES.HOME.HOME
    },
    {
        text: 'girls',
        path: ROUTES.HOME.GIRLS
    },
    {
        text: 'Comments',
        path: ROUTES.COMMENTS
    },
    {
        text: 'Join Our Team',
        path: ROUTES.CREATE.GIRLS
    }
]

export const loggedMenu: MenuItem[] = unloggedMenu.map(item => item.text !== 'Join Our Team' ? item : null).filter(item => item !== null);

export const adminMenu: MenuItem[] = [
    {
        text: 'Home',
        path: ROUTES.HOME.HOME
    },
    {
        text: 'Girls',
        path: ROUTES.HOME.ADMIN.GIRLS
    },
    {
        text: 'Comments',
        path: ROUTES.COMMENTS
    },
    {
        text: 'Clients',
        path: ROUTES.ALL
    }
]

export const girlMenu: MenuItem[] = [
    {
        text: 'Home',
        path: ROUTES.HOME.HOME
    },
    {
        text: 'Girls',
        path: ROUTES.HOME.GIRLS
    },
    {
        text: 'Packages',
        path: ROUTES.ALL
    }
]
