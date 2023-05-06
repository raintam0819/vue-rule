<template>
  <div class="condition">
    <div class="condition-content">
      <!-- 表达式 left -->
      <condition-cascader :value.sync="expressionLeftValue"></condition-cascader>

      <!-- operator 操作 -->
      <operator :value.sync="expressionOperator"></operator>

      <!-- 表达式 right -->
      <condition-cascader :value.sync="expressionRightValue"></condition-cascader>
      <span class="delete-text" @click="handleDelete">删除</span>
    </div>
  </div>
</template>

<script>
import EventBus from "../utils/eventBus";
import { mockFuncs, mockVariables, mockConstants } from "../conditionRules.js";
import { OPERATE } from "../constants/valueType";
import { getFathersById } from '../utils'

import ConditionCascader from './ConditionCascader'
import Operator from './Operator'

export default {
  name: "Condition",
  components: {
    ConditionCascader,
    Operator
  },
  props: {
    condition: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      visible: false,

      operate: OPERATE,

      text: ''
    };
  },
  computed: {
    options() {
      const Input = {
        value: "input",
        label: "输入值",
        children: null,
      };

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

      const Constants = {
        value: "constants",
        label: "选择常量",
        children: mockConstants,
      };
      return [Input, Variables, Constants, Funcs];
    },

    // 表单式左侧
    expressionLeftValue: {
      get() {
        return this.condition.expression?.left?.value || {}
      },
      set(value) {
        this.condition.expression.left.value = value
      }
    },

    // 表达式右侧
    expressionRightValue: {
      get() {
        return this.condition.expression?.right?.value || {}
      },
      set(value) {
        this.condition.expression.right.value = value
      }
    },

    // 操作符
    expressionOperator: {
      get() {
        return this.condition.expression?.operator || {}
      },
      set(value) {
        this.condition.expression.operator = value
      }
    }
  },
  methods: {
    handleDelete() {
      EventBus.$emit("delete", this.condition);
    },

    /**
     * 级联选择器展示
     * @param {Boolean} visible 是否下拉出现
     */
    handleVisibleChange(visible) {
      console.log('visible', visible);
      this.visible = visible;
    },

    handleShowCascader(e) {
      // console.log(this.$refs.cascader)
      console.log("event toggle", this.visible, this.$refs.cascader.dropDownVisible);
      this.$refs.cascader.toggleDropDownVisible(!this.$refs.cascader.dropDownVisible);
    },

    /**
     * 层级菜单选项改变
     * @param {String} value 选中的值
     */
    handleCascaderChange(value) {
      console.log('value', value);
      // console.log('value getFathersById', getFathersById(value[value.length - 1], this.options, 'value'));
      const nodeList = getFathersById(value[value.length - 1], this.options, 'value')
      
      this.text = nodeList.map(item => item.label)
      this.text.pop()
      this.text = this.text.join('.')
    }
  },
  mounted() {
    // console.log(mockFuncs, mockVariables, mockConstants);
    // console.log(OPERATE, '---OPERATE')
  },
};
</script>

<style lang="scss" scoped>
.condition {
  display: flex;
  justify-content: flex-start;
  position: relative;
  // padding: 10px 0;
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    left: 0;
    top: 50%;
    background-color: #c9c9c9;
    transform: translateX(-100%);
  }

  .condition-content {
    height: 50px;
    display: flex;
    align-items: center;
    .cascader-container {
      position: relative;
      padding: 0 5px;
      cursor: pointer;
      // user-select: none;
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
  }

  .delete-text {
    color: #f56c6c;
    margin-left: 8px;
    cursor: pointer;
    width: 30px;
    font-weight: 600;
  }
}
</style>
