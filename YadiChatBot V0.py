from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.llms import Ollama
import streamlit as st
import base64

def set_background(image_path):
    with open(image_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode()
    bg_image = f"""
    <style>
    .stApp {{
        background-image: url("data:image/png;base64,{encoded_image}");
        background-size: cover;
    }}
    </style>
    """
    st.markdown(bg_image, unsafe_allow_html=True)

set_background("C:/Users/medep/Downloads/YADIDYA CHATBOT (3).png")

st.title("Yadidya's Chat Bot")

input_txt = st.text_input("Please enter your queries here...")
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are Yadidya's AI assistant. Your name is Yad."),
    ("user", "User query: {query}")
])

llm = Ollama(model="llama2")
output_parser = StrOutputParser()

chain = prompt_template | llm | output_parser

if input_txt:
    st.write(chain.invoke({"query": input_txt}))