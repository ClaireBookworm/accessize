# import json
import re
# import struct
import openai
import tiktoken
import os
import dotenv
dotenv.load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

with open('toc.txt', 'r') as f:
  inp = f.read()

titles = []
for name in inp.split("\n"):
  titles.append(name.strip())
# print(titles)

# Dict = {}

# for title in titles:
#   Dict key = append(title.split(" ").split(".")[0])

# print(Dict)s

with open('edited.json', 'r') as f:
  data = f.read()

# blocks = str(data.values()).split("},\n{")
blocks = re.split("\W{", data)


# print (blocks[2])
#   for line in block.split("\n"):
#     print(line)
blocks = blocks[1:]
# print(blocks[0])
section = {}


def run_gpt(prompt, tokens):
    return prompt
    # response = openai.Completion.create(
    #     model="text-babbage-001",
    #     prompt=prompt,
    #     temperature=0.4,
    #     max_tokens=tokens,
    #     top_p=1.0,
    #     frequency_penalty=0.0,
    #     presence_penalty=1
    # )
    # return response.choices[0].text


def clean_block(block):
    objects = block.strip().split("\n")
    summary = {}
    title = ""
    for line in objects:
        if len(line.split("\"")) > 4:
            title = line.split("\"")[1]
            text = line.split("\"")[3]
            summary.update({title: text})

    tokenizer = tiktoken.get_encoding("cl100k_base")  # works with embedding model
    tokens = len(tokenizer.encode(summary['section_text']))
    gpt_input = ""
    output = ""
    if tokens > 2000:
       (len(summary['section_text']) / 2)
       gpt_input = summary['section_text'][:len(summary['section_text']) // 2]
       output += run_gpt("Summarize the following about accessibility guidelines into readable concise clear prose without any special character, focusing on what a developer would need to specifically implement while ignoring section titles and numbers: " + gpt_input, 150)
       gpt_input = summary['section_text'][len(summary['section_text']) // 2:]
    
    # in case the section is too long for one prompt
    output += run_gpt("Summarize the following about accessibility guidelines into readable concise clear prose without any special character, focusing on what a developer would need to specifically implement while ignoring section titles and numbers: " + gpt_input, 150)
    section.update({summary['link_name']: output})

    # print(summary['section_text'])
    if "children" in block[-30:-12]:
        print('end of branch')
    return output
#   for line in block:
    #  return (line + "NEXTLINE")


# print(blocks[0])
clean_block(blocks[0])
# clean_block(blocks[1])
# clean_block(blocks[2])
# clean_block(blocks[3])

print(section)

# for block in blocks:
#   print(block[1])
#   for word in block.split("\n"):
#     print(word[1])
# match word:


# print(blocks[1])

# print (data)
# for object in data.values():
#   print (object)
#   print("\n")


# print(data)

# response = openai.Completion.create(
#   model="text-davinci-001",
#   prompt= "summarize the following about accessibility guidelines into clear prose: " + str(blocks[3]),
#   temperature=0.7,
#   max_tokens=200,
#   top_p=1.0,
#   frequency_penalty=0.0,
#   presence_penalty=1
# )

# print(response)
