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
      "sign_in": "Sign In",
      "sign_up": "Sign Up",
      "join_our_team": "Join our team",
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
      "sign_in": "Iniciar sesión",
      "sign_up": "Registrar",
      "join_our_team": "Únete a nuestro equipo",
      "main_paragraph": "Este es el contenido principal en español.",
    },
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "home": "Accueil",
      "girls": "Filles",
      "comments": "Commentaires",
      "members": "Membres",
      "login": "Connexion",
      "sign_in": "Se connecter",
      "sign_up": "S'inscrire",
      "join_our_team": "Rejoignez notre équipe",
      "main_paragraph": "Ceci est le contenu principal en français.",
    },
  },
  de: {
    translation: {
      "welcome": "Willkommen",
      "home": "Startseite",
      "girls": "Mädchen",
      "comments": "Kommentare",
      "members": "Mitglieder",
      "login": "Anmelden",
      "sign_in": "Einloggen",
      "sign_up": "Registrieren",
      "join_our_team": "Schließen Sie sich unserem Team an",
      "main_paragraph": "Dies ist der Hauptinhalt auf Deutsch.",
    },
  },
  it: {
    translation: {
      "welcome": "Benvenuto",
      "home": "Home",
      "girls": "Ragazze",
      "comments": "Commenti",
      "members": "Membri",
      "login": "Accesso",
      "sign_in": "Accedi",
      "sign_up": "Registrati",
      "join_our_team": "Unisciti al nostro team",
      "main_paragraph": "Questo è il contenuto principale in italiano.",
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
