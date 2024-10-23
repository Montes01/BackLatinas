export const ROUTES = {
  ALL: '/*',
  HOME: {
    ROOT: '/',
    HOME: '/home',
    GIRLS: '/home/girls',
    ADMIN: {
      ROOT: '/home/admin',
      HOME: '/home/HomeAdmin',
      GIRLS: '/home/admin/GirlsAdmin',
      NEW_GIRL: '/home/admin/GirlsAdmin/new',
      EDIT_GIRL: '/home/admin/GirlsAdmin/edit/:username',
    },
  },
  GIRL: {
    ROOT: '/girl',
    SINGLE_GIRL: '/girl/:username',
  },
  LOGIN: '/login',
  CREATE: {
    CLIENT: '/createClient',
    GIRLS: '/createGirls',
  },
  COMMENTS: '/comments',
  PROFILE: {
    CLIENT: '/clientProfile',
  },
};
