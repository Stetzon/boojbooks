<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="details.book_image" alt="Book Image" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <router-link :to="{ name: 'Details', params: { isbn: details.primary_isbn10 } }">
              <strong>{{ details.title }}</strong>
            </router-link>
            <small>{{ details.author }}</small>
            <br />
            <span v-show="detailPage">{{ details.description }}</span>
          </p>
        </div>
        <nav class="level is-mobile">
          <div v-show="detailPage" class="level-item has-text-centered">
            <div>
              <p class="heading">Buy now</p>
              <p class="title is-5">
                <a :href="details.amazon_product_url" target="_blank"
                  ><i class="fab fa-amazon"></i
                ></a>
              </p>
            </div>
          </div>
          <div v-show="showRankings" class="level-item has-text-centered">
            <div>
              <p class="heading">This Week</p>
              <p class="title is-5">{{ details.rank }}</p>
            </div>
          </div>
          <div v-show="showRankings" class="level-item has-text-centered">
            <div>
              <p class="heading">Last Week</p>
              <p class="title is-5">{{ details.rank_last_week }}</p>
            </div>
          </div>
          <div v-show="showRankings" class="level-item has-text-centered">
            <div>
              <p class="heading">Weeks on List</p>
              <p class="title is-5">{{ details.weeks_on_list }}</p>
            </div>
          </div>
          <div class="level-left" v-show="readingListPage">
            <a class="level-item" aria-label="reply">
              <span class="icon is-large" @click="moveUp">
                <i class="fas fa-arrow-up" aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item" aria-label="retweet">
              <span class="icon is-large" @click="moveDown">
                <i class="fas fa-arrow-down" aria-hidden="true"></i>
              </span>
            </a>
          </div>
          <div class="level-right" v-show="readingListPage">
            <div class="level-item has-text-centered">
              <div>
                <router-link
                  tag="a"
                  class="heading"
                  :to="{ name: 'Details', params: { isbn: details.primary_isbn10 } }"
                >
                  View Details <i class="fa fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <b-tooltip :label="tooltipLabel" :animated="true" :delay="250">
          <span class="icon" @click="toggleReadingList">
            <i v-if="onReadingList" class="fas fa-bookmark" aria-hidden="true"></i>
            <i v-else class="far fa-bookmark" aria-hidden="true"></i>
          </span>
        </b-tooltip>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Book',
  props: {
    details: {
      required: true,
      type: Object
    },
    detailPage: {
      required: false,
      default: false
    },
    readingListPage: {
      required: false,
      default: false
    }
  },
  computed: {
    onReadingList() {
      return this.bookOnReadingList(this.details);
    },
    tooltipLabel() {
      return this.onReadingList ? 'Remove from Reading List' : 'Add to Reading List';
    },
    showRankings() {
      return !this.detailPage && !this.readingListPage;
    },
    ...mapGetters(['bookOnReadingList'])
  },
  methods: {
    toggleReadingList() {
      if (this.onReadingList) {
        this.$store.dispatch('removeFromReadingList', this.details);
        this.$buefy.toast.open({
          message: 'Removed from Reading List.',
          type: 'is-warning',
          duration: 1000
        });
      } else {
        this.$store.dispatch('addToReadingList', this.details);
        this.$buefy.toast.open({
          message: 'Added to Reading List!',
          type: 'is-primary',
          duration: 1000
        });
      }
    },
    moveUp() {
      this.$emit('move-book', {
        direction: 'up',
        book: this.details
      });
      // this.$store.dispatch('moveBookUp', this.details);
    },
    moveDown() {
      this.$emit('move-book', {
        direction: 'down',
        book: this.details
      });
      // this.$store.dispatch('moveBookDown', this.details);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  box-shadow: 10px 10px 5px rgba(10, 10, 10, 0.1);
  opacity: 0.85;

  &:hover {
    box-shadow: 12px 12px 7px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    opacity: 1;
  }
  transition: box-shadow 0.2s, opacity 0.2s;
}
.box {
  .content a {
    color: $title-color;
    margin-right: 0.5rem;
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
