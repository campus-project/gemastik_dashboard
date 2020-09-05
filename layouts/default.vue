<template>
  <div id="app">
    <header-navigation />

    <div class="container-fluid page-content-wrapper">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layouts/Header'
export default {
  components: {
    'header-navigation': Header
  }
}
</script>
