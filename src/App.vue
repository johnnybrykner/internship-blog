<template>
  <section>
    <div
      v-if="loading===true"
      class="loading"
    >
      <paper-spinner active></paper-spinner>
    </div>
    <paper-button raised @click="logOut" class="button--logout active" v-if="loggedIn!==null">Log Out</paper-button>
    <h1>Welcome to my internship blog!</h1>
    <paper-button raised @click="accountActionToggle" class="button--account" v-if="accountAction===false">Log In to continue</paper-button>
    <section v-if="!loggedIn">
      <section v-if="accountAction">
        <log-in @logClosed='activateSignUp' @verified='verifyUser' :active='logInActive' v-if="logInActive"></log-in>
        <sign-up @signClosed='activateLogIn' @verified='verifyUser' :active='signUpActive' v-else></sign-up>
      </section>
    </section>
    <section v-if="loggedIn">
      <p>I will try my best to post on time, but you know, human brain was made to forget... Last modified <em>{{ lastModified }} ago.</em></p>
      <item-post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :user="loggedIn"
      ></item-post>
    </section>
  </section>
</template>

<script>
import ItemPost from './components/ItemPost';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-button/paper-button.js';
import firebase from "firebase";
export default {
  name: 'app',
  components: {
    ItemPost,
    LogIn,
    SignUp,
  },
  data() {
    return {
      loading: null,
      posts: [],
      currentDate: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), new Date().getHours()].reverse(),
      lastModified: [],
      logInActive: false,
      signUpActive: false,
      accountAction: false,
      loggedIn: null,
    }
  },
  methods: {
    async init() {
      this.loading = true;
      this.posts = await this.getJson();
      for (let i=0; i<this.posts.length; i++) {
        this.posts[i].date = this.posts[i].date.split(/[-T:]/).map(item => Number(item)).slice(0, 4).reverse()
      }
      for (let i=0; i<4; i++) {
        this.lastModified[i] = this.currentDate[i] - this.posts[0].date[i]
      }
      switch (this.lastModified.reverse().findIndex(item => item!==0)) {
        case 0:
          this.lastModified = this.lastModified[0] + (this.lastModified[0]===1 ? ' year' : ' years');
          break;
        case 1:
          this.lastModified = this.lastModified[1] + (this.lastModified[1]===1 ? ' month' : ' months');
          break;
        case 2:
          this.lastModified = this.lastModified[2] + (this.lastModified[2]===1 ? ' day' : ' days');
          break;
        case 3:
          this.lastModified = this.lastModified[3] + (this.lastModified[3]===1 ? ' hour' : ' hours');
          break;
        default:
          this.lastModified = this.lastModified[3] + ' hours';
      }
      this.loading = false;
    },
    getJson() {
      return fetch('http://viitek.dk/wp/wp-json/wp/v2/posts')
        .then(response =>
          response.json()
        )
    },
    activateLogIn() {
      this.logInActive = true;
      this.signUpActive = false;
    },
    activateSignUp() {
      this.logInActive = false;
      this.signUpActive = true;
    },
    accountActionToggle() {
      this.accountAction = !this.accountAction;
    },
    logOut() {
      firebase.auth().signOut()
        .then(() => this.loggedIn = null)
    },
    verifyUser() {
      this.loggedIn = firebase.auth().currentUser.uid;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(function(status) {
      if (status !== null) {
        this.init()
      }
    }.bind(this))
  }
}
</script>

<style>
  @import url('https://meyerweb.com/eric/tools/css/reset/reset.css');
  @import url('https://fonts.googleapis.com/css?family=Sintony');
  section {
    margin: 0 auto;
    font-family: 'Sintony', sans-serif;
    line-height: 2rem;
    max-width: 80%;
  }
  h1 {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    padding: 1rem;
  }
  p {
    padding: .5rem;
  }
  .loading {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    z-index: 2;
  }
  em {
    font-weight: bold;
  }
  .button--account {
    background-color: var(--paper-indigo-500);
    color: white;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .button--logout {
    float: right;
    background-color: var(--paper-indigo-500);
    color: white;
  }
</style>
