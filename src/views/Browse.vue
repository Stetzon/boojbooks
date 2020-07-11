<template>
  <div id="books">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            NYT Current Best Sellers
          </h1>
        </div>
      </div>
    </section>
    <section class="books">
      <div class="columns is-multiline is-marginless">
        <div
          class="column is-10-tablet is-offset-1-tablet is-5-desktop"
          v-for="(book, index) in books"
          :key="book.primary_isbn10"
          :class="[index % 2 === 0 ? 'is-offset-1-desktop' : 'is-offset-0-desktop']"
        >
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
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">This Week</p>
                      <p class="title is-5">{{ book.rank }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Last Week</p>
                      <p class="title is-5">{{ book.rank_last_week }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Weeks on List</p>
                      <p class="title is-5">{{ book.weeks_on_list }}</p>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right">
                <b-tooltip label="Add to Reading List" :animated="true" :delay="250">
                  <span class="icon">
                    <i class="far fa-bookmark" aria-hidden="true"></i>
                  </span>
                </b-tooltip>
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
.box {
  // background-color: #fdfdf8;
  box-shadow: 10px 10px 5px rgba(10, 10, 10, 0.1);
  opacity: 0.85;

  &:hover {
    box-shadow: 12px 12px 7px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    opacity: 1;
  }
  transition: box-shadow 0.2s, opacity 0.2s;
}
.box {
  .content strong {
    color: $title-color;
  }
  .icon {
    color: $link-color;
    &:hover {
      color: $link-color-active;
      cursor: pointer;
    }
  }
  figure {
    height: auto;
  }
}
</style>
