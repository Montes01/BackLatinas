export const ROUTES = {
  ALL: '/*',
  HOME: {
    ROOT: '/',
    HOME: '/home',
    GIRLS: '/home/girls',
  },
  GIRL: {
    ROOT: '/girl',
    SINGLE_GIRL: '/girl/:id',
  },
  LOGIN: {
    ADMIN: '/loginAdmin',
    CLIENT: '/loginClient',
    GIRLS: '/loginGirls',
  },
  CREATE: {
    CLIENT: '/createClient',
    GIRLS: '/createGirls', 
  },
  COMMENTS: {
    CLIENT: '/commentsClient',
  },
};
