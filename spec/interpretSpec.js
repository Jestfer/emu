describe('interpret()', function() {

  let intNode1, intNode2, intNode3

  beforeEach(() => {
    intNode1 = { }
    intNode2 = { }
    intNode3 = { }
    intNode4 = { }

    spyOn(functionDictionary, 'add').and.returnValue('added')
  })

  describe('when passed three-node AST', () => {

    beforeEach(() => {
      let funcNode = {
        name: 'add',
        type: 'function',
        args: [intNode1, intNode2]
      }
      tree = [funcNode]
    })

    it('calls the right function name on the dictionary', () => {
      expect(interpret(tree)).toEqual(['added'])
    })

  })

  describe('when passed five-node nested AST', () => {
    beforeEach(() => {
      let innerFuncNode = {
        name: 'add',
        type: 'function',
        args: [intNode2, intNode3]
      }
      let outerFuncNode = {
        name: 'add',
        type: 'function',
        args: [intNode1, innerFuncNode]
      }
      tree = [outerFuncNode]
    })

    it('recursively resolves functions', () => {
      expect(interpret(tree)).toEqual(['added'])
    })

  })

  describe('it interprets a while loop', () => {
    xit('calls interpretLoop method', () => {
      let spyLoop = {
        type: 'loop',
        args: []
      }
      // const spyInterpretLoop = jasmine.createSpy('interpretLoop').and.returnValue('success')
      // let funcNode1 = {
      //   type: 'function'
      // }
      // let funcNode2= {
      //
      // }
      // let whileNode = {
      //   type: 'loop',
      //   name: 'while',
      //   args: []
      // }
      tree = [spyLoop]
      spyOn(spyLoop, '')
      interpret(tree)
      expect(spyLoop).toHaveBeenCalledWith(spyLoop.args)
    })

  })

})

describe('interpretLoop', () => {
  emu('assignVariable<"x" 1>')
  // 'while<isLessThan<x 3> returnFirst<say<x> assignVariable<x add<x 1>>>>'
  let variableNode = VariableNode.new('x')
  let threeNode = IntegerNode.new(3)
  let isLessThanNode = FunctionNode.new('isLessThan', 'function', [variableNode, threeNode])

  let oneNode = IntegerNode.new(1)
  let addNode = FunctionNode.new('add', 'function', [variableNode, oneNode])
  let sayNode = FunctionNode.new('say', 'function', [variableNode])

  let assignVariableNode = FunctionNode.new('assignVariable', 'function', [variableNode, addNode])
  let returnFirstNode = FunctionNode.new('returnFirst', 'function', [sayNode, assignVariableNode])
  let whileNode = FunctionNode.new('while', 'loop', [isLessThanNode, returnFirstNode])

  it('evaluates a simple while node', () => {
    expect(interpretLoop(whileNode)).toEqual(['1', '2'])
  })
})
