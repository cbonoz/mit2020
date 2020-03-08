import pytest
from .nlp import generate_contract


def test_generate_contract_basic():
    text = "I want a smart contract named ChrisCoin with 7000 tokens and symbol CB"
    data = generate_contract(text)
    assert None
    
def test_generate_contract_var():
    text = "I want a smart contract named chris with 700 tokens and with symbol CB and height 800"
    data = generate_contract(text)
    assert None

def test_generate_contract_complex():
    text = """
    I want a smart contract named chris with 700 tokens and with symbol CB and height 800. It has a function cost which takes a price and amount and returns a total.
    """
    data = generate_contract(text)
    print(data)
    assert None
