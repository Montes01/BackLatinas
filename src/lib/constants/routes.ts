export const ROUTES = {
  ALL: '/*',
  HOME: {
    ROOT: '/',
    HOME: '/home',
    GIRLS: '/home/girls',
    ADMIN: {
      ROOT: '/admin',
      HOME: '/HomeAdmin',
      GIRLS: '/admin/GirlsAdmin',
    },
  },
  GIRL: {
    ROOT: '/girl',
    SINGLE_GIRL: '/girl/:id',
  },
  LOGIN: '/login',
  CREATE: {
    CLIENT: '/createClient',
    GIRLS: '/createGirls',
  },
  COMMENTS: {
    CLIENT: '/commentsClient',
  },
  PROFILE: {
    CLIENT: '/clientProfile',
  },
};
