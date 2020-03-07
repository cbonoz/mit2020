import pytest
from nlp import generate_contract


def test_generate_contract_basic():
    text = "I want a smart contract named ChrisCoin with 7000 tokens"
    contract, graph = generate_contract(text)
    print('result', contract, graph)
    assert graph == {}
    assert contract == True
