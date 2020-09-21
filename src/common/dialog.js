/*
 * @Author: zhaochunzheng
 * @Date: 2019-10-26 12:09:58 
 * @Last Modified time: 2019-10-25 16:26:39
 */

import Dialog from '../components/index.vue'
import Choice from '../components/choice.vue'


const DialogAnimation = (() => {
  let okBg = 'linear-gradient(90deg, #FF925D 0%, #FF7B3C 100%)'
  let cancelBg = '#fff'
  let okColor = '#fff'
  let cancelColor = 'black'
  let themeColor = 'orange'
  return {
    setColor (opt) {
      okBg = opt.okBg || okBg
      cancelBg = opt.cancelBg || cancelBg
      okColor = opt.okColor || okColor
      cancelColor = opt.cancelColor || cancelColor
      themeColor = opt.themeColor || themeColor
    },
    getTheme () {
      return {
        okBg,
        cancelBg,
        okColor,
        cancelColor,
        themeColor
      }
    }
  }
})()

var $dialog

export default {
  install: function (Vue) {
    // , timer1, timer2
    Vue.prototype.$Confirm = function (props) {
      return this.$Dialog.bind(this)(
        Object.assign(props, {
          type: 'confirm',
          banMaskHide: true,
          disableClose: true,
          placement: props.placement || 'bottom'
        }))
    }
    Vue.prototype.$Alert = function (props) {
      return this.$Dialog.bind(this)(
        Object.assign(props, {
          type: 'alert',
          banMaskHide: true,
          disableClose: true,
          placement: props.placement || 'bottom'
        }))
    }
    /**
     * 
     * @param {*} $options 
     * {
     *  title: string,
        content: string | VNode,
        btnCancelText: string,
        btnOkText: string,
        onOk: function,
        onCancel:function,
        extClass: String,
        type:['confirm','alert','dialog'] default 'dialog',
        placement: top left bottom right, // default bottom
        noPadding: boolean, //default false
     * }
     */
    Vue.prototype.$Dialog = function ($options) {
      // timer1 && clearTimeout(timer1);
      // timer2 && clearTimeout(timer2);
      if (!$dialog) {
        let container = document.createElement('div')
        document.body.appendChild(container)
        container.setAttribute('id', `v-dialog-${Date.now()}`)
        let _Dialog = Vue.extend(Dialog)
        $dialog = new _Dialog().$mount(container)
        setTimeout(() => {
          $dialog.showWrap($options)
        }, 20)
        $dialog.updateTheme(DialogAnimation.getTheme())
      } else {
        $dialog.show($options)
      }
      return $dialog
    }
    Vue.prototype.$Choose = function (options) {
      return this.$Dialog({
        height: options.height || '100%',
        title: options.title,
        disableClose: options.disableClose,
        placement: options.placement || 'bottom',
        content: this.$createElement(Choice, { props: { ...options, color: DialogAnimation.getTheme().themeColor } }),
        desc: options.desc
      });
    }
    Vue.prototype.$RFDialog = function (props) {
      return this.$Dialog.bind(this)(
        Object.assign(props, {
          type: 'rf-dialog',
          height: props.containerType === 'max' ? 'calc(100% - 20px)': 'auto',
          disableClose: true,
          noPadding: true,
          isShowShadow: props.isShowShadow,
          placement: props.placement || 'bottom'
        }))
    }
  },
  setTheme (color, text_color) {
    DialogAnimation.setColor(color, text_color)
  },
  clean () {
    try {
      $dialog && $dialog.clean()
    } catch (e) {
      console.error(e)
    }
  }
}
