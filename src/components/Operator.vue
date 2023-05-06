<template>
  <div class="operator-select">
    <el-select ref="select" v-model="localValue" placeholder="请选择" @change="handleChange" :style="{ width: width }">
      <el-option
        v-for="item in operate"
        :key="item.charator"
        :label="item.label"
        :value="item.charator"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import { OPERATE } from "../constants/valueType";
  export default {
    name: 'Operator',
    props: {
      value: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        localValue: '',

        operate: OPERATE,

        width: '36px'
      }
    },
    methods: {
      /**
       * 层级菜单选项改变
       * @param {String} value 选中的值
       */
      handleChange(value) {
        const text = this.operate.find(item => item.charator === value)?.label
        console.log('text', text);
        setTimeout(() => {
          this.width = (text?.length || 3) * 12 +  'px'
          this.$emit('update:value', {
            charator: value,
            label: text
          })
        })
      }
    },

    mounted () {
      this.curInputDom = this.$refs.select.$children[0].$el.querySelector('input');

      this.curInputDom.style.padding = '0'
      this.curInputDom.style.border = 'none'

      // 移除下拉的标志
      let suffixDom = this.$refs.select.$children[0].$el.querySelector('.el-input__suffix');

      this.$refs.select.$children[0].$el.removeChild(suffixDom)
      this.curInputDom.value = '请选择'

      this.localValue = this.value.charator

      this.handleChange(this.localValue)
    },
  }
</script>

<style lang="scss" scoped>
.operator-select {
  ::v-deep .el-input__inner{
    color: red;
    font-weight: 600;
  }
}
</style>