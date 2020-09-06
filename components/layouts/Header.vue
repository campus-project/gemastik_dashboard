<template>
  <b-navbar toggleable="lg"
            fixed="top"
            type="light"
            class="d-flex flex-row bg-white shadow-sm">
    <div class="navbar-brand-wrapper">
        <nuxt-link class="navbar-brand"
                   to="/">
          C-More
        </nuxt-link>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderNavigation'
}
</script>
