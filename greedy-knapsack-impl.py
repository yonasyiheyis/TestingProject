import tiktoken
from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class Candidate:
    id: str
    text: str
    semantic_score: float
    confidence_score: float = 1.0
    token_cost: int = 0
    value_density: float = 0.0

def pack_context_window(
    raw_candidates: List[Dict[str, Any]], 
    budget_tokens: int, 
    model: str = "gpt-4o",
    alpha: float = 0.7,
    beta: float = 0.3
) -> Dict[str, Any]:
    """
    Greedily packs the highest-density context chunks into a strict token budget.
    """
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        # Fallback to standard encoding if model isn't recognized
        encoding = tiktoken.get_encoding("cl100k_base")

    processed_candidates = []
    
    # Step 1: Calculate token costs and value density
    for c in raw_candidates:
        text = c.get("text", "")
        # Calculate exact token cost
        tokens = len(encoding.encode(text))
        
        # Avoid division by zero for empty strings
        if tokens == 0:
            continue
            
        semantic = c.get("semantic_score", 0.0)
        confidence = c.get("confidence_score", 1.0)
        
        # The Secret Sauce: Epistemic Value Density
        composite_score = (alpha * semantic) + (beta * confidence)
        density = composite_score / tokens
        
        processed_candidates.append(
            Candidate(
                id=c["id"],
                text=text,
                semantic_score=semantic,
                confidence_score=confidence,
                token_cost=tokens,
                value_density=density
            )
        )

    # Step 2: Sort by density (highest value-per-token first)
    # This is the greedy approximation of the 0/1 Knapsack problem
    processed_candidates.sort(key=lambda x: x.value_density, reverse=True)

    # Step 3: Pack the Knapsack
    packed_results = []
    current_tokens = 0
    dropped_count = 0

    for candidate in processed_candidates:
        if current_tokens + candidate.token_cost <= budget_tokens:
            packed_results.append({
                "id": candidate.id,
                "text": candidate.text,
                "token_cost": candidate.token_cost,
                "density": round(candidate.value_density, 6)
            })
            current_tokens += candidate.token_cost
        else:
            # We skip it. (In a strict 0/1 greedy knapsack, we continue checking 
            # smaller items that might still fit in the remaining gap).
            dropped_count += 1

    return {
        "metrics": {
            "total_tokens_used": current_tokens,
            "budget_utilization_pct": round((current_tokens / budget_tokens) * 100, 2),
            "items_packed": len(packed_results),
            "items_dropped": dropped_count
        },
        "packed_candidates": packed_results
    }

# --- Example Usage ---
# payload = [
#     {"id": "doc1", "text": "A very long but somewhat relevant document...", "semantic_score": 0.82},
#     {"id": "doc2", "text": "Short exact match fact.", "semantic_score": 0.81, "confidence_score": 0.99}
# ]
# result = pack_context_window(payload, budget_tokens=50)
