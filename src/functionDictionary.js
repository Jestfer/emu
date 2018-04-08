;((exports) => {
  const FunctionDictionary = function () {
  }

  FunctionDictionary.new = function () {
    return new this();
  }

  FunctionDictionary.prototype.say = function(node) {
    return node.args.join(' ')
  }

  FunctionDictionary.prototype.add = function(node) {
    if (node.args.length === 0 ) { return 0 }
    return node.args.reduce((sum, value) => sum + value)
  }

  FunctionDictionary.prototype.subtract = function(node) {
    if (node.args.length === 0 ) { return 0 }
    return node.args.reduce(function(accumulator, elem) { return accumulator - elem })
  }

  FunctionDictionary.prototype.multiply = function(node) {
    if (node.args.length === 0 ) { return 0 }
    return node.args.reduce(function(accumulator, elem) { return accumulator * elem })
  }

  FunctionDictionary.prototype.modulo = function(node) {
    if (node.args.length === 0 ) { return 0 }
    if (node.args.length === 1 ) { return node.args[0] }
    return node.args[0] % node.args[1]
  }

  FunctionDictionary.prototype.assignVariable = function(node) {
    let tokenLex = {
      regEx: new RegExp(`^${node.args[0].value}`),
      type: 'variable',
      value: node.args[1].value,
      variableType: node.args[1].type
    }
    tokenDictionary.push(tokenLex)
  }

  FunctionDictionary.prototype.isGreaterThan = function(node) {
    if (node.args.length === 0) {
      return 'there is nothing to compare'
    }
    if (node.args.length === 1) {
      return 'pass two arguments'
    }
    return node.args[0] > node.args[1] ? 'yes' : 'no'
  }

  FunctionDictionary.prototype.isEqual = function(node) {
    if (node.args.length === 0) {
      return 'there is nothing to compare'
    }
    if (node.args.length === 1) {
      return 'pass two arguments'
    }
    return node.args[0] === node.args[1] ? 'yes' : 'no'
  }

  FunctionDictionary.prototype.isLessThan = function(node) {
    if (node.args.length === 0) {
      return 'there is nothing to compare'
    }
    if (node.args.length === 1) {
      return 'pass two arguments'
    }
    return node.args[0] < node.args[1] ? 'yes' : 'no'
  }

  FunctionDictionary.prototype.if = function(node) {
    if ( node.args[0] === 'yes') {
      return node.args[1]
    } else {
      return node.args[2]
    }
  }

  exports.FunctionDictionary = FunctionDictionary
})(this)
