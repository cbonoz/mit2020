import spacy
from spacy import displacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("I want a smart contract named Ocean with 10000 tokens.")
displacy.serve(doc, style="dep")

