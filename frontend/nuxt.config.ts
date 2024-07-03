// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false, // You can change it to true (not recommended) to make the app start up slightly faster at the cost of larger binary size
  router: {
    options: {
      hashMode: true,
    },
  },
  imports: {
    dirs: [
      "wailsjs/runtime/**", // Auto-import wails runtime
    ],
  },
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  colorMode: {
    preference: "dark",
  },
});
