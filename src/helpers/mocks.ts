import { Service, Comment, Category, Girl } from "../lib/types/types"

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
                title: 'Cam Virtual', url: 'https://www.camvirtual.com'
            },
            {
                title: 'Chat Sex SMS', url: 'https://www.chatsexsms.com'
            },
            {
                title: 'Videos', url: 'https://www.privatevideos.com'
            },
            {
                title: 'Photos', url: 'https://www.privatephotos.com'
            },
            {
                title: 'Real Sex', url: 'https://www.realsex.com'
            }]
        )
    })
}

export const GET_COMMENTS_MOCK = async (): Promise<Array<Comment>> => {
    return new Promise((resolve) => {
        resolve([
            {
                text: 'Beautiful girls 😍🥰',
                rate: 5,
                username: 'John Doe',
                avatar: '/src/assets/mockAssets/Avatar1.png'
            },
            {
                text: 'Excellent all, beautiful girls.',
                rate: 4,
                username: 'Jane Doe',
                avatar: '/src/assets/mockAssets/Avatar2.png'
            },
            {
                text: 'Fabulous, they are all super attentive and beautiful.',
                rate: 5,
                username: 'John Doe',
                avatar: '/src/assets/mockAssets/Avatar1.png'
            },
        ])
    })
}

export const GET_CATEGORIES_MOCK = async (): Promise<Array<Category>> => {
    return new Promise((resolve) => {
        resolve([
            {
                quantity: 10,
                title:'transexual'
            },
            {
                title: 'gay',
                quantity:30
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
                title:'white skin',
                quantity: 400
            },
            {
                title:'cute face',
                quantity:300
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

export const GET_GIRLS_MOCK = async (): Promise<Array<Girl>> => {
    return new Promise(resolve => {
        resolve(
            new Array(8).fill(undefined).map(_ => {
                return {
                    country: 'Norway',
                    isVerified: true,
                    name: 'Luciana',
                    picture: ''
                }
        }))
    })
}