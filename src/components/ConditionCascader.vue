<template>
  <div class="cascader-container">
    <!-- 条件对象选择 -->
    <cascader :default-value="expression.value" :options="options" @change="onChange">
      <span class="cascader-text">{{ expression.label || '选择对象' }}</span>
    </cascader>

    <!-- 对象后的数据操作，如加减乘除的逻辑 -->
    <div class="calc-box" v-for="(item, index) in expression.calcList" :key="index">

      <!-- 符号选择 + - x % -->
      <el-select class="math-box" v-model="item.mathSign" placeholder="" :class="{ 'no-border': item.mathSign }">
        <el-option
          v-for="item in mathOptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>

      <template v-if="item.mathSign">
        <!-- 输入值的类型，维度对象或者自定义输入值 -->
        <el-select v-if="!item.value" class="math-box" v-model="item.type" placeholder="" @change="changeCalcType($event, item)">
          <el-option
            v-for="item in valueType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <!-- 自定义输入框 -->
        <template v-if="item.isInputType">
          <span class="calc-item-value" v-if="item.blur" @click="handleCalcValueClick(item, `calc-item-value-${index}`)">{{ item.value || '点击输入' }}</span>
          <el-input :ref="`calc-item-value-${index}`" v-else v-model="item.value" placeholder="" @blur="item.blur = true" style="width: 80px;"></el-input>
        </template>

        <!-- 维度对象 -->
        <cascader v-else-if="item.type" :default-value="item.value" :options="options" @change="(value, selectedOptions) => { onChange(value, selectedOptions, item) }">
          <span class="cascader-text">{{ item.label || '选择对象' }}</span>
        </cascader>
      </template>
    </div>

    <!-- 添加数据按钮 -->
    <span class="add-calc" @click="addCalc">
      <i class="el-icon-plus"></i>
    </span>
  </div>
</template>

<script>
import { mockFuncs, mockVariables, mockConstants } from "../conditionRules";
import { getFathersById } from '../utils'
import { INPUT, VARIABLE } from '../constants/valueType'
import 'ant-design-vue/dist/antd.css'
import { Cascader } from 'ant-design-vue';
import { CalcType } from '../constructor'

export default {
  name: "ConditionCascader",
  components: { Cascader },
  props: {
    expression: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
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

      INPUT,
    }
  },
  computed: {
    options() {
      // const Input = {
      //   value: "input",
      //   label: "输入值",
      //   children: null,
      // };

      // const Funcs = {
      //   value: "funcs",
      //   label: "选择函数",
      //   children: mockFuncs,
      // };

      const Variables = {
        value: "variables",
        label: "选择变量",
        children: mockVariables,
      };
      return [Variables];
    }
  },
  methods: {
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
    },

    /**
     * 输入值类型变化
     * @param {String} value 当前选择的级联 option 数组
     * @param {Object} item 当前计算符的对象
     */
    changeCalcType(value, item) {
      item.value = value === INPUT ? '' : []
    },

    /**
     * 添加运算符
     */
    addCalc() {
      this.expression.calcList.push(new CalcType({}))
    },

    /**
     * 计算值点击
     * @param {Object} item 当前计算符的对象
     * @param {String} ref 当前输入框的 ref 字符串
     */
    handleCalcValueClick(item, ref) {
      item.blur = false
      this.$nextTick(() => {
        console.log(ref, this.$refs[ref], '--')
        this.$refs[ref][0].focus()
      })
    }
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

  .cascader-text, .add-calc, .calc-item-value {
    min-width: 15px;
    line-height: 30px;
    color: #409eff;
    font-weight: 600;
    font-size: 12px;
  }

  .add-calc {
    margin-left: 5px;
  }

  .no-border {
    border: none;
  }
}
</style>
