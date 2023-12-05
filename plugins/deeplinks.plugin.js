import { App } from "@capacitor/app"
import VueRouter from "vue-router"

export default defineNuxtPlugin((nuxtApp) => {
/*   const router = new VueRouter({ routes: [{ path: "/confirm" }] }) */



  // Doing something with nuxtApp
  App.addListener("appUrlOpen", function (event) {
    const router = useRouter();

    // Example url: https://beerswift.app/tabs/tabs2
    // slug = /tabs/tabs2
    const slug = event.url.split(".app").pop()
    console.log(slug)
    // We only push to the route if there is a slug present
    if (slug) {
      router.push({
        path: slug,
      })
    }
  })
})

