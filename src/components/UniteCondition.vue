<template>
  <div class="unite-condition">
    <div class="unite-condition-content">
      <el-select
        class="unite-condition-select"
        v-model="value"
        @change="handleChange"
        placeholder="请选择"
      >
        <el-option-group v-for="(group, index) in options" :key="index">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span :style="{ color: item.value === 'delete' ? '#F56C6C' : '' }">{{ item.label }}</span> 
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import EventBus from "../utils/eventBus";

export default {
  name: "UniteCondition",
  props: {
    uniteCondition: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    value: {
      get() {
        return this.uniteCondition?.type || "";
      },
      set(newValue) {
        if (newValue === "and" || newValue === "or") {
          this.uniteCondition.type = newValue;
        }
      },
    },
  },
  data() {
    return {
      options: [
        {
          label: "",
          options: [
            {
              value: "and",
              label: "并且",
            },
            {
              value: "or",
              label: "或者",
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "condition",
              label: "添加条件",
            },
            {
              value: "uniteCondition",
              label: "添加联合条件",
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "delete",
              label: "删除",
            },
          ],
        },
      ],
    };
  },
  methods: {
    /**
     * 联合条件下拉选项
     * @param {String} value 当前选中的值
     */
    handleChange(value) {
      console.log(value, "change value");
      switch (value) {
        case "condition":
          this.handleAddCondition();
          break;
        case "uniteCondition":
          this.handleAddUniteCondition();
          break;
        case "delete":
          this.deleteUniteCondition();
          break;
      }
    },

    /**
     * 添加条件
     */
    handleAddCondition() {
      let defaultCondition = { id: "123", type: "normal" };
      this.uniteCondition.subConditions = [
        ...this.uniteCondition.subConditions,
        defaultCondition,
      ];
    },

    /**
     * 添加联合条件
     */
    handleAddUniteCondition() {
      let defaultUniteCondition = { id: "123", type: "or", subConditions: [] };
      this.uniteCondition.subConditions = [
        ...this.uniteCondition.subConditions,
        defaultUniteCondition,
      ];
    },

    /**
     * 删除当前联合条件
     */
    deleteUniteCondition() {
      EventBus.$emit("delete", this.uniteCondition);
      console.log("删除联合条件");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.unite-condition {
  display: flex;
  // margin-top: 25px;
}
.unite-condition-content {
  // margin-right: 15px;
  position: relative;
  // padding: 10px 0;
  height: 50px;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    left: 0;
    // top: 18px;
    background-color: #c9c9c9;
    transform: translateX(-100%);
  }
}
.unite-condition-select {
  width: 80px;
}
</style>
