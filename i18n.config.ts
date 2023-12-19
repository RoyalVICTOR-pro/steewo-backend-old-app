export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  fallbackLocale: "fr",
  globalInjection: true,
  messages: {
    fr: {
      bo: {
        title: 'Espace d\'adminstration',
        forms: {
          fields: {
            email: 'Email',
            password: 'Mot de passe',
            passwordConfirmation: 'Confirmation du mot de passe',
            rememberMe: 'Se souvenir de moi',
            connectButton: 'Se connecter',
          },
          errors: {
            required: 'Ce champ est requis',
          },
          }
        }
      },
    }
  }
))
