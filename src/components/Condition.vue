<template>
  <div class="condition">
    <div class="condition-content">
      <!-- 表达式 left -->
      <condition-cascader :value.sync="expressionLeftValue" :expression="expressionLeftValue"></condition-cascader>

      <!-- operator 操作 -->
      <operator :value.sync="expressionOperator"></operator>

      <!-- 表达式 right -->
      <condition-cascader :value.sync="expressionRightValue" :expression="expressionLeftValue"></condition-cascader>
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
        return this.condition.expression?.left || {}
      },
      set(value) {
        this.condition.expression.left = value
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
    // top: 50%;
    top: 25px;
    background-color: #c9c9c9;
    transform: translateX(-100%);
  }

  .condition-content {
    min-height: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5px;
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
