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
            <strong>{{ details.title }}</strong> <small>{{ details.author }}</small>
            <br />
            {{ details.description }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">This Week</p>
              <p class="title is-5">{{ details.rank }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Last Week</p>
              <p class="title is-5">{{ details.rank_last_week }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Weeks on List</p>
              <p class="title is-5">{{ details.weeks_on_list }}</p>
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
</template>

<script>
export default {
  name: 'Book',
  props: {
    details: {
      required: true,
      type: Object
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
