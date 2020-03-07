


def _create_constructor(name, amount, **kwargs):
    values = []
    for k in kwargs:
        val = kwargs[k]
        if str(val).isdigit():
            val = int(val)
            t = 'uint8'
        else:
            t = 'string'
        values.append({
            'val': val,
            'type': t
        })

    variables = '\n'.join(["{} public {};".format(v['type'], v['val']) for v in values])
    args = ','.join(["{} _{}".format(v['type'], v['val']) for v in values])
    assigns = '\n'.join(['{} = _{};\n'.format(v['val'], v['val']) for v in values])

    return """

    %s

    function %s(
        %s
    ) public {
        balances[msg.sender] = %s;               // Give the creator all initial tokens
        totalSupply = %s;                        // Update total supply
        %s
    }
    """.format(variables, name, args, amount, amount, assigns)



# see https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20
def create_contract(name=None, amount=None, **kwargs):
    if not name:
        name = 'MyContract'
    if not symbol:
        symbol = 'TOK'
    if not amount:
        amount = 1000

    cons = _create_constructor(**kwargs)

    return """
pragma solidity ^0.4.21;

import "./EIP20Interface.sol";


contract %s is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

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

""" % (name, cons)