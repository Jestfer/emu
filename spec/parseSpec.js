describe("Parse", function(){

  it('understands a function with zero argument', function() {
    const tokens = [
      {type: 'function', value: 'say'},
      {type: 'open paren', value: '('},
      {type: 'close paren', value: ')'}
    ]

    let functionNode = FunctionNode.new('function', 'say', [])
    let tree = [functionNode]

    expect(parse(tokens)).toEqual(tree)
  })

  it('understands a function with one argument', function() {
    const tokens = [
      {type: 'function', value: 'say'},
      {type: 'open paren', value: '('},
      {type: 'string', value: 'hello world'},
      {type: 'close paren', value: ')'}
    ]

    let stringNode = StringNode.new('string', 'hello world')
    let functionNode = FunctionNode.new('function', 'say', [stringNode])
    let tree = [functionNode]

    expect(parse(tokens)).toEqual(tree)
  })

  it('understands a function with two arguments', function() {
    const tokens = [
      {type: 'function', value: 'say'},
      {type: 'open paren', value: '('},
      {type: 'string', value: 'hello world'},
      {type: 'string', value: 'bye world'},
      {type: 'close paren', value: ')'}
    ]

    let stringNode1 = StringNode.new('string', 'hello world')
    let stringNode2 = StringNode.new('string', 'bye world')
    let functionNode = FunctionNode.new('function', 'say', [stringNode1, stringNode2])
    let tree = [functionNode]

    expect(parse(tokens)).toEqual(tree)
  })

  it('returns an abstract syntax tree when passed a nested function', () => {
    const tokens = [
      {type: 'function', value: 'say'},
      {type: 'open paren', value: '('},
      {type: 'string', value: 'hello'},
      {type: 'function', value: 'say'},
      {type: 'open paren', value: '('},
      {type: 'string', value: 'world'},
      {type: 'close paren', value: ')'},
      {type: 'close paren', value: ')'}
    ]

    const tree = [
      { type: 'function',
        name: 'say',
        args: [
          {
            type: 'string',
            value: 'hello'
          },
          {
            type: 'function',
            name: 'alsoSay',
            args: [
              'world'
            ]
          }
        ]
      }
    ]

    expect(parse(tokens)).toEqual(tree)
  });

})
