export default defineNuxtRouteMiddleware((to, from)=>{
  const isLoggedIn : boolean = false
	console.log("Entrée dans le middleware")
	// Ici du code qui vérifie dans le store si on est connecté 
	// et qui serait stocké dans un isLoggedIn par exemple. 
	if(isLoggedIn){
		// to est la destination, on a le chemin demandé dans la propriété fullPath
		return navigateTo(to.fullPath)
	}
	return navigateTo("/login")
})