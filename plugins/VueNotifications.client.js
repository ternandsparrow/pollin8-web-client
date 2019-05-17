import Vue from 'vue'
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.css'

const defaults = {
  timeout: 10000,
  position: 'topCenter',
}

Vue.use(VueIziToast, defaults)
