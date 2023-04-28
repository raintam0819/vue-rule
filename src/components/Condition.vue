<template>
  <div class="condition">
    <div class="condition-content">
      <!-- <div class="cascader-container">
        <span class="cascader-text" @click.self="handleShowCascader">{{ text || '请选择值类型' }}</span>
        <el-cascader
          ref="cascader"
          class="cascader"
          v-model="value"
          :options="options"
          @visible-change="handleVisibleChange"
          @change="handleCascaderChange"
        ></el-cascader>
      </div> -->
      <condition-cascader></condition-cascader>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in operate"
          :key="item.charator"
          :label="item.label"
          :value="item.charator"
        >
        </el-option>
      </el-select>
      <el-cascader
        @visible-change="handleVisibleChange"
        v-model="value2"
        :options="options"
      ></el-cascader>
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

export default {
  name: "Condition",
  components: {
    ConditionCascader,
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
  }
}
</style>
