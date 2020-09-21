<template>
  <div id="app">
    <div class="test-item">
      <button @click="alert">Dialog-Alert</button>
    </div>
    <div class="test-item">
      <button @click="confirm">Dialog-confirm</button>
    </div>
    <div class="test-item">
      <button @click="dialogVnode">Dialog-dialog-vnode</button>
    </div>
    <div class="test-item">
      <button @click="dialogJsx">Dialog-dialog-jsx</button>
    </div>
    <div class="test-item">
      <button @click="choose">Dialog-choose</button>
    </div>
    <div class="test-item">
      <button @click="testDoublePop">测试连续弹出</button>
    </div>
    <div class="test-item">
    </div>
    <div class="test-item">
      <button @click="testRFDialog">testRFDialog</button>
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
        onOk: async () => {
          await this.$ajax();
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
        list: [{}],
        placement: 'right',
      });
    },
    $ajax() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },
    testDoublePop() {
      let a = this.$Confirm({
        title: '弹窗1',
        content: '弹窗1content',
        btnOkText: '确认',
        btnCancelText: '取消',
        onOk: async () => {
          window.alert('OK');
          return true;
        },
      });
      setTimeout(() => {
        a.close()
        this.$Confirm({
        title: '弹窗2',
        content: '弹窗2content',
          btnOkText: '确认',
          btnCancelText: '取消',
          onOk: async () => {
            window.alert('OK');
            return true;
          },
        });
      },2000);
    },
    testRFDialog(){
      this.$RFDialog({
        title: 'title',
        leftAction: {
          content: <span>left</span>,
          type: 'close',
          handler(){
            alert(1)
          }
        },
        rightAction: {
          content: <span>right</span>,
          type: 'forward',
          handler(){
            alert(1)
          }
        },
        containerType: 'max',
        destroy: true,
        isShowShadow: true,
        // placement: 'right',
        content: (()=>{
          return (<ul>
            {(()=>{
              let list = []
              for(let i=0;i<50;i++){
                list.push(<li>{i}</li>)
              }
              return list
            })()}
          </ul>)
        })(),
      });
    }
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
.test-item {
  width: 100%;
  margin: 12px 0;
}
.test-item button {
  padding: 12px;
  width: 100%;
}
</style>
