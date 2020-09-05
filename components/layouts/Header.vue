<template>
  <b-navbar toggleable="lg"
            fixed="top"
            type="light"
            class="d-flex flex-row bg-white shadow-sm">
    <div class="navbar-brand-wrapper">
        <nuxt-link class="navbar-brand"
                   to="/">
          <img src="/gemastik13-logo.png"
               alt="logo">
        </nuxt-link>
    </div>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse"
                is-nav>
      <b-navbar-nav class="ml-auto">
        <li class="nav-item">
          <nuxt-link class="nav-link"
                     to="/dashboard">
            Dashboard
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link"
                     to="/live-detection">
            Live Detection
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link"
                     to="/about-us">
            Tentang Kami
          </nuxt-link>
        </li>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderNavigation'
}
</script>
