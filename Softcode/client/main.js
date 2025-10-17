import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { createApp } from 'vue'
import App from '/imports/ui/App.vue'
import { Quasar, Ripple, Notify } from 'quasar' // ✅ Import Ripple directive
import { router } from '/imports/ui/router'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify, // ✅ Register Notify plugin here
  },

  config: {
    dark: false,
  },
  directives: {
    Ripple // ✅ Register Ripple directive
  }
})

app.use(router)
app.mount('#app')