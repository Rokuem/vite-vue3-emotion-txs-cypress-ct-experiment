import { createApp } from 'vue'
import App from './App'
import { storeApi } from './store';
import { router } from './router';


const app = createApp(App);
app.use(router);
app.use(storeApi.store);
app.mount('#app');
