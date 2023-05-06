import { AND, OR, NORMAL } from '../constants/conditionType'
import { VARIABLE, FUNC } from '../constants/conditionType'

class Condition {
  constructor(props) {
    this.id = props.id
    this.type = props.type

    if (this.isNormalType) {
      this.expression = {};
      if (props.expression.left) {
        this.expression.left = new ValueType(props.expression.left);
      }
      if (props.expression.operator) {
        this.expression.operator = props.expression.operator;
      }
      if (props.expression.right) {
        this.expression.right = new ValueType(props.expression.right);
      }
    } else {
      console.log(Array.isArray(props.subConditions), '---Array.isArray(props.subConditions)')
      this.subConditions = Array.isArray(props.subConditions)
        ? props.subConditions.map(options => new Condition(options))
        : [];
    }
  }

  get isAndType() {
    return this.type === AND
  }

  get isOrType() {
    return this.type === OR
  }

  get isNormalType() {
    return this.type === NORMAL
  }
}

class ValueType {
  constructor({ id, type, value }) {
    this.id = id;
    this.type = type;
    this.value = this.init(value);
  }

  get isVariableType() {
    return this.type === VARIABLE;
  }

  get isFuncType() {
    return this.type === FUNC;
  }

  getValue() {
    return {
      type: this.type,
      value: this.value
    };
  }

  init(value) {
    return value
    // if (!this.type) return {};

    // if (this.type === VARIABLE) {
    //   return {
    //     dicts: value.dicts,
    //     groupCode: value.groupCode,
    //     groupLabel: value.groupLabel,
    //     propCode: value.propCode,
    //     propLabel: value.propLabel
    //   };
    // }

    // if (this.type === FUNC) {
    //   return {
    //     actionName: value.actionName,
    //     methodName: value.methodName,
    //     methodLabel: value.methodLabel,
    //     parameters: value.parameters.map(param => {
    //       param.value = new ValueType(param.value);
    //       return param;
    //     })
    //   };
    // }
  }
}

export {
  Condition
}