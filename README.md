# Accessize
![logo](https://github.com/ClaireBookworm/accessize/blob/main/front/logo.png?raw=true)

Find our extension code (LLM + chrome extension) code on our `extension` branch and the recursive summarization code in `main`. 

Content was scraped from WCAG guidelines (linked [here](https://www.w3.org/TR/WCAG21/#text-alternatives)) and converted into json objects & summarized as a tree. This meant summarizing the end-nodes and using that summary to work our way up. 

Our prompt for OpenAI's GPT in this case was:
```python
SUMMARIZE_PROMPT = """Write a {paragraphs} paragraph the following about accessibility guidelines into readable concise clear prose without any special character, focusing on what a developer would need to specifically implement while ignoring section titles and numbers:

Text: {text}

Summary of {paragraphs} paragraphs:"""
SUMMARIZE_PROMPT_TOKENS = len(tiktoken.get_encoding("cl100k_base").encode(SUMMARIZE_PROMPT))
```

`Tiktoken` embeddings was used in case the input was too large for the model (`davinci-003`) over 2097 tokens. The website was generated through HTML where clicks expanded down each "tree" branch. 

