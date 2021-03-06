


def _create_function(name, args=None, returns=None, **kwargs):

    if not args:
        args = []

    # TODO: add type mapping
    return_string = 'returns (uint8 {})'.format(returns) if returns else ''

    arg_string = ','.join([
        'uint8 {}'.format(a) for a in args
    ])

    return_statement = '\t\treturn {};'.format(returns) if returns else ''

    return """
    function %s(%s) public %s {
        // TODO
         
%s
    }
    """ % (name, arg_string, return_string, return_statement)

# see https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20
def create_contract(name=None, symbol=None, amount=None, functions=None, **kwargs):
    if not name:
        name = 'MyContract'
    if not symbol:
        symbol = 'TOK'
    if not amount:
        amount = 1000
    if not functions:
        functions = []

    my_vars = [
        {
            'type': 'uint8' if kwargs[k].isdigit() else 'string',
            'key': k,
            'value': kwargs[k]

        } for k in kwargs
    ]

    variables = '\n'.join([
        '\t{} public {}; // User provided variable (to add to constructor)'.format(m['type'], m['key']) for m in my_vars
    ]) + '\n'

    assigns = '\n'.join([
        '\t\t{} = {};'.format(m['key'], m['value'] if m['type'] == 'uint8' else '"%s"' % m['value']) for m in my_vars
    ])

    function_text = '\n'.join([
        _create_function(**f) for f in functions
    ]) + '\n'

    print('variables', kwargs, my_vars, functions)

    return """
pragma solidity ^0.4.21;

import "./EIP20Interface.sol";


contract %s is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    string public name; // Token name: eg Simon Bucks
    uint8 public decimals; //How many decimals to show.
    string public symbol; //An identifier for the token: eg SBX
%s
    function %s(
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = %s; // Give the creator all initial tokens
        totalSupply = %s; // Update total supply
        name = "%s"; // Set the name for display purposes
        decimals = _decimalUnits; // Amount of decimals for display purposes
        symbol = "%s"; // Set the symbol for display purposes
%s
    }

    %s
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}

""" % (name, variables, name, amount, amount, name, symbol, assigns, function_text) #, symbol, amount)