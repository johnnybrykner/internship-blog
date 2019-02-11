<template>
  <paper-card>
    <paper-button raised :disabled='this.seen' @click="mark">
      <iron-icon icon='visibility'></iron-icon>
      <p v-if='!this.seen'>Mark as seen</p>
      <p v-if='this.seen'>Seen</p>
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
      seen: false,
    }
  },
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    postTexts() {
      return this.post.content.rendered.split(/[<>]/).filter(phrase => phrase.charAt(0).match(/[A-Z]/))
    }
  },
  methods: {
    mark() {
      this.seen = true;
      firebase.database().ref('reads').push().set(this.seen);
    }
  }
}
</script>

<style scoped>
  paper-card {
    width: 100%;
    margin-bottom: 2rem;
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
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>
