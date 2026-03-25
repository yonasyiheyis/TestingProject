from typing import List, Sequence, Optional
from langchain_core.documents import Document
from langchain_core.callbacks import Callbacks
from langchain_core.document_compressors.base import BaseDocumentCompressor
from pydantic import Field

# Import our core logic from the previous step
from context_knapsack import pack_context_window 

class ContextPackCompressor(BaseDocumentCompressor):
    """
    Greedily packs LangChain Documents into a strict token budget 
    maximizing epistemic value density.
    """
    budget_tokens: int = Field(default=2000, description="Max token footprint")
    model_name: str = Field(default="gpt-4o", description="Tokenizer to use")
    alpha_semantic: float = Field(default=0.7)
    beta_confidence: float = Field(default=0.3)

    def compress_documents(
        self,
        documents: Sequence[Document],
        query: str,
        callbacks: Optional[Callbacks] = None,
    ) -> Sequence[Document]:
        
        # 1. Format LangChain Documents for our Knapsack Engine
        raw_candidates = []
        for i, doc in enumerate(documents):
            # LangChain vector stores usually put distance/score in metadata
            score = doc.metadata.get("score", doc.metadata.get("relevance", 0.5))
            confidence = doc.metadata.get("confidence", 1.0) # For AgentDB compatibility later
            
            raw_candidates.append({
                "id": doc.metadata.get("id", str(i)),
                "text": doc.page_content,
                "semantic_score": score,
                "confidence_score": confidence,
                "original_doc": doc # Keep reference to original
            })

        # 2. Run the Knapsack algorithm
        pack_result = pack_context_window(
            raw_candidates=raw_candidates,
            budget_tokens=self.budget_tokens,
            model=self.model_name,
            alpha=self.alpha_semantic,
            beta=self.beta_confidence
        )

        # 3. Map back to LangChain Documents
        packed_docs = []
        packed_ids = {item["id"] for item in pack_result["packed_candidates"]}
        
        for doc_wrapper in raw_candidates:
            if doc_wrapper["id"] in packed_ids:
                original_doc = doc_wrapper["original_doc"]
                # Inject our density metrics for the developer's telemetry
                original_doc.metadata["contextpack_density"] = next(
                    item["density"] for item in pack_result["packed_candidates"] 
                    if item["id"] == doc_wrapper["id"]
                )
                packed_docs.append(original_doc)

        return packed_docs
