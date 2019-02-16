<template>
  <paper-card>
    <section>
      <h3>Create an account</h3>
      <paper-input-container>
        <label slot="label">Email</label>
        <iron-input slot="input">
          <input type="email" v-model="email">
        </iron-input>
      </paper-input-container>
      <paper-input-container>
        <label slot="label">Password</label>
        <iron-input slot="input">
          <input type="password" v-model="password">
        </iron-input>
      </paper-input-container>
      <paper-button raised @click="signUp">Submit</paper-button>
      <p @click='activated=false'>Or go back to Log In</p>
    </section>
  </paper-card>
</template>

<script>
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import firebase from "firebase";
export default {
  data() {
    return {
      activated: this.active,
      email: '',
      password: '',
    }
  },
  props: {
    active: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    activated: {
      handler: function() {
        if (!this.activated) {
          this.$emit('signClosed')
        }
      },
      immediate: true,
    }
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(function() {
          this.$emit('verified')
        }.bind(this))
        .catch(function(error) {
          alert(error.message)
        })
    }
  },
}
</script>

<style scoped>
  paper-card {
    width: 75%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  paper-card section {
    padding: 1rem 0;
  }
  paper-card section h3 {
    font-weight: bold;
    text-align: center;
  }
  paper-card section p {
    cursor: pointer;
    text-align: center;
    text-decoration: underline;
  }
  paper-button {
    background-color: var(--paper-indigo-500);
    color: white;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
  }
</style>
