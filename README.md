# vue-dialog
## V1.0 currently only mobile is supported

## install
```
npm install vue-lite-dialog --save
```

### Usage
```javascript
// Alert
this.$Alert({
  title: 'title',
  content: <div>HelloWorld</div>,
  btnText: 'OK',
  onOk: async () => {
    await this.$ajax();
    return true
  },
})

// Confirm
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

// Dialog -- JSX
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

// Dialog -- VNode
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

// You can get the dialog instance
let dialogInstance = this.$Confirm({
  title: '确认',
  content: '确认退出？',
  btnOkText: '确认',
  btnCancelText: '取消',
  onOk: async () => {
    window.alert('OK');
    return true;
  },
});
```

