<template>
  <section>
    <h1>Welcome to my internship blog!</h1>
    <p>I will try my best to post on time, but you know, human brain was invented to forget...</p>
    <item-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    ></item-post>
  </section>
</template>

<script>
import ItemPost from './components/ItemPost'
export default {
  name: 'app',
  components: {
    ItemPost
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    getJson() {
      return fetch('http://viitek.dk/wp/wp-json/wp/v2/posts')
        .then(response =>
          response.json()
        )
    }
  },
  async created() {
    this.posts = await this.getJson();
    console.log(this.posts)
  }
}
</script>

<style>

</style>
