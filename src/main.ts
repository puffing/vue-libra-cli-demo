/* eslint-disable */
import './public-path'
import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

let router = null;
let instance: import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>> | null = null;


function render() {
  router = new VueRouter({
    base: (window as any).__POWERED_BY_QIANKUN__ ? '/app1' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  console.log('not qiankun render...................')
	render();
}


//导出生命周期钩子
export async function bootstrap() {
  console.log('child-app1 bootstrap.............................')
	console.log('[vue] vue app bootstraped');
}

export async function mount(props: any | null |undefined) {
	console.log('[vue] props from main framework', props);
	render();
}

export async function unmount() {
  if (instance) {
    instance.$destroy();
    instance = null;
    router = null;
  }
}
