import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Definir traducciones para cada idioma
const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "home": "Home",
      "girls": "Girls",
      "comments": "Comments",
      "members": "Members",
      "login": "Login",
      "main_paragraph": "This is the main content in English.",
    },
  },
  es: {
    translation: {
      "welcome": "Bienvenido",
      "home": "Inicio",
      "girls": "Chicas",
      "comments": "Comentarios",
      "members": "Miembros",
      "login": "Iniciar sesión",
      "main_paragraph": "Este es el contenido principal en español.",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
