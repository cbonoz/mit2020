# pip install spacy
# python -m spacy download en_core_web_sm

import spacy
from collections import defaultdict
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


    data = defaultdict(lambda x: '')
    reasons = []

    for token in doc:
        print(token.text, token.dep_, token.head.text, token.head.pos_,
            [child for child in token.children])
        if token.text == 'contract':
            continue
        if token.head.text == 'named' and token.dep_ == 'oprd':
            data['name'] = token.text
            reasons.append('We detected the name ' + token.text)
        elif token.head.text == 'tokens' and token.dep_ == 'nummod':
            data['amount'] = token.text
            reasons.append('We detected an amount of tokens ' + token.text)
        elif token.dep_ =='dobj':
            data[token.head.text] = token.text
            reasons.append('We detected an argument ' + token.head.text + ' with value ' + token.text)
        elif token.dep_ == 'compound':
            data[token.text] = token.head.text
            reasons.append('We detected an argument ' + token.text + ' with value ' + token.head.text)
        elif token.dep_ == 'nummod':
            data[token.head.text] = token.text
            reasons.append('We detected an argument ' + token.head.text + ' with value ' + token.text)

    has_data = len(data) > 0

    print(doc)
    # TODO: parse and understand the input text -> generate a smart contract as code. Return the contract code.
    print('data', data)
    if has_data:
        code = create_contract(**data)
    else:
        code = 'Keep typing...'
    data['code'] = code
    data['graph'] = {}

    data['reasons'] = reasons
    return data