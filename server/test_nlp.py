import pytest
from nlp import generate_contract


def test_generate_contract_basic():
    text = "I want a smart contract named ChrisCoin with 7000 tokens and symbol CB"
    contract, graph = generate_contract(text)
    print('result', contract, graph)
    assert graph == {}
    assert contract == True

def test_generate_contract_basic():
    text = "I want a smart contract"
    contract, graph = generate_contract(text)
    print('result', contract, graph)
    assert graph == {}
    assert contract == True
