# pip install spacy
# python -m spacy download en_core_web_sm

import spacy
from .contract import create_contract

# Load English tokenizer, tagger, parser, NER and word vectors
nlp = spacy.load("en_core_web_sm")

# # Analyze syntax
# print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
# print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])
# Find named entities, phrases and concepts


# https://spacy.io/usage/linguistic-features
def generate_contract(text):
    doc = nlp(text)

    # Analyze syntax
    print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
    print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])


    name = None 
    amount = None
    symbol = None

    for token in doc:
        print(token.text, token.dep_, token.head.text, token.head.pos_,
            [child for child in token.children])
        if token.head.text == 'named' and token.dep_ == 'oprd':
            name = token.text
        elif token.head.text == 'tokens' and token.dep_ == 'nummod':
            amount = token.text
        elif token.head.text == 'symbol' and token.dep_ =='dobj':
            symbol = token.text

    print(doc)
    # TODO: parse and understand the input text -> generate a smart contract as code. Return the contract code.
    print('params', name, symbol, amount)

    code = create_contract(name, symbol, amount)
    return code, {}