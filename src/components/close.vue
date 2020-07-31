<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="width:1em;height:1em;vertical-align:middle" overflow="hidden" viewBox="0 0 48 48">
    <path :fill="color" d="M22.379 24.5L8.944 11.065a1.5 1.5 0 0 1 2.121-2.121L24.5 22.379 37.935 8.944a1.5 1.5 0 0 1 2.121 2.121L26.621 24.5l13.435 13.435a1.5 1.5 0 0 1-2.121 2.121L24.5 26.621 11.065 40.056a1.5 1.5 0 0 1-2.121-2.121L22.379 24.5z"/>
  </svg>
</template>
<script>
export default {
  name:'dialog-ic-close',
  props: {
    color: {
      default: 'black'
    }
  }
}
</script>