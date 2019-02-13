import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase"

// Initialize Firebase
let config = {
  apiKey: "AIzaSyDZZFS9vnn_eo-xKcnnd9kED3e3j1rMkKU",
  authDomain: "my-flawless-project.firebaseapp.com",
  databaseURL: "https://my-flawless-project.firebaseio.com",
  projectId: "my-flawless-project",
  storageBucket: "my-flawless-project.appspot.com",
  messagingSenderId: "806660736132"
};
firebase.initializeApp(config);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
    new Vue({
      render: h => h(App),
    }).$mount('#app')
});
