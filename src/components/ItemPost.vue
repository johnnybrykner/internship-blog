<template>
  <article>
    <h2>{{ post.title.rendered }}</h2>
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
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    postTexts () {
      return this.post.content.rendered.split(/[<>]/).filter(phrase => phrase.charAt(0).match(/[A-Z]/))
    }
  },
  created() {
    console.log(this.postTexts)
  }
}
</script>

<style scoped>
  article {
    background-color: #eee;
  }
</style>
