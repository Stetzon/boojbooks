<template>
  <div id="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Booj Books
          </h1>
          <h2 class="subtitle">
            Generate your reading list!
          </h2>
        </div>
      </div>
    </section>
    <section class="books">
      <div class="columns is-multiline is-marginless">
        <div class="column is-half" v-for="book in books" :key="book.rank">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img :src="book.book_image" alt="Book Image" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ book.title }}</strong> <small>{{ book.author }}</small>
                    <br />
                    {{ book.description }}
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="icon is-small">
                        <i class="fas fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="retweet">
                      <span class="icon is-small">
                        <i class="fas fa-retweet" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="like">
                      <span class="icon is-small">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import API from '../lib/api';

export default {
  name: 'Home',
  data() {
    return {
      books: []
    };
  },
  async mounted() {
    const { data } = await API.getBestSellersList();
    // console.log(data.results.books);
    this.books = data.results.books;
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: steelblue;
}
</style>
