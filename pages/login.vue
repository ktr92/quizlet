<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              {{ $t("login") }}
            </h1>

            <button
              @click="onSignInWithGoogle('google')"
              class="flex items-center justify-center gap-3 p-1.5 w-full bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-semibold transition ease-in-out duration-350 dark:bg-gray-900 dark:hover:bg-primary-900 focus:bg-gray-200 dark:focus"
            >
              <img src="/google-logo.svg" alt="" class="w-8" />
              <div class="text-primary-600">Google</div>
            </button>
          </div>

          <div class="my-2">
            <!--    <a href="wordcard://wordcard.app/confirm">LINK</a> -->
            <!--   <UIButton class="rounded">
                  <NuxtLink :to="localePath('/confirm')">{{
                    $t("createcourse")
                  }}</NuxtLink>
                </UIButton> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Capacitor } from "@capacitor/core"

const redirectTo = Capacitor.isNativePlatform()
  ? process.env.NEXT_PUBLIC_REDIRECT_TO_NATIVE ||
    "wordcard://wordcard.app/confirm"
  : process.env.NEXT_PUBLIC_REDIRECT_TO || "http://localhost:3000/confirm"
/* "https://snazzy-toffee-1129c6.netlify.app" */
definePageMeta({
  middleware: ["auth"],
})
definePageMeta({
  layout: "auth",
})
const localePath = useLocalePath()

const client = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    return navigateTo(localePath("/user"))
  }
})

const onSignInWithGoogle = async (prov: any) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: prov,
    options: {
      /* queryParams: {
        access_type: "offline",
        prompt: "consent",
      }, */
      redirectTo,
    },
  })
}
</script>

<style scoped></style>
