from langchain.retrievers import ContextualCompressionRetriever
from langchain_community.vectorstores import Pinecone

# 1. They keep their existing dumb retriever but tell it to over-fetch
base_retriever = Pinecone.from_existing_index("my-index").as_retriever(search_kwargs={"k": 50})

# 2. They initialize your knapsack packer
packer = ContextPackCompressor(budget_tokens=3000, model_name="claude-3-opus-20240229")

# 3. They wrap it. Done.
smart_retriever = ContextualCompressionRetriever(
    base_compressor=packer, base_retriever=base_retriever
)

# Now, this will NEVER exceed 3,000 tokens, but will contain the densest possible facts.
docs = smart_retriever.invoke("How does the auth system work?")
