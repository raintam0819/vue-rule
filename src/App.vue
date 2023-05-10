<template>
  <div id="app">
    <div class="rule-box" v-for="(item, index) in conditionRules" :key="index">
      <div>
        <span class="title">如果</span>
        <unite-condition :uniteCondition="item.rootCondition" style="display: flex;">
          <render-sub-condition :conditions="item.rootCondition.subConditions"></render-sub-condition>
        </unite-condition>
      </div>
      <div>
        <span class="title">那么</span>
        {{ item.trueActions }}123123
      </div>
      <div>
        <span class="title">否则</span>
      </div>
    </div>
  </div>
</template>

<script>
import { conditionRules } from './conditionRules.js'

import UniteCondition from './components/UniteCondition'
import RenderSubCondition from './components/renderSubCondition'

import EventBus from './utils/eventBus'
import { getNode } from './utils'
import { Condition } from './constructor'

export default {
  name: 'App',
  components: {
    UniteCondition,
    RenderSubCondition
  },
  data() {
    return {
      // conditionRules: new Condition(conditionRules),
      conditionRules
    }
  },
  created() {
    // console.log(new Condition(conditionRules), '---conditionRules');
    this.conditionRules.forEach(item => item.rootCondition = new Condition(item.rootCondition))
    console.log(conditionRules, '---conditionRules1')
    
    EventBus.$on('delete', (data) => {
      console.log('delete events', data, getNode(this.conditionRules.subConditions, data))

      let { result, resIndex } = getNode(this.conditionRules.subConditions, data)
      result.splice(resIndex, 1)
    })
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14px;
}

.rule-box {
  text-align: left;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  border: 1px dashed rgb(201, 201, 201);
  .title {
    font-weight: 700;
    border-left: 4px solid #409eff;
    padding: 0 8px;
    margin-bottom: 8px;
  }
}
</style>
