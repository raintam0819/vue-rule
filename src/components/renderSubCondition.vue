<template>
  <div class="sub-conditions" :class="{ 'have-conditions': conditions.length }">
    <div v-for="(item, index) in conditions" class="sub-conditions-item" :key="index" >
      <condition v-if="item.type === 'normal'" :condition="item"></condition>
      <unite-condition :unite-condition="item" v-else>
        <render-sub-condition :conditions="item.subConditions"></render-sub-condition>
      </unite-condition>
    </div>
  </div>
</template>

<script>
import UniteCondition from './UniteCondition'
import Condition from './Condition'

export default {
  name: 'renderSubCondition',
  components: { UniteCondition, Condition },
  props: {
    conditions: {
      type: Array,
      default: () => []
    },
  },

}
</script>

<style lang="scss" scoped>
.sub-conditions {
  &.have-conditions {
    border-left: 2px solid #c9c9c9;
  }
  // margin-top: 20px;
  padding-left: 10px;
  .sub-conditions-item {
    position: relative;
  }
  & > div:first-child {
    &::before {
      content: "";
      position: absolute;
      width: 2px;
      height: 25px;
      top: 0;
      left: -12px;
      background-color: skyblue;
      background-color: #fff;
    }
  }

  & > div:last-child {
    &::after {
      content: "";
      position: absolute;
      width: 2px;
      height: calc(100% - 25px);
      bottom: 0;
      left: -12px;
      // background-color: yellow;
      background-color: #fff;
    }
  }
  // }
  .unite-condition {

  }
}
</style>