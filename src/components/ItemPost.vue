<template>
  <article>
    <h2>{{ post.title.rendered }}</h2>
    <small>Posted on {{ postDate }}</small>
    <p
      v-for="text in postTexts"
      :key="text.id"
    >
      {{ text }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'ItemPost',
  data() {
    return {
      postDate: this.post.date.slice(1).join('.')
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
  }
}
</script>

<style scoped>
  article {
    background-color: #eee;
    margin-bottom: 2rem;
  }
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 1rem 0 0 .5rem;
  }
  small {
    font-size: .7rem;
    padding-left: .5rem;
  }
</style>
