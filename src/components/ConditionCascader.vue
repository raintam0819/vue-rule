<template>
  <div class="cascader-container">
    <!-- <span class="cascader-text" @click.self="handleShowCascader">{{ text || '请选择值类型' }}</span> -->
    <el-cascader
      ref="cascader"
      class="cascader"
      v-model="localValue"
      :options="options"
      @change="handleCascaderChange"
      :style="{ width: width }"
    ></el-cascader>
  </div>
</template>

<script>
import { mockFuncs, mockVariables, mockConstants } from "../conditionRules";
import { getFathersById } from '../utils'
export default {
  name: "ConditionCascader",
  props: {
    value: {
      type: Array | Object,
      default: () => []
    }
  },
  data() {
    return {
      localValue: '',

      curInputDom: null,
      
      width: '72px'
    }
  },
  computed: {
    options() {
      // const Input = {
      //   value: "input",
      //   label: "输入值",
      //   children: null,
      // };

      const Funcs = {
        value: "funcs",
        label: "选择函数",
        children: mockFuncs,
      };

      const Variables = {
        value: "variables",
        label: "选择变量",
        children: mockVariables,
      };

      // const Constants = {
      //   value: "constants",
      //   label: "选择常量",
      //   children: mockConstants,
      // };
      // return [Input, Variables, Constants, Funcs];
      return [Variables, Funcs];
    }
  },
  methods: {
    /**
     * 层级菜单选项改变
     * @param {String} value 选中的值
     */
    handleCascaderChange(value) {
      const nodeList = getFathersById(value[value.length - 1], this.options, 'value')
      console.log('nodeList', nodeList);
      setTimeout(() => {
        let text = nodeList.map(item => item.label)
        text.shift()
        if (text.length) {
          this.curInputDom.value = text.join('.')
        }
        this.width = (12 * (this.curInputDom.value.length - text.length + 1)) + ((text.length - 1) * 5) +  'px'
        this.$emit('update:value', value)
      })
    }
  },
  mounted () {
    // 选中级联选择器的 input DOM
    this.curInputDom = this.$refs.cascader.$children[0].$el.querySelector('input');

    this.curInputDom.style.padding = '0'
    this.curInputDom.style.border = 'none'
    // 移除下拉的标志
    let suffixDom = this.$refs.cascader.$children[0].$el.querySelector('.el-input__suffix');
    
    this.$refs.cascader.$children[0].$el.removeChild(suffixDom)
    this.curInputDom.value = '请选择值类型'

    this.localValue = this.value

    this.handleCascaderChange(this.localValue)
  },
};
</script>

<style lang="scss" scoped>
.cascader-container {
  position: relative;
  padding: 0 5px;
  cursor: pointer;
  // user-select: none;
  ::v-deep .el-input__inner{
    color: #409eff;
    font-weight: 600;
  }
  .cascader {
    // width: 1px;
    // overflow: hidden;
    // position: absolute;
    // left: 0;
    // top: 0;
    // z-index: -1;
    // right: 0;
    // top: 0;
    // bottom: 0;
  }
}
</style>
