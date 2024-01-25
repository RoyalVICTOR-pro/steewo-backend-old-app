export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  globalInjection: true,
  messages: {
    fr: {
      bo: {
        title: "Espace d'adminstration",
        navigation: {
          dashboard: 'Tableau de bord',
          professions: 'Métiers',
          students: 'Étudiants',
          missions: 'Missions',
        },
        pageTitles: {
          professionsMain: 'Métiers',
          professionsAdd: 'Ajouter un métier',
          professionsEdit: 'Modifier le métier',
          servicesMain: 'Services du métier {{professionName}}',
          servicesAdd: 'Ajouter un service au métier {{professionName}}',
          servicesEdit:
            'Modifier le service {{serviceName}} du métier {{professionName}}',
          formFieldsMain: 'Champs du service {{serviceName}}',
          formFieldsAdd: 'Ajouter un champ au service {{serviceName}}',
          formFieldsEdit:
            'Modifier le champ {{fieldName}} du service {{serviceName}}',
        },
        buttons: {
          addProfession: 'Ajouter un métier',
          addService: 'Ajouter un service',
          manageServices: 'Gérer les services',
          manageFormFields: 'Gérer les champs',
          add: 'Ajouter',
          edit: 'Modifier',
          delete: 'Supprimer',
          cancel: 'Annuler',
          save: 'Enregistrer',
          back: 'Retour',
        },
        tableHeaders: {
          professions: {
            name: 'Métier',
            isActive: 'Actif',
          },
        },
        forms: {
          fields: {
            email: 'Email',
            password: 'Mot de passe',
            passwordConfirmation: 'Confirmation du mot de passe',
            rememberMe: 'Se souvenir de moi',
            connectButton: 'Se connecter',
            professions: {
              name: 'Nom du métier',
              is_enabled: 'Actif',
            },
          },
          errors: {
            required: 'Ce champ est requis.',
            invalidEmail: "L'email est invalide.",
            passwordLength:
              'Le mot de passe doit contenir au moins 8 caractères',
          },
        },
        errors: {
          internalServerError:
            'Une erreur est survenue. Veuillez actualiser la page ou essayer ultérieurement.',
        },
        toasts: {
          professionAdded: 'Le métier a bien été ajouté.',
          professionUpdated: 'Le métier a bien été mis à jour.',
          professionDeleted: 'Le métier a bien été supprimé.',
          serviceAdded: 'Le service a bien été ajouté.',
          serviceUpdated: 'Le service a bien été mis à jour.',
          serviceDeleted: 'Le service a bien été supprimé.',
          formFieldAdded: 'Le champ a bien été ajouté.',
          formFieldUpdated: 'Le champ a bien été mis à jour.',
          formFieldDeleted: 'Le champ a bien été supprimé.',
        },
      },
    },
  },
}))
