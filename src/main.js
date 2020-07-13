import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/styles.scss';
import { Tooltip, Loading, Button, Input, Field, Toast, ConfigProgrammatic } from 'buefy';

ConfigProgrammatic.setOptions({
  defaultIconPack: 'fas'
});
Vue.use(Tooltip);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Input);
Vue.use(Field);
Vue.use(Toast);
Vue.use(ConfigProgrammatic);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
