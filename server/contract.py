


def create_contract(name=None, symbol=None amount=None):
    if not name:
        name = 'MyContract'
    return """

    pragma solidity >=0.4.22 <0.6.0;

    contract {} {

    }


    """.format(name, amount)