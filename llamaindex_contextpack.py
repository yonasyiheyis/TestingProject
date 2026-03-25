from typing import List, Optional
from llama_index.core.postprocessor.types import BaseNodePostprocessor
from llama_index.core.schema import NodeWithScore, QueryBundle
from pydantic import Field

# Import our core logic
from context_knapsack import pack_context_window

class ContextPackPostprocessor(BaseNodePostprocessor):
    """
    Filters LlamaIndex nodes to fit within a strict token budget 
    using greedy knapsack optimization.
    """
    budget_tokens: int = Field(default=2000)
    model_name: str = Field(default="gpt-4o")
    alpha_semantic: float = Field(default=0.7)
    beta_confidence: float = Field(default=0.3)

    @classmethod
    def class_name(cls) -> str:
        return "ContextPackPostprocessor"

    def _postprocess_nodes(
        self,
        nodes: List[NodeWithScore],
        query_bundle: Optional[QueryBundle] = None,
    ) -> List[NodeWithScore]:
        
        # 1. Format Nodes for Knapsack Engine
        raw_candidates = []
        for node_with_score in nodes:
            raw_candidates.append({
                "id": node_with_score.node.node_id,
                "text": node_with_score.node.get_content(),
                "semantic_score": node_with_score.score or 0.5,
                "confidence_score": node_with_score.node.metadata.get("confidence", 1.0),
            })

        # 2. Run the Knapsack algorithm
        pack_result = pack_context_window(
            raw_candidates=raw_candidates,
            budget_tokens=self.budget_tokens,
            model=self.model_name,
            alpha=self.alpha_semantic,
            beta=self.beta_confidence
        )

        # 3. Reconstruct the filtered Node list
        packed_ids = {item["id"] for item in pack_result["packed_candidates"]}
        
        # Preserve original order or sort by density? Usually, we let the LLM see 
        # highest density first, but here we just filter the original list.
        return [n for n in nodes if n.node.node_id in packed_ids]
