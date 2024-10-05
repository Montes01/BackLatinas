import { Service, Comment, Women, WomenStatus, UserStatus, Category, User } from "../lib/types/types"

const exampleGirl: Women = {
    name: 'Luciana',
    age: 23,
    categoryFilters: [],
    colorEyes: 'brown',
    colorHair: 'brown',
    colorSkin: 'white',
    cupSize: 'D',
    description: 'I am a very beautiful girl, I like to have fun and meet new people.',
    height: 1.70,
    hips: 90,
    idWomen: 1,
    mediaList: [],
    piercings: 0,
    services: [],
    shaving: 'shaved',
    shoeSize: 38,
    smoker: 'no',
    status: WomenStatus.ACCEPTED,
    tattoos: 0,
    user: {
        email: '',
        comments: [],
        gender: '',
        id_user: 1,
        nacionality: '',
        password: '',
        phoneNumber: '',
        profile_photo: '',
        role: {
            id_role: 1,
            name: 'user',
            users: []
        },
        status: UserStatus.ACTIVE,
        user_name: '',
        women: []
    },
    weight: 60
}

const exampleUser: User = {
    comments: [],
    email: 'example',
    gender: 'femenine',
    id_user: 1,
    nacionality: 'spanish',
    password: '1234',
    phoneNumber: '123456789',
    profile_photo: 'example',
    role: {
        id_role: 1,
        name: 'user',
        users: []
    },
    status: UserStatus.ACTIVE,
    user_name: 'jhon doe',
    women: []
}


//GET

export const GET_HOME_IMAGES_MOCK = async (): Promise<Array<string>> => {
    return new Promise((resolve) => {
        resolve([
            '/public/assets/mockAssets/Girl1.png',
            '/public/assets/mockAssets/Girl2.png',
            '/public/assets/mockAssets/Girl3.png',
        ])
    })
}

export const GET_SERVICES_MOCKS = async (): Promise<Array<Service>> => {
    return new Promise((resolve) => {
        resolve([
            {
                description: '',
                idService: 1,
                title: 'Cam Virtual',
                subServices: [],
                women: []
            },
            {
                description: '',
                idService: 2,
                title: 'Chat Sex SMS',
                subServices: [],
                women: []
            },
            {
                description: '',
                idService: 3,
                title: 'Videos',
                subServices: [],
                women: []
            },
            {
                description: '',
                idService: 4,
                title: 'Photos',
                subServices: [],
                women: []
            },
            {
                description: '',
                idService: 5,
                title: 'Real Sex',
                subServices: [],
                women: []
            }]
        )
    })
}

export const GET_COMMENTS_MOCK = async (): Promise<Array<Comment>> => {
    return new Promise((resolve) => {
        resolve([
            {
                comment: 'Beautiful girls 😍🥰',
                stars: 5,
                user: exampleUser,
                createdAt: new Date().getDate().toString(),
                idComment: 1
            },
            {
                comment: 'Excellent all, beautiful girls.',
                stars: 4,
                user: exampleUser,
                createdAt: new Date().getDate().toString(),
                idComment: 2
            },
            {
                comment: 'Fabulous, they are all super attentive and beautiful.',
                stars: 5,
                user: exampleUser,
                createdAt: new Date().getDate().toString(),
                idComment: 3
            },
        ])
    })
}

export const GET_CATEGORIES_MOCK = async (): Promise<Array<Category>> => {
    return new Promise((resolve) => {
        resolve([
            {
                quantity: 10,
                title: 'transexual'
            },
            {
                title: 'gay',
                quantity: 30
            },
            {
                title: 'eat-ass',
                quantity: 100
            },
            {
                title: 'busty',
                quantity: 500
            },
            {
                title: 'brown skin',
                quantity: 100
            },
            {
                title: 'white skin',
                quantity: 400
            },
            {
                title: 'cute face',
                quantity: 300
            },
            {
                title: 'short height',
                quantity: 100
            },
            {
                title: 'latina',
                quantity: 1409
            }
        ])
    })
}

export const GET_GIRLS_MOCK = async (): Promise<Array<Women>> => {
    return new Promise(resolve => {
        resolve(
            new Array(8).fill(undefined).map((_) => {
                return exampleGirl
            }))
    })
}

export const GET_GIRL_INFO_MOCK = async (girlId: string): Promise<Women> => {
    return new Promise((resolve, reject) => {
        if (girlId === '1094892672')
            resolve(exampleGirl)
        else
            reject('Girl not found')
    })
}
