import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './styles/style.css';
import './styles/normalize.css';

import Vue from 'vue';
import app from './app.vue';

new Vue({
    render: h => h(app)
}).$mount("#app");


