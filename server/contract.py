

# see https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20
def create_contract(name=None, symbol=None, amount=None):
    if not name:
        name = 'MyContract'

    return """
pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

{}
""".format('hi') #, symbol, amount)