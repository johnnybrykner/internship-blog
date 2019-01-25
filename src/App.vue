<template>
  <section>
    <h1>Welcome to my internship blog!</h1>
    <p>I will try my best to post on time, but you know, human brain was invented to forget...</p>
    {{ timeDiff }}
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
  computed: {
    timeDiff () {
      return `Last updated ${this.lastModified[0]} days ago.`
    }
  },
  async created() {
    this.posts = await this.getJson();
    for (let i=0; i<this.posts.length; i++) {
      this.posts[i].date = this.posts[i].date.split(/[-T:]/).map(item => Number(item)).slice(0, 4).reverse()
    }
    for (let i=0; i<4; i++) {
      this.lastModified[i] = this.currentDate[i] - this.posts[1].date[i]
    }
    this.lastModified.filter((item, index) => item===0)
    console.log(this.lastModified)
  }
}
</script>

<style>
  @import url('https://meyerweb.com/eric/tools/css/reset/reset.css');
  @import url('https://fonts.googleapis.com/css?family=Noto+Serif+SC');
  * {
    font-family: 'Noto Serif SC', serif; 
  }
  section {
    margin: 0 2rem;
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
</style>
