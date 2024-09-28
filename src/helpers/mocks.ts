import { Service, Comment } from "../lib/types/types"

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
                text: 'I love this site, I have been using it for a long time and I am very happy with the service.',
                rate: 5,
                username: 'John Doe',
                avatar: '/src/assets/mockAssets/Avatar1.png'
            },
            {
                text: 'I have been using this site for a long time and I am very happy with the service.',
                rate: 4,
                username: 'Jane Doe',
                avatar: '/src/assets/mockAssets/Avatar2.png'
            },
            {
                text: 'I love this site, I have been using it for a long time and I am very happy with the service.',
                rate: 5,
                username: 'John Doe',
                avatar: '/src/assets/mockAssets/Avatar1.png'
            },
        ])
    })
}

