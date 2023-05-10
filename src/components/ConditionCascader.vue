<template>
  <div class="cascader-container">
    <!-- <span class="cascader-text" @click.self="handleShowCascader">{{ text || '请选择值类型' }}</span> -->
    <!-- <el-cascader
      ref="base"
      class="cascader"
      v-model="localValue"
      :options="options"
      @change="handleCascaderChange($event, 'base')"
      :style="{ width: width }"
    >
    </el-cascader> -->
    <cascader :default-value="expression ? expression.value : []" :options="options" @change="onChange">
      <span class="cascader-text">{{ expression ? expression.label : '请选择' }}</span>
    </cascader>
    <!-- <div class="math-box">x</div> -->
    <div class="calc-box" v-for="(item, index) in expression.calcList" :key="index">

      <el-select class="math-box" v-model="item.mathSign" placeholder="">
        <el-option
          v-for="item in mathOptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select class="math-box" v-model="item.type" placeholder="">
        <el-option
          v-for="item in valueType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input v-if="item.type === INPUT" v-model="item.value" placeholder=""></el-input>

      <!-- <el-cascader
        class="cascader"
        :class="[ index ? `cascader-${index}` : '']"
        ref="calc"
        v-model="item.value"
        :options="options"
        @change="handleCascaderChange($event, 'calc', index)"
        v-else
      > -->
      <!-- @change="handleCascaderChange"
        :style="{ width: width }" -->
      <!-- </el-cascader> -->
      <cascader v-else :default-value="item.value" :options="options" @change="(value, selectedOptions) => {onChange(value, selectedOptions, item) }">
        <span class="cascader-text">{{ item.label }}</span>
      </cascader>
    </div>
  </div>
</template>

<script>
import { mockFuncs, mockVariables, mockConstants } from "../conditionRules";
import { getFathersById } from '../utils'
import { INPUT, VARIABLE } from '../constants/valueType'
import 'ant-design-vue/dist/antd.css'
import { Cascader } from 'ant-design-vue';

export default {
  name: "ConditionCascader",
  components: { Cascader },
  props: {
    value: {
      type: Array | Object,
      default: () => []
    },
    expression: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      localValue: '',
      localText: '123123',

      curInputDom: null,
      
      width: '72px',

      mathOptions: [
        {
          value: '+'
        },
        {
          value: '-'
        },
        {
          value: 'x'
        },
        {
          value: '÷'
        },
        {
          value: '%'
        },
      ],

      valueType: [
        {
          label: '输入值',
          value: INPUT
        },
        {
          label: '选择变量',
          value: VARIABLE
        }
      ],

      mathValue: '',

      TestArr: [
        {
          mathSign: '%',
          type: INPUT,
          value: '123'
        },
        {
          mathSign: '%',
          type: VARIABLE,
          value: ["variables","kehu","xingbie"],
          label: '客户.订单.性别'
        },
      ],

      INPUT,

      testVar: 1
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
     * @param {String} type 级联选择器的类别，base 或 calc 的
     * @param {Number} index 级联选择器下标
     */
    handleCascaderChange(value, type, index) {
      console.log('value, type', value, type, index);
      // 选中级联选择器的 input DOM
      console.log(this.$refs[type], '--this.$refs')
      let curInputDom = null
      if (type === 'base') {
        curInputDom = this.$refs[type].$children[0].$el.querySelector('input');
      } else {
        console.log(this.$refs[type], '---')
        // this.$refs.for
        curInputDom = this.$refs[type][index].$children[0].$el.querySelector('input');
      }
      const nodeList = getFathersById(value[value.length - 1], this.options, 'value')
      console.log('nodeList', nodeList);
      setTimeout(() => {
        let text = nodeList.map(item => item.label)
        text.shift()
        console.log(text, curInputDom, '--text')
        if (text.length) {
          curInputDom.value = text.join('.')
        }
        this.width = (12 * (curInputDom.value.length - text.length + 1)) + ((text.length - 1) * 5) +  'px'
        this.$emit('update:value', value)
      })
    },

    /**
     * 处理级联选择器样式
     * @param {String} ref 传入的 ref
     */
    removeCascaderStyle(ref) {
      // 选中级联选择器的 input DOM
      let curInputDom = ref.$children[0].$el.querySelector('input');

      curInputDom.style.padding = '0'
      curInputDom.style.border = 'none'
      // 移除下拉的标志
      let suffixDom = ref.$children[0].$el.querySelector('.el-input__suffix');
      
      ref.$children[0].$el.removeChild(suffixDom)
      curInputDom.value = '请选择值类型'
    },

    /**
     * 级联选择器改变
     * @param {Array} value 当前选择的级联 value 数组
     * @param {Array} selectedOptions 当前选择的级联 option 数组
     * @param {Object} item 当前计算符的对象
     */
    onChange(value, selectedOptions, item) {
      selectedOptions.shift()
      let text = selectedOptions.map(o => o.label).join('.')
      if (item) {
        item.value = value
        item.label = text
      } else {
        this.expression.label = text
      }
    }
  },
  mounted () {
    // this.removeCascaderStyle(this.$refs.base)
    // this.removeCascaderStyle('calc')
    // console.log(this.$refs.calc)
    // this.$refs.calc?.forEach(ref => {
    //   this.removeCascaderStyle(ref)
    // })
    // this.localValue = this.value

    // this.handleCascaderChange(this.localValue, 'base')
  },
};
</script>

<style lang="scss" scoped>
.cascader-container {
  position: relative;
  padding: 0 5px;
  cursor: pointer;
  display: flex;
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
    flex-shrink: 0;
  }

  .calc-box {
    display: flex;
    margin-left: 5px;
  }
  .math-box {
    border: 1px dashed #409eff;
    text-align: center;
    margin-right: 5px;
    cursor: pointer;
    display: inline-block;
    ::v-deep {
      .el-input__inner {
        border: none;
        width: 20px;
        padding: 0;
        text-align: center;
      }
      .el-input__suffix {
        display: none;
      }
    }
  }

  .cascader-text {
    line-height: 30px;
    color: #409eff;
    font-weight: 600;
    font-size: 12px;
  }
}
</style>
