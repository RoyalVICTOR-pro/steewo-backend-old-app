import { z } from 'zod'

export const useFormValidator = (formSchema) => {
  const schema = z.object(formSchema)

  const isValid = (data) => {
    try {
      schema.parse(data)
      return true
    } catch (error) {
      return false
    }
  }

  // On retourne ici le schema pour qu'il puisse être utilisé dans le composant
  // pour afficher les messages d'erreur du formulaire
  // C'est pour cela qu'il y a un binding sur le UForm => :schema="schema"
  return {
    schema,
    isValid,
  }
}
