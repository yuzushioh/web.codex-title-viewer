<template>
  <nav>
    <div class="logo">
      <img src="../assets/logos/codex/gold.svg">
    </div>
    <b-link to="/collection">
      <img src="../assets/icons/collection.svg">Collection
    </b-link>
    <b-link to="/transfers">
      <img src="../assets/icons/transfers.svg">Transfers
    </b-link>
    <b-link to="/settings">
      <img src="../assets/icons/settings.svg">Settings
    </b-link>
    <b-link to="/coming-soon">
      <img src="../assets/icons/star.svg">Coming Soon
    </b-link>
    <span class="spacer"></span>
    <b-link @click.prevent="logout">
      <img src="../assets/icons/logout.svg">Logout
    </b-link>
  </nav>
</template>

<script>
export default {
  name: 'app-side-bar',
  methods: {
    logout() {
      this.$store.dispatch('logout', this.$router)
    },
  },
}
</script>

<style lang="stylus" scoped>

@import "../assets/variables.styl"

nav
  width: 12rem
  height: 100%
  min-width: @width
  max-width: @width
  overflow-y: scroll
  background-color: rgba(white, .05)

  display: flex
  flex-direction: column

.spacer
  flex-grow: 1

a
  padding: 1rem
  display: block
  line-height: 1rem
  color: $color-light
  box-sizing: border-box

  img
    margin-right: .5rem

  &:hover
    text-decoration: none
    background-color: rgba(white, .1)

  &.active
    font-weight: bold
    background-color: rgba(white, .25)

.logo
  height: 4rem
  padding: 1em 0
  text-align: center
  box-sizing: content-box

  img
    height: 100%

</style>
