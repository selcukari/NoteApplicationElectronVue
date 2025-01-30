import { createApp } from 'vue'
import App from './App.vue'

// Plugins
import { registerPlugins } from './plugins'

import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)

registerPlugins(app)

app
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
