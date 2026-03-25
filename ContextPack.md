# ContextPack.io: Product & Architecture Specification
**Version:** 1.0 (Draft)
**Author:** Senior Architecture Team
**Concept:** A Context-Window Knapsack Proxy for LLM Agents

---

## 1. The Problem: Top-K Retrieval is Broken
Standard RAG (Retrieval-Augmented Generation) pipelines optimize for *relevance*, but LLM agents operate under strict *context window budgets*. 

If an agent queries a vector database using standard Top-K retrieval, it risks fetching large, verbose documents that exhaust the token limit and dilute the prompt (causing "Lost in the Middle" syndrome). Agents do not need the 5 most semantically similar documents; they need the **absolute maximum semantic value that fits within a finite token footprint**.

## 2. The Solution: ContextPack.io
ContextPack is a lightweight, tokenizer-aware proxy API sitting between a developer's Vector DB (Pinecone, Qdrant, etc.) and their LLM. 

Instead of `limit: 5`, developers pass a `budget_tokens: 4000`. ContextPack intentionally over-fetches from the vector database, calculates exact token costs, and runs a bounded 0/1 Knapsack approximation to pack the most information-dense chunks into the prompt.

### 2.1 The Value Proposition
* **Zero "Lost in the Middle" Syndrome:** Prioritizes dense, high-value facts over long, dilute documents.
* **Deterministic API Costs:** Prompts never accidentally exceed their budget due to poor chunking.
* **The "Semantic ROI" Metric:** Developers can track exactly how much "relevance density" they gain compared to naive Top-K fetches.

### 2.2 The Mathematical Core (Greedy Knapsack)
For each retrieved chunk $i$, the engine calculates its Value Density ($D_i$):

$$D_i = \frac{\alpha \cdot R_i + \beta \cdot C_i}{T_i}$$

Where:
* $R_i$ = Semantic relevance (cosine similarity)
* $C_i$ = Confidence / Recency score (optional epistemic metadata)
* $T_i$ = Exact token cost (via provider-specific tokenizer)
* $\alpha, \beta$ = Configurable weights

The engine greedily appends chunks from highest $D_i$ to lowest until adding the next chunk would exceed the token budget.

---

## 3. Architecture & Implementation (Phase 1)

**Tech Stack:**
* **Core Proxy Engine:** Go (Golang) — chosen for fast concurrency (goroutines) and low memory footprint during heavy network proxying.
* **Database (State):** PostgreSQL — for user accounts, API keys, and aggregated telemetry.
* **Cache Layer:** Redis — to cache token-counts of frequently seen chunks, avoiding redundant tokenizer overhead.

---

## 4. OpenAPI Specification: `/v1/pack`

This is the primary endpoint developers will interact with. It acts as a pass-through to their vector database but returns a token-packed payload.

```yaml
openapi: 3.0.0
info:
  title: ContextPack API
  version: 1.0.0
  description: The context-window knapsack proxy for LLM agents.
paths:
  /v1/pack:
    post:
      summary: Fetch and pack vector chunks to fit a strict token budget.
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - vector_source
                - packing_constraints
              properties:
                vector_source:
                  type: object
                  properties:
                    provider:
                      type: string
                      enum: [pinecone, qdrant, weaviate, custom]
                    index_name:
                      type: string
                    query_vector:
                      type: array
                      items:
                        type: number
                    overfetch_k:
                      type: integer
                      default: 100
                      description: "How many chunks to fetch before packing."
                packing_constraints:
                  type: object
                  properties:
                    model_tokenizer:
                      type: string
                      enum: [gpt-4o, claude-3-opus, text-embedding-3-small]
                    budget_tokens:
                      type: integer
                      description: "Strict maximum token limit for the final payload."
                    weights:
                      type: object
                      properties:
                        relevance:
                          type: number
                          default: 0.8
                        recency:
                          type: number
                          default: 0.2
      responses:
        '200':
          description: Successfully packed context bundle.
          content:
            application/json:
              schema:
                type: object
                properties:
                  packed_chunks:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                        payload:
                          type: string
                        token_cost:
                          type: integer
                        value_density:
                          type: number
                  telemetry:
                    type: object
                    properties:
                      total_tokens_used:
                        type: integer
                      budget_utilized_percent:
                        type: number
                      chunks_evaluated:
                        type: integer
                      chunks_packed:
                        type: integer
                      latency_ms:
                        type: integer
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
