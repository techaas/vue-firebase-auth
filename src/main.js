// Copyright(c) 2021 TECHaas.com. All rights reserved. 
//
import Vue from 'vue'
import App from './App.vue'

import firebase from 'firebase/app'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY || 'api-key-not-set',
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || 'env-not-set',
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || 'env-not-set',
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || 'env-not-set',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || 'env-not-set',
  appId: process.env.VUE_APP_FIREBASE_APP_ID || 'env-not-set',
  measurementId: process.env.VUE_APP_FIREBAEE_MEASUREMENT_ID || 'env-not-set'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
