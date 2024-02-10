export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  globalInjection: true,
  messages: {
    fr: {
      bo: {
        title: "Espace d'administration",
        navigation: {
          dashboard: 'Tableau de bord',
          professions: 'Métiers',
          students: 'Étudiants',
          missions: 'Missions',
        },
        pageTitles: {
          professionsMain: 'Métiers',
          professionsAdd: 'Ajouter un métier',
          professionsEdit: 'Modifier le métier "{professionName}"',
          servicesMain: 'Services du métier "{professionName}"',
          servicesAdd: 'Ajouter un service au métier "{professionName}"',
          servicesEdit:
            'Modifier le service "{serviceName}" du métier "{professionName}"',
          formFieldsMain: 'Champs du service "{serviceName}"',
          formFieldsAdd: 'Ajouter un champ au service "{serviceName}"',
          formFieldsEdit:
            'Modifier le champ "{fieldName}" du service "{serviceName}"',
          formFieldsReorder: 'Réordonner les champs de ce service',
        },
        buttons: {
          addProfession: 'Ajouter un métier',
          editProfession: 'Modifier ce métier',
          addService: 'Ajouter un service',
          editService: 'Modifier ce service',
          addFormField: 'Ajouter un champ',
          editFormField: 'Modifier ce champ',
          manageServices: 'Gérer les services',
          manageFormFields: 'Gérer les champs',
          seeFile: 'Voir le fichier',
          add: 'Ajouter',
          edit: 'Modifier',
          delete: 'Supprimer',
          cancel: 'Annuler',
          save: 'Enregistrer',
          back: 'Retour',
          confirm: 'Confirmer',
          reorder: 'Réordonner',
        },
        tableHeaders: {
          professions: {
            name: 'Métier',
            isActive: 'Actif',
          },
          services: {
            name: 'Service',
            isActive: 'Actif',
          },
          formFields: {
            label: 'Libellé',
            type: 'Type',
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
              picto_file: 'Picto du métier',
              image_file: 'Image du métier',
              is_enabled: 'Actif',
            },
            services: {
              name: 'Nom complet du service',
              picto_file: 'Picto du métier',
              image_file: 'Image du métier',
              short_name: 'Nom court du service',
              is_enabled: 'Actif',
            },
            formFields: {
              type: 'Type',
              label: 'Libellé',
              mandatory: 'Obligatoire',
              tooltip_image_file: "Image d'aide",
              tooltip_text: "Texte d'aide",
              description: 'Description',
              placeholder: 'Placeholder',
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
          professionPictoDeleted: 'Le picto du métier a bien été supprimé.',
          professionImageDeleted: "L'image du métier a bien été supprimée.",
          professionDeleted: 'Le métier a bien été supprimé.',
          serviceAdded: 'Le service a bien été ajouté.',
          serviceUpdated: 'Le service a bien été mis à jour.',
          serviceDeleted: 'Le service a bien été supprimé.',
          formFieldAdded: 'Le champ a bien été ajouté.',
          formFieldUpdated: 'Le champ a bien été mis à jour.',
          formFieldDeleted: 'Le champ a bien été supprimé.',
          formFieldsReordered: 'Les champs ont bien été réordonnés.',
          loggedOut: 'Vous avez été déconnecté avec succès.',
        },
      },
    },
  },
}))
