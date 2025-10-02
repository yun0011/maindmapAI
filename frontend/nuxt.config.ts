import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@pinia/nuxt"],
  ssr: false,

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  runtimeConfig: {
    public: {
      // 클라이언트에서 접근 가능한 API 베이스 URL
      baseUrl: process.env.API_BASE_URL,
    },
  },

  app: {
    baseURL: (process.env.APP_BASE_PATH || "") + "/",
    buildAssetsDir: "/_nuxt/",
  },

  nitro: {
    output: {
      publicDir: path.join(__dirname, process.env.FRONTEND_WEBROOT || "/dist"),
    },
  },

  compatibilityDate: "2025-02-17",
});
