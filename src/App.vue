<template>
  <section>
    <div
      v-if="loading===true"
      class="loading"
    >
      <img src="./assets/loading.gif" alt="Loading...">
    </div>
    <h1>Welcome to my internship blog!</h1>
    <p>I will try my best to post on time, but you know, human brain was invented to forget... Last modified <em>{{ lastModified }} ago.</em></p>
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
      loading: true,
      posts: [],
      currentDate: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), new Date().getHours()].reverse(),
      lastModified: []
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
    for (let i=0; i<this.posts.length; i++) {
      this.posts[i].date = this.posts[i].date.split(/[-T:]/).map(item => Number(item)).slice(0, 4).reverse()
    }
    for (let i=0; i<4; i++) {
      this.lastModified[i] = this.currentDate[i] - this.posts[0].date[i]
    }
    switch (this.lastModified.findIndex(item => item===0)) {
      case 1:
        this.lastModified = this.lastModified[0] + (this.lastModified[0]===1 ? ' hour' : ' hours');
        break;
      case 2:
        this.lastModified = this.lastModified[1] + (this.lastModified[1]===1 ? ' day' : ' days');
        break;
      case 3:
        this.lastModified = this.lastModified[2] + (this.lastModified[2]===1 ? ' month' : ' months');
        break;
      default:
        this.lastModified = this.lastModified[3] + (this.lastModified[3]===1 ? ' year' : ' years');
    }
    this.loading = false;
  }
}
</script>

<style>
  @import url('https://meyerweb.com/eric/tools/css/reset/reset.css');
  @import url('https://fonts.googleapis.com/css?family=Sintony');
  section {
    margin: 0 2rem;
    font-family: 'Sintony', sans-serif;
    line-height: 2rem;
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
  }
  em {
    font-weight: bold;
  }
</style>
