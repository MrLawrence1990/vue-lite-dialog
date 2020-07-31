# vue-dialog
## V1.0 currently only mobile is supported

## install
```
npm install vue-lite-dialog --save
```

### Usage
```javascript
/* {
  *  title: string, // 标题
    content: string | VNode, // 弹窗内容
    btnCancelText: string, // 取消按钮文案
    btnOkText: string, // 确认按钮文案
    onOk: function, // 确认回调
    onCancel:function, // 取消回调
    extClass: String, // 扩展className
    type:['confirm','alert','dialog'] default 'dialog', // 弹窗类型
    placement: top left bottom right, // default bottom //  弹出位置
    noPadding: boolean, //default false
  * }
  */

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
```

```javascript
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

