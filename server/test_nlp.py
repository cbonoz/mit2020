import pytest
from nlp import generate_contract


def test_generate_contract_basic():
    text = "I want a smart contract named ChrisCoin with 7000 tokens and symbol CB"
    data = generate_contract(text)
    
def test_generate_contract_pytest():
    text = "I want a smart contract"
    data = generate_contract(text)
