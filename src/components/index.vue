<template>
  <div class="d-common-dialog" :class="wrapOptions.extClass">
    <div
      class="bottom-wrap-mask"
      :class="{ 'bottom-wrap-show': bottomWrapShow, hide: !mask }"
      @click="closeByMask"
    ></div>
    <div
      :style="contentBoxStyle"
      :class="
        `bottom-wrap-content-box ${wrapOptions.placement || 'bottom'} ${
          ban_animation ? '' : 'wrap-animation'
        } ${bottomWrapShow ? 'bottom-wrap-show' : ''}`
      "
    >
      <div
        v-if="wrapOptions.title"
        class="bottom-wrap-close"
        :style="titleStyle"
      >
        <span class="title">{{ wrapOptions.title }}</span>
        <div class="dialog-ic-close" @click="close" v-if="!wrapOptions.disableClose">
          <Close style="float: right"/>
        </div>
      </div>
      <div class="bottom-wrap-desc" v-if="wrapOptions.desc">
        {{ wrapOptions.desc }}
      </div>
      <div
        class="bottom-wrap-content"
        :class="{ 'no-padding': wrapOptions.noPadding }"
      >
        <slot name="content" v-if="$slots.content"></slot>
        <div
          v-if="wrapOptions.content && typeof wrapOptions.content === 'string'"
        >
          {{ wrapOptions.content }}
        </div>
      </div>
      <div class="bottom-wrap-btn" v-if="wrapOptions.type === 'confirm'">
        <div class="bottom-wrap-footer">
          <div class="wrap-button wrap-cancel" @click="close" :style="{background: theme.cancelBg, color: theme.cancelColor}">
            {{ wrapOptions.btnCancelText || 'Cancel' }}
          </div>
          <div
            class="wrap-button wrap-ok"
            :style="{background: theme.okBg, color: theme.okColor}"
            :class="{ disabled: wrapOptions.okDisabled }"
            @click="onOk"
          >
            {{ wrapOptions.btnOkText || 'Ok' }}
          </div>
        </div>
      </div>
      <div class="bottom-wrap-btn" v-if="wrapOptions.type === 'alert'">
        <div class="bottom-wrap-footer">
          <div class="wrap-button wrap-ok alert" @click="onOk" :style="{background: theme.okBg, color: theme.okColor}">
            {{ wrapOptions.btnOkText || wrapOptions.btnText || 'Ok' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Close from './close'

export default {
  name: 'vue-dialog',
  components: {
    Close
  },
  data() {
    return {
      wrapOptions: {
        content: '',
      },
      bottomWrapShow: false,
      mask: false,
      ban_animation: false,
      theme: {
        okBg: '',
        cancelBg: '',
        okColor: '',
        cancelColor: '',
        themeColor: ''
      }
    };
  },
  watch: {
    'wrapOptions.content': function(val) {
      if (typeof val === 'object') {
        this.$slots.content = val;
      } else {
        this.$slots.content = '';
      }
    },
  },
  computed: {
    contentBoxStyle() {
      return this.wrapOptions.height
        ? { height: this.wrapOptions.height }
        : this.wrapOptions.maxheight
        ? { 'max-height': this.wrapOptions.maxheight }
        : {};
    },
    titleStyle() {
      return {
        'text-align': this.wrapOptions.titlePosition
          ? this.wrapOptions.titlePosition
          : 'left',
        'border-bottom': this.wrapOptions.titleBordered
          ? '1px solid #e5e5e5'
          : 'none',
      };
    },
  },
  methods: {
    closeByMask() {
      if (!this.wrapOptions.banMaskHide) {
        this.close();
      }
    },
    view(v, callback) {
      if (v) {
        this.mask = true;
        this.bottomWrapShow = true;
      } else {
        this.bottomWrapShow = false;
        this.timer2 = setTimeout(() => {
          this.mask = false;
          callback && callback();
        }, 350);
      }
    },
    show(options) {
      if (this.bottomWrapShow) {
        // 如果在已有弹窗的基础上再次弹窗，先关闭原有弹窗
        this.view(null, this.showWrap.bind(this, options));
      } else {
        this.showWrap(options);
      }
    },
    showWrap(options) {
      if (options.placement !== this.wrapOptions.placement) {
        // 如果弹出内容位置与原来配置不一致，则关闭动画，设置为新位置后，再执行弹出
        this.ban_animation = true;
        this.wrapOptions.placement = options.placement;
        this.$forceUpdate();
        setTimeout(() => {
          this.ban_animation = false;
          this.wrapOptions = {
            ...options,
          };
          this.view(1);
        }, 20);
      } else {
        this.wrapOptions = {
          ...options,
        };
        this.view(1);
      }
    },
    close() {
      this.timer1 = setTimeout(() => {
        this.view();
        if (this.wrapOptions.destroy) {
          this.wrapOptions.content = null;
        }
        if (this.wrapOptions.onCancel) {
          this.wrapOptions.onCancel.bind(this)();
        }
      }, 10);
    },
    updateTheme(theme){
      this.theme = theme
    },
    async onOk() {
      if (this.wrapOptions.okDisabled) {
        return;
      }
      if (this.wrapOptions.onOk) {
        let isok = await this.wrapOptions.onOk.bind(this)();
        if (isok) {
          this.view();
        }
      } else {
        this.view();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.d-common-dialog {
  .bottom-wrap-mask {
    z-index: 400;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    animation: fadeOut-d-common-dialog 0.35s;
  }
  .bottom-wrap-mask.hide {
    display: none !important;
  }
  .bottom-wrap-mask.bottom-wrap-show {
    -webkit-animation: fadeIn-d-common-dialog 0.35s;
    animation: fadeIn-d-common-dialog 0.35s;
    opacity: 1;
  }
  .bottom-wrap-content-box {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    left: 0;
    height: auto;
    background-color: #fff;
    animation-timing-function: ease-in-out;
    -webkit-animation-timing-function: ease-in-out;
    width: 100%;
    z-index: 450;
    line-height: 1.5;
    .bottom-wrap-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
      padding: 0 20px;
      padding-top: 0;
      font-size: 14px;
      -webkit-overflow-scrolling: touch;
    }
    .bottom-wrap-content.no-padding {
      padding: 0 !important;
    }
    .bottom-wrap-desc {
      padding: 0 5%;
      margin-bottom: 12px;
    }
  }
  .bottom-wrap-content-box.wrap-animation {
    transition: transform 0.35s;
  }
  .bottom-wrap-content-box.top {
    transform: translateY(-100%);
  }
  .bottom-wrap-content-box.bottom {
    transform: translateY(100%);
  }
  .bottom-wrap-content-box.right {
    transform: translateX(100%);
  }
  .bottom-wrap-content-box.left {
    transform: translateX(-100%);
  }
  .bottom-wrap-content-box.bottom-wrap-show {
    transform: translate(0, 0);
  }
  .bottom-wrap-close {
    display: flex;
    font-size: 28px;
    line-height: 32px;
    padding: 30px 20px;
    align-items: center;
    .title {
      flex: auto;
      font-weight: 500;
    }
    .dialog-ic-close {
      float: right;
      width: 32px;
      height: 32px;
    }
  }
  .bottom-wrap-btn {
    margin: 30px 20px 20px 20px;
  }
  .bottom-wrap-footer {
    display: flex;
    justify-content: space-between;
    .wrap-cancel {
      border: 1px solid #bbbbbb;
      color: #666666;
    }
    .wrap-button.wrap-ok.disabled {
      background: #cccccc !important;
      color: #ffffff !important;
    }
    .wrap-button.wrap-ok.alert {
      width: 100%;
    }
    .wrap-button {
      display: inline-block;
      width: calc(50% - 25px);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      padding: 12px 8px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
@keyframes fadeIn-d-common-dialog {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut-d-common-dialog {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
