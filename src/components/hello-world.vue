<template>
  <div>
    <div>hello {{msg}}</div>
    <button @click="onClick">click</button>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick(){
      this.$emit('hello', this.msg)
    }
  }
}
</script>