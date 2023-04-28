<template>
  <div id="app">
    <unite-condition style="display: flex;">
      <render-sub-condition :conditions="conditionRules.subConditions"></render-sub-condition>
    </unite-condition>
  </div>
</template>

<script>
import conditionRules from './conditionRules.js'

import UniteCondition from './components/UniteCondition'
import RenderSubCondition from './components/renderSubCondition'

import EventBus from './utils/eventBus'
import { getNode } from './utils'

export default {
  name: 'App',
  components: {
    UniteCondition,
    RenderSubCondition
  },
  data() {
    return {
      conditionRules: conditionRules
    }
  },
  mounted () {
    console.log(conditionRules, '---conditionRules');

    EventBus.$on('delete', (data) => {
      console.log('delete events', data, getNode(this.conditionRules.subConditions, data))

      let { result, resIndex } = getNode(this.conditionRules.subConditions, data)
      result.splice(resIndex, 1)
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14px;
}
</style>
