<template>
  <div id="app">
    <div class="test-itm">
      <button @click="alert">Dialog-Alert</button>
    </div>
    <div class="test-itm">
      <button @click="confirm">Dialog-confirm</button>
    </div>
    <div class="test-itm">
      <button @click="dialogVnode">Dialog-dialog-vnode</button>
    </div>
    <div class="test-itm">
      <button @click="dialogJsx">Dialog-dialog-jsx</button>
    </div>
    <div class="test-itm">
      <button @click="choose">Dialog-choose</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Dialog from './common/dialog';
import HelloWorld from './components/hello-world';

Dialog.setTheme({
  okBg: '',
});
Vue.use(Dialog);

export default {
  name: 'App',
  methods: {
    alert() {
      this.$Alert({
        title: 'title',
        content: <div>HelloWorld</div>,
        btnText: 'OK',
        onOk: () => {
          return true;
        },
      });
    },
    confirm() {
      this.$Confirm({
        title: '确认',
        content: '确认退出？',
        btnOkText: '确认',
        btnCancelText: '取消',
        onOk: async () => {
          window.alert('OK');
          return true;
        },
      });
    },
    dialogJsx() {
      this.$Dialog({
        title: 'JSX',
        height: '60%',
        destroy: true,
        placement: 'right',
        content: (
          <HelloWorld
            props={{ msg: 'vue-lite-dialog' }}
            on-hello={(msg) => {
              this.$Alert({
                title: 'title',
                content: msg,
                btnText: 'OK',
                onOk: () => {
                  return true;
                },
              });
            }}
          />
        ),
      });
    },
    dialogVnode() {
      this.$Dialog({
        title: 'VNode',
        height: '60%',
        destroy: true,
        placement: 'right',
        content: this.$createElement(HelloWorld, {
          props: {
            msg: 'vue-lite-dialog',
          },
          on: {
            hello: (msg) => {
              this.$Alert({
                title: 'title',
                content: msg,
                btnText: 'OK',
                onOk: () => {
                  return true;
                },
              });
            },
          },
        }),
      });
    },
    choose() {
      this.$Choose({
        title: 'Data',
        height: '60%',
        list: [],
        placement: 'right',
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
