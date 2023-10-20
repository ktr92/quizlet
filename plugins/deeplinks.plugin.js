import { App } from "@capacitor/app"
import Vue from "vue"
import VueRouter from "vue-router"

const router = new VueRouter({ routes: [{ path: "/confirm" }] })

App.addListener("appUrlOpen", (data) => {
  router
    .push({ path: "/confirm" })
    .then(() => console.log("Navigated!"))
    .catch((error) => {
      console.log("Error", error)
    })
})
