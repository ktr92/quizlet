export default defineNuxtRouteMiddleware(async (to, from) => {
const client = useSupabaseClient()

 /*  const user = useSupabaseUser()

  if (!user.value && to.fullPath !== '/') {
    return navigateTo('/login')
  }  */

  const { searchParams } = new URL(from.path)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
  /*   const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore }) */
    const { error } = await client.auth.exchangeCodeForSession(code)
    if (!error) {
      return navigateTo(new URL(`/${next.slice(1)}`, to.path))
    }
  }

  // return the user to an error page with instructions
  return navigateTo(new URL('/confirm', to.fullPath))

})