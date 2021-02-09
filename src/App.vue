<template lang="pug">
  #app
    #nav
      router-link(to="/") Home |
      router-link(to="/about") About
  
    router-view
</template>

<style lang="sass">
#app
  width: 1024px
  margin: 0 auto
</style>