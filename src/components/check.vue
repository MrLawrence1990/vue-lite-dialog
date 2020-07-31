<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="width:1em;height:1em;vertical-align:middle" overflow="hidden" viewBox="0 0 48 48">
    <path :fill="color" fill-rule="evenodd" d="M19.607 28.335L35.87 12.07l3.536 3.536L23.142 31.87l-3.535 3.536L9 24.799l3.536-3.536 7.07 7.072z"/>
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