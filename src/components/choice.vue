<script>
import Check from './check.vue'

export default {
  name: 'dialog-choice',
  data() {
    return {
      value: null,
    };
  },
  props: {
    list: {
      type: Array,
      default: Array,
      required: true,
    },
    desc: {
      type: String,
      default: '',
    },
    renderField: {
      type: String,
      default: '',
    },
    checkField: {
      type: String,
      default: '',
    },
    default: {
      default: null,
    },
    handleCheck: {
      type: Function,
      default: null,
    },
    template: {
      type: Object,
    },
    titleBordered: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String
    }
  },
  watch: {
    default: {
      handler(val) {
        this.value = val;
      },
    },
  },
  created() {
    this.value = this.default;
  },
  methods: {
    handleChecked(item) {
      this.value = this.checkField ? item[this.checkField] : item;
      this.handleCheck && this.handleCheck(item);
    },
  },
  render() {
    return (
      <div class="d-common-dialog common-choice">
        {this.list.map((item, index) => {
          return (
            <div
              class="chose-item"
              key={index}
              onClick={this.handleChecked.bind(this, item)}>
              <span class="chose-name">
                {this.template ? (
                  <this.template props={{ item }} />
                ) : this.renderField ? (
                  item[this.renderField]
                ) : (
                  item
                )}
              </span>
              {(this.checkField ? (
                item[this.checkField] === this.value
              ) : (
                item === this.value
              )) ? (
                <Check style={{ 'font-size': '26px', 'text-align': 'right' }} props={{color: this.color}}/>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>

.d-common-dialog.common-choice .chose-item {
  padding: 2px 0;
  display: flex;
}
.d-common-dialog.common-choice .chose-name {
  flex: 4;
  display: flex;
  align-items: center;
  min-height: 40px;
}
</style>
