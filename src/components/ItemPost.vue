<template>
  <paper-card :class="{ new: !postSeen }">
    <paper-button raised :disabled='this.postSeen' @click="mark">
      <paper-spinner active v-if="loading"></paper-spinner>
      <figure v-else>
        <iron-icon icon='visibility'></iron-icon>
        <p v-if='!this.postSeen'>Mark as seen</p>
        <p v-if='this.postSeen'>Seen</p>
      </figure>
    </paper-button>
    <article class="card-content">
      <paper-tooltip position='left'>Posted on {{ postDate }}</paper-tooltip>
      <h2>{{ post.title.rendered }}</h2>
      <p
        v-for="text in postTexts"
        :key="text.id"
      >
        {{ text }}
      </p>
    </article>
  </paper-card>
</template>

<script>
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import firebase from "firebase";
export default {
  name: 'ItemPost',
  data() {
    return {
      postDate: this.post.date.slice(1).join('.'),
      postSeen: '',
      loading: true,
    }
  },
  props: {
    post: {
      required: true,
      type: Object
    },
    user: {
      required: true,
      type: String,
    }
  },
  computed: {
    postTexts() {
      return this.post.content.rendered.split(/[<>]/).filter(phrase => phrase.charAt(0).match(/[A-Z]/))
    },
  },
  async created() {
    await firebase.database().ref('users').child(this.user).child('seens').child(this.post.id).once('value')
      .then(snapshot => this.postSeen = snapshot.val())
    this.loading = false;
  },
  methods: {
    mark() {
      this.postSeen = true;
      firebase.database().ref('users').child(this.user).child('seens').child(this.post.id).set(true);
    }
  }
}
</script>

<style scoped>
  paper-card {
    width: 100%;
    margin-bottom: 2rem;
  }
  paper-card.new {
    border: .5px yellowgreen solid;
  }
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0 0 0 .5rem;
  }
  paper-button {
    padding: 0;
    margin: 0;
    text-transform: lowercase;
    margin-left: 100%;
    transform: translateX(-100%);
    width: 150px;
  }
  figure {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
</style>
