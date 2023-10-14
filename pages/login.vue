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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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

const getGoogleOAuthUrl  = async (prov: any) => {

  const { data, error } = await client.auth.signInWithOAuth({
    provider: prov,
    options: {

        redirectTo: "wordcard.pro://confirm",
    },
  })
  return data.url
}

 const setOAuthSession = async (tokens: {
   access_token: string;
   refresh_token: string;
 }) => {
   const { data, error } = await client.auth.setSession({
     access_token: tokens.access_token,
     refresh_token: tokens.refresh_token,
   });

   if (error) throw error;

 };

const onSignInWithGoogle = async (prov: any) => {
   try {
 

     const url = await getGoogleOAuthUrl(prov);
 
    
 
     if (url?.length ) {
       const data = extractParamsFromUrl(url);

       if (!data.access_token || !data.refresh_token) return;

      setOAuthSession({
         access_token: data.access_token,
         refresh_token: data.refresh_token,
       });

      
     }
   } catch (error) {
     // Handle error here
     console.log(error);
   } finally {
   }
 };

const extractParamsFromUrl = (url: string) => {
   const params = new URLSearchParams(url.split("#")[1]);
   const data = {
     access_token: params.get("access_token"),
     expires_in: parseInt(params.get("expires_in") || "0"),
     refresh_token: params.get("refresh_token"),
     token_type: params.get("token_type"),
     provider_token: params.get("provider_token"),
   };

  return data;
 };

</script>

<style scoped></style>
