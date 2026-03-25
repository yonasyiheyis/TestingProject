import { useState } from “react”;

// ── palette ──────────────────────────────────────────────────────────────────
const C = {
bg:       “#07070d”,
surface:  “#0d0d1a”,
panel:    “#111122”,
border:   “#1e1e38”,
dim:      “#2a2a4a”,
accent:   “#00c8ff”,
green:    “#00ff88”,
purple:   “#9d6fff”,
orange:   “#ff7b35”,
pink:     “#ff4d8f”,
gold:     “#ffd166”,
text:     “#dde0f0”,
muted:    “#606080”,
code:     “#a8ffc4”,
};

// ── tiny components ───────────────────────────────────────────────────────────
const Tag = ({ color, children }) => (
<span style={{
display: “inline-block”, padding: “2px 8px”, borderRadius: 2,
background: color + “22”, border: `1px solid ${color}55`,
color, fontSize: 11, letterSpacing: 1, fontFamily: “monospace”,
marginRight: 6, marginBottom: 4,
}}>{children}</span>
);

const SectionHeader = ({ glyph, title, sub, color }) => (

  <div style={{ marginBottom: 28 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <span style={{ fontSize: 28, color }}>{glyph}</span>
      <div>
        <div style={{ fontSize: 13, letterSpacing: 3, color, fontWeight: 900 }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  </div>
);

const Code = ({ children, lang }) => (

  <pre style={{
    background: "#050510", border: `1px solid ${C.border}`,
    borderLeft: `3px solid ${C.green}`,
    padding: "16px 20px", margin: "16px 0",
    overflowX: "auto", fontSize: 12.5, lineHeight: 1.7,
    color: C.code, fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    borderRadius: 2,
  }}>
    {lang && <div style={{ color: C.muted, fontSize: 10, marginBottom: 8, letterSpacing: 2 }}>{lang.toUpperCase()}</div>}
    {children}
  </pre>

);

const Callout = ({ icon, color, title, children }) => (

  <div style={{
    background: color + "0d", border: `1px solid ${color}33`,
    borderLeft: `3px solid ${color}`, padding: "14px 18px", margin: "16px 0",
    borderRadius: 2,
  }}>
    {title && <div style={{ fontSize: 11, letterSpacing: 2, color, marginBottom: 6, fontWeight: 700 }}>{icon} {title}</div>}
    <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{children}</div>
  </div>
);

const Divider = () => (

  <div style={{ height: 1, background: C.border, margin: "36px 0" }} />
);

const PropRow = ({ name, type, desc, color = C.accent }) => (

  <tr>
    <td style={{ padding: "10px 16px", fontFamily: "monospace", color, fontSize: 13, whiteSpace: "nowrap", verticalAlign: "top" }}>{name}</td>
    <td style={{ padding: "10px 16px", fontFamily: "monospace", color: C.purple, fontSize: 12, whiteSpace: "nowrap", verticalAlign: "top" }}>{type}</td>
    <td style={{ padding: "10px 16px", color: C.muted, fontSize: 13, lineHeight: 1.6, verticalAlign: "top" }}>{desc}</td>
  </tr>
);

// ── nav sections ─────────────────────────────────────────────────────────────
const NAV = [
{ id: “overview”,      label: “Overview”,          glyph: “◈” },
{ id: “belief-node”,   label: “Belief Node”,        glyph: “⬡” },
{ id: “storage”,       label: “Storage Engine”,     glyph: “⧗” },
{ id: “indexing”,      label: “Index Architecture”, glyph: “⊞” },
{ id: “query”,         label: “Query Execution”,    glyph: “◎” },
{ id: “tension”,       label: “Tension Engine”,     glyph: “⚡” },
{ id: “scope”,         label: “Scope Membrane”,     glyph: “◑” },
{ id: “consolidation”, label: “Consolidation Daemon”, glyph: “⊘” },
{ id: “protocol”,      label: “Wire Protocol (BIP)”, glyph: “⟁” },
{ id: “swarm”,         label: “Swarm Consensus”,    glyph: “⊕” },
{ id: “mcp”,           label: “MCP Integration”,    glyph: “⬟” },
{ id: “tradeoffs”,     label: “Trade-offs”,         glyph: “≈” },
];

// ── section content ───────────────────────────────────────────────────────────

function Overview() {
return (
<div>
<SectionHeader glyph="◈" title="IMPLEMENTATION OVERVIEW" sub="Architecture designed from agent-first principles" color={C.accent} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    AgentDB is not a retrofitted vector database. It is a new class of storage system
    where the fundamental design constraint is: <em>the primary user has a finite, precious
    context window; thinks in goals not queries; and whose "data" is a living model of the world
    with confidence weights, temporal decay, and causal lineage.</em>
  </p>

  <Callout color={C.accent} icon="◈" title="THE CORE INVERSION">
    Every existing database models <strong>the world</strong>. AgentDB models <strong>the agent's
    mind about the world</strong>. The difference is not philosophical — it dictates every data
    structure, every index, every wire protocol decision below.
  </Callout>

  <div style={{ marginTop: 28 }}>
    <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, marginBottom: 16 }}>SYSTEM TOPOLOGY</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
      {[
        { layer: "BIP Client", desc: "Agent-native wire protocol (Claude Code, swarm agents)", color: C.accent },
        { layer: "Query Planner", desc: "SeekPacket → multi-index retrieval plan", color: C.green },
        { layer: "Tension Engine", desc: "Contradiction graph, conflict surface, warning injection", color: C.pink },
        { layer: "Scope Membrane", desc: "Scope isolation, promotion controller, eviction scheduler", color: C.orange },
        { layer: "Belief Store", desc: "4-axis indexed columnar append log (core storage)", color: C.purple },
        { layer: "Consolidation Daemon", desc: "Sleep-time compaction, decay, lineage compression", color: C.gold },
        { layer: "Swarm Consensus Layer", desc: "Confidence-weighted CRDT belief merging across agents", color: C.green },
      ].map((l) => (
        <div key={l.layer} style={{
          background: C.panel, border: `1px solid ${C.border}`,
          borderTop: `2px solid ${l.color}`, padding: "16px 18px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: l.color, marginBottom: 6, letterSpacing: 1 }}>{l.layer}</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{l.desc}</div>
        </div>
      ))}
    </div>
  </div>

  <Divider />

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, marginBottom: 16 }}>LANGUAGE & RUNTIME TARGET</div>
  <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text, lineHeight: 1.8 }}>
    Written in <Tag color={C.orange}>Rust</Tag> for the storage engine and daemon.
    <Tag color={C.accent}>TypeScript</Tag> for the MCP adapter and BIP client SDK.
    No garbage collector on the hot path. Memory-mapped I/O throughout.
    Single binary deployment — no etcd, no Kafka, no external dependencies.
    Embeddable as a library or run as a standalone server.
  </p>
</div>
```

);
}

function BeliefNode() {
return (
<div>
<SectionHeader glyph="⬡" title="THE BELIEF NODE" sub="The atomic unit — not a row, not a document" color={C.purple} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    The <strong style={{ color: C.purple }}>BeliefNode</strong> is the fundamental on-disk and in-memory
    unit. It replaces the concept of a "row". Every piece of information an agent asserts is encoded
    as a belief — not raw data — meaning it carries epistemic metadata by construction,
    not as an afterthought.
  </p>

  <Code lang="rust">
```

{`// BeliefNode — on-disk binary layout (FlatBuffer schema)
// Total fixed-width header: 128 bytes
// Variable payload appended after header

struct BeliefNode {
// ── Identity ─────────────────────────────────────────
id:              u128,          // UUID v7 (time-ordered, globally unique)
agent_id:        u64,           // hash of agent identity fingerprint
session_id:      u64,           // session this belief was born in

```
// ── Epistemic fields ──────────────────────────────────
confidence:      f32,           // [0.0, 1.0] — certainty weight
decay_fn:        DecayFn,       // enum: NONE | LINEAR | EXPONENTIAL | STEP
half_life_secs:  u32,           // 0 = immortal, >0 = decays over time

// ── Temporal mesh ─────────────────────────────────────
believed_at:     i64,           // unix nanoseconds — when agent first held this
verified_at:     i64,           // 0 = unverified; populated by verify() call
last_accessed:   i64,           // updated on every seek() that returns this node
superseded_by:   u128,          // 0 = current; ptr to replacement belief if stale

// ── Scope ─────────────────────────────────────────────
scope:           ScopeMask,     // bitfield: EPHEMERAL|SESSION|PROJECT|IDENTITY|SWARM
scope_promoted:  bool,          // was this promoted from a narrower scope?

// ── Provenance ────────────────────────────────────────
source_tool:     u32,           // intern-table index → tool name string
derived_from:    [u128; 8],     // up to 8 parent belief IDs (zero-padded)
derivation_depth: u8,           // how many inference hops from ground truth

// ── Vector ────────────────────────────────────────────
embedding_dim:   u16,           // typically 1536 or 3072
embedding_ptr:   u64,           // offset into vector segment file

// ── Payload ───────────────────────────────────────────
payload_encoding: PayloadEnc,   // enum: UTF8 | MSGPACK | BSON | RAW
payload_len:     u32,
payload_ptr:     u64,           // offset into payload segment file

// ── Tension tracking ─────────────────────────────────
tension_ids:     [u128; 4],     // up to 4 known contradicting belief IDs
tension_count:   u8,            // number of active tensions
```

}`}
</Code>

```
  <Callout color={C.purple} icon="⬡" title="WHY UUID v7">
    UUID v7 is time-ordered. This means beliefs are physically laid out on disk in temporal
    order by default — recent beliefs are spatially close. This is not incidental: it means
    recency-ranked scans are sequential reads, not random I/O.
  </Callout>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>DECAY FUNCTIONS</div>
  <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text, lineHeight: 1.8, maxWidth: 700 }}>
    Confidence is not static. Every belief has a decay function applied by the consolidation
    daemon during sleep cycles. The effective confidence at query time is:
  </p>
  <Code lang="math">
```

{`effective_confidence(t) = match decay_fn { NONE        => base_confidence, LINEAR      => base_confidence * max(0, 1 - (t - believed_at) / half_life_secs), EXPONENTIAL => base_confidence * exp(-λ * (t - believed_at)) where λ = ln(2) / half_life_secs, STEP        => if (t - believed_at) > half_life_secs { 0.0 } else { base_confidence } }`}
</Code>

```
  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>BELIEF PAYLOAD TYPES</div>
  <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text, lineHeight: 1.8 }}>
    Payloads are schema-free. The agent asserts any structured or unstructured data.
    The DB tracks shape statistically using a lightweight <Tag color={C.gold}>Shape Registry</Tag> —
    a count-min sketch over field name hashes — which allows "fuzzy schema" queries like
    <code style={{ color: C.code, marginLeft: 6 }}>seek(facts_that_have_shape_like: "file path + line number")</code>.
  </p>

  <Code lang="examples">
```

{`// All valid assert() calls — the payload type is inferred, not declared:

db.assert(“The main function is in src/main.rs line 42”, confidence: 0.95, source: “file_read”)
db.assert({ file: “src/auth.rs”, bug: “null deref on line 88”, severity: “high” }, confidence: 0.99)
db.assert(binary_blob, confidence: 0.7, encoding: RAW)
db.assert(“User prefers tabs over spaces”, confidence: 0.6, decay: EXPONENTIAL, half_life: 7d)`}
</Code>
</div>
);
}

function StorageEngine() {
return (
<div>
<SectionHeader glyph="⧗" title="STORAGE ENGINE" sub="Belief Log — a new physical format" color={C.green} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    AgentDB uses neither B-tree (optimized for human range queries) nor vanilla LSM-tree
    (optimized for write throughput with human-shaped compaction). It introduces the
    <strong style={{ color: C.green }}> Belief Log</strong> — a segmented append-only format
    where compaction is driven by <em>epistemic value</em>, not just recency or size.
  </p>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>PHYSICAL FILE LAYOUT</div>
  <Code lang="filesystem">
```

{`agentdb/ ├── meta.bdb              # DB-wide metadata: agent registry, scope map, shape registry ├── segments/ │   ├── ephemeral/        # memory-mapped tmpfs — auto-evicted on session close │   │   └── sess_{id}.blg  # belief log segment, one per session │   ├── session/ │   │   └── {session_id}.blg │   ├── project/ │   │   └── {project_id}.blg │   ├── identity/ │   │   └── {agent_id}.blg │   └── swarm/ │       └── {swarm_id}.blg ├── vectors/ │   └── {scope}/{segment_id}.vec  # raw float32 embeddings, memory-mapped ├── index/ │   ├── hnsw_{scope}.idx          # HNSW graph per scope (USearch-compatible format) │   ├── temporal_{scope}.tix      # B-tree on believed_at for time-range queries │   ├── confidence_{scope}.cix    # skip-list on confidence for threshold queries │   └── tension.tgraph            # adjacency list of contradicting belief pairs ├── lineage/ │   └── provenance.dag            # compressed DAG of derivation relationships └── wal/ └── write_ahead.wal           # crash recovery — replayed on startup`}
</Code>

```
  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>BELIEF LOG SEGMENT FORMAT (.blg)</div>
  <Code lang="binary layout">
```

{`// Each .blg file is a memory-mapped append log
// Header: 4KB fixed, page-aligned
// Body: sequential BeliefNode structs + variable payload region

[SEGMENT HEADER — 4096 bytes]
magic:           0xBDB10DB1        // “belief db” magic
version:         u16
scope:           ScopeMask
agent_id:        u64
created_at:      i64
belief_count:    u64
payload_offset:  u64              // byte offset where payload region begins
vector_segment:  path[256]        // path to companion .vec file
checksum:        u64              // xxHash3 over header

[BELIEF REGION — sequential BeliefNode structs, each 128 bytes]
belief[0] … belief[N]

[PAYLOAD REGION — variable length blobs, pointer-addressed]
payload[0] … payload[N]`}
</Code>

```
  <Callout color={C.green} icon="⧗" title="EPISTEMIC COMPACTION">
    Standard LSM compaction merges files by size/age. AgentDB compaction is driven by
    <strong> epistemic value density</strong>: a segment's value score is
    Σ(effective_confidence × access_frequency) / byte_count. Segments below a threshold are
    candidates for consolidation. Contradicted beliefs are tombstoned, not deleted — their
    ghost remains for provenance.
  </Callout>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>WRITE PATH</div>
  <Code lang="sequence">
```

{`Agent calls assert(payload, confidence, source, scope, decay)

1. Generate UUID v7 (time-ordered)
1. Embed payload → float32[1536] via local embedding model (or pass pre-computed)
1. Write to WAL (crash safety)
1. Append BeliefNode to active scope segment (O(1) append)
1. Append payload to payload region
1. Append embedding to .vec file
1. Insert into in-memory HNSW buffer (flushed to disk index during consolidation)
1. Insert into tension candidate queue (async, non-blocking)
1. Update shape registry count-min sketch
1. ACK to agent — total latency target: < 2ms for local scope, < 10ms for swarm scope`}
   </Code>
   
     <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>READ PATH (SEEK)</div>
     <Code lang="sequence">

{`Agent sends SeekPacket { goal_embedding, budget_tokens, scope_mask, min_confidence, session_ctx }

1. Query planner decomposes into 4 sub-queries (one per active index)
1. HNSW ANN search → top-K candidates by semantic proximity
1. Temporal index scan → candidates within recency window
1. Confidence index filter → candidates above min_confidence
1. Scope filter → candidates within declared scope_mask
1. Merge candidates, score by: α·semantic + β·confidence + γ·recency + δ·access_freq
   (α, β, γ, δ are tunable; default: 0.45, 0.30, 0.15, 0.10)
1. Check tension graph — inject TensionWarnings for disputed candidates
1. Token packer: greedily select highest-scoring beliefs until budget_tokens exhausted
1. Return BeliefBundle`}
   </Code>
   
    </div>

);
}

function IndexArchitecture() {
return (
<div>
<SectionHeader glyph="⊞" title="INDEX ARCHITECTURE" sub="Four simultaneous axes — no single index dominates" color={C.orange} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    Human databases optimize for one primary index (usually a primary key or B-tree).
    AgentDB maintains <strong>four live indexes</strong> simultaneously because agent retrieval
    is always multi-dimensional — relevant, recent, confident, and in-scope facts are
    not the same set.
  </p>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, margin: "24px 0" }}>
    {[
      {
        name: "Semantic Index", color: C.accent,
        impl: "HNSW (USearch-compatible)", axis: "Goal proximity",
        detail: "Memory-resident upper layers, disk-resident lower layer via memory-mapped LSM (LSM-VEC pattern). Per-scope graph — no cross-scope semantic bleed. Updated lazily: in-memory buffer flushed during consolidation. M=16, ef_construction=128, cosine distance.",
      },
      {
        name: "Temporal Index", color: C.green,
        impl: "Fractional cascading B-tree", axis: "Recency",
        detail: "Indexed on believed_at (nanoseconds). Supports half-open range queries: 'facts believed in the last N seconds'. Fractional cascading allows O(log n + k) multi-range queries. Used to prioritize recent beliefs during scoring.",
      },
      {
        name: "Confidence Index", color: C.purple,
        impl: "Skip list (lock-free)", axis: "Certainty threshold",
        detail: "Lock-free concurrent skip list keyed on effective_confidence. Supports threshold queries: 'beliefs with confidence ≥ 0.7'. Updated in-place as decay is applied — confidence is mutable over time, unlike other fields.",
      },
      {
        name: "Scope Index", color: C.orange,
        impl: "Bitmask partition + Roaring Bitmap", axis: "Isolation boundary",
        detail: "Each scope level is a Roaring Bitmap of belief IDs. Set intersection is O(n/64) via SIMD. Scope queries are always a bitwise AND before semantic search — cheapest filter first, most expensive (HNSW) last.",
      },
    ].map((idx) => (
      <div key={idx.name} style={{ background: C.panel, border: `1px solid ${C.border}`, borderTop: `3px solid ${idx.color}`, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: idx.color, letterSpacing: 1, marginBottom: 6 }}>{idx.name}</div>
        <div style={{ marginBottom: 8 }}>
          <Tag color={idx.color}>{idx.impl}</Tag>
          <Tag color={C.muted}>axis: {idx.axis}</Tag>
        </div>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>{idx.detail}</div>
      </div>
    ))}
  </div>

  <Callout color={C.orange} icon="⊞" title="QUERY FUSION — THE NOVEL PART">
    Standard multi-index DBs run indexes independently and intersect results.
    AgentDB uses <strong>Confidence-Weighted HNSW Fusion</strong>: before the semantic search,
    the query embedding is <em>modulated</em> by the agent's current confidence state —
    beliefs the agent has recently relied on get a proximity boost, beliefs involved in
    active tensions get a penalty. The HNSW graph is not static; it is warped by epistemic state.
  </Callout>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>SHAPE REGISTRY (the schema-free schema)</div>
  <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text, lineHeight: 1.8, maxWidth: 700 }}>
    Since AgentDB has no DDL, it tracks payload shapes probabilistically using a
    <Tag color={C.gold}>Count-Min Sketch</Tag> over field name hashes per scope.
    This enables "fuzzy schema" matching: the agent can seek beliefs that
    <em> structurally resemble</em> a target shape without knowing exact field names.
    Shape similarity is a Jaccard estimate over the sketch fingerprints.
  </p>
  <Code lang="rust">
```

{`struct ShapeRegistry {
sketch: CountMinSketch<FieldHash>,    // frequency table of field names
shape_fingerprints: HashMap<u64, ShapeBloom>,  // bloom filter per observed shape
top_k: TopKTracker<ShapeName>,        // most common shapes for diagnostics
}

// Usage: when agent seeks facts about “a code location”
// ShapeRegistry returns: beliefs containing {file, line}, {path, lineno}, {src, loc} etc.
// without the agent needing to know which shape was used when beliefs were stored`}
</Code>
</div>
);
}

function QueryExecution() {
return (
<div>
<SectionHeader glyph="◎" title="QUERY EXECUTION" sub="SeekPacket → BeliefBundle — no SQL, no query parser" color={C.accent} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    There is no query language. The agent sends a <strong style={{ color: C.accent }}>SeekPacket</strong> —
    a structured intent declaration. The query planner translates intent into a multi-index
    retrieval plan. The result is a <strong style={{ color: C.accent }}>BeliefBundle</strong> —
    a token-aware ranked payload, not a result set.
  </p>

  <Code lang="rust">
```

{`// SeekPacket — what the agent sends
struct SeekPacket {
// Required
goal_embedding:    Vec<f32>,       // what the agent is about to do, embedded
budget_tokens:     u32,            // max tokens the agent can receive back

```
// Optional filters
scope_mask:        ScopeMask,      // which scopes to search (default: all accessible)
min_confidence:    f32,            // threshold (default: 0.3)
max_tension_risk:  f32,            // reject candidates with tension score above this
recency_window:    Option<Duration>, // limit to beliefs from last N seconds

// Scoring weights (override defaults)
weights: Option<ScoringWeights>,  // { semantic, confidence, recency, access_freq }

// Context hint
session_context:   Vec<u128>,      // IDs of beliefs already in agent's context window
                                   // → used to avoid re-fetching known beliefs
```

}`}
</Code>

```
  <Code lang="rust">
```

{`// BeliefBundle — what comes back
struct BeliefBundle {
beliefs:         Vec<RankedBelief>,   // ordered by composite score, high→low
total_tokens:    u32,                 // actual token count of payload
budget_used:     f32,                 // fraction of budget consumed (0.0–1.0)

```
// Tension report
tensions:        Vec<TensionWarning>, // any active contradictions in returned beliefs
tension_count:   u8,

// Meta
search_latency_us: u64,
scope_coverage:  ScopeMask,           // which scopes were actually searched
beliefs_scanned: u64,                 // total candidates before filtering
```

}

struct RankedBelief {
node:            BeliefNode,
composite_score: f32,                 // final ranking score
score_breakdown: ScoreBreakdown,      // { semantic, confidence, recency, access } components
payload:         DecodedPayload,      // decoded string / struct / bytes
token_cost:      u16,                 // approx tokens this belief consumes in context
}`}
</Code>

```
  <Callout color={C.accent} icon="◎" title="TOKEN PACKER — THE BUDGET ENGINE">
    The token packer is a variant of the <strong>0/1 Knapsack problem</strong> with a
    greedy approximation (sorted by score/token_cost ratio, greedy-select until budget exhausted).
    It is aware of token cost of each belief's payload, provenance summary, and tension warnings.
    The agent declares a budget; the DB fills it optimally. No existing DB does this.
  </Callout>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>QUERY PLANNER — EXECUTION PLAN</div>
  <Code lang="pseudocode">
```

{`fn plan_seek(packet: SeekPacket) -> ExecutionPlan {

// Phase 1: Cheapest filters first (bit ops)
let scope_candidates = scope_index.roaring_and(packet.scope_mask);  // O(n/64)

// Phase 2: Confidence threshold (skip list scan)
let conf_candidates = confidence_index.range(packet.min_confidence, 1.0)
.intersect(scope_candidates);                // O(log n)

// Phase 3: Recency window (B-tree range)
let time_candidates = match packet.recency_window {
Some(w) => temporal_index.range(now() - w, now())
.intersect(conf_candidates),
None    => conf_candidates,
};

// Phase 4: Semantic ANN (most expensive — smallest candidate set by now)
let semantic_candidates = hnsw_index
.search(modulate(packet.goal_embedding, epistemic_state), k=200)
.filter(|id| time_candidates.contains(id));

// Phase 5: Score, tension-check, token-pack
score_and_pack(semantic_candidates, packet)
}`}
</Code>

```
  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>THE THREE WRITE PRIMITIVES</div>
  <Code lang="rust">
```

{`// 1. ASSERT — store a new belief
db.assert(AssertPacket {
payload:      “Found memory leak in parser.rs:214”,
confidence:   0.98,
source_tool:  “static_analyzer”,
scope:        SESSION,
decay_fn:     NONE,              // this is a hard fact, doesn’t decay
derived_from: vec![belief_id_x], // caused by a prior analysis belief
});

// 2. FORGET — decay or tombstone beliefs
db.forget(ForgetPacket {
scope:      PROJECT,
selector:   Selector::ByTool(“stale_linter”),  // forget all from this tool
strategy:   ForgetStrategy::Decay { half_life: Duration::hours(1) },
});

// 3. VERIFY — elevate confidence with external confirmation
db.verify(belief_id, VerifyPacket {
source:       “human_confirmation”,
new_confidence: 1.0,
verified_at:  now(),
});`}
</Code>
</div>
);
}

function TensionEngine() {
return (
<div>
<SectionHeader glyph="⚡" title="TENSION ENGINE" sub="Contradiction as a first-class state" color={C.pink} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    When two beliefs contradict each other, AgentDB does not overwrite or raise an error.
    It enters a <strong style={{ color: C.pink }}>Tension State</strong> — both beliefs coexist,
    both are retrievable, and the engine tracks the contradiction in a dedicated graph.
    Before any seek() returns beliefs involved in a tension, it injects a
    <strong style={{ color: C.pink }}> TensionWarning</strong> into the bundle.
  </p>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>TENSION DETECTION</div>
  <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text, lineHeight: 1.8, maxWidth: 700 }}>
    New beliefs entering the store are run through the tension detector asynchronously.
    Detection uses three signals in combination:
  </p>

  <Code lang="rust">
```

{`fn detect_tensions(new_belief: &BeliefNode) -> Vec<TensionEdge> {
let mut tensions = vec![];

```
// Signal 1: Semantic negation proximity
// Negate the embedding (reflect across origin) and find nearest neighbors.
// If cosine_similarity(−new_embedding, existing_embedding) > 0.82, flag as potential tension.
let negated = negate_embedding(&new_belief.embedding);
let near_opposites = hnsw_index.search(negated, k=20);

for candidate in near_opposites {
    // Signal 2: Payload-level conflict check (LLM micro-call: < 100 tokens)
    // Only fired for high-confidence pairs to avoid cost explosion
    if candidate.confidence > 0.6 && new_belief.confidence > 0.6 {
        let conflict_score = check_semantic_conflict(new_belief, candidate);  // 0.0–1.0
        if conflict_score > 0.75 {
            tensions.push(TensionEdge {
                belief_a: new_belief.id,
                belief_b: candidate.id,
                conflict_score,
                detected_at: now(),
                resolved: false,
                resolution: TensionResolution::Pending,
            });
        }
    }
}
tensions
```

}`}
</Code>

```
  <Callout color={C.pink} icon="⚡" title="THE MICRO-CALL ARCHITECTURE">
    Tension detection for high-confidence pairs uses a lightweight LLM call (same Claude API,
    system-prompt-scoped to pure binary conflict judgment, &lt;100 tokens).
    This is the <em>only</em> place AgentDB calls an LLM. It is bounded, async, and optional —
    if the micro-call budget is exhausted, tension detection falls back to semantic-negation only.
  </Callout>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>TENSION GRAPH STRUCTURE</div>
  <Code lang="rust">
```

{`// tension.tgraph — adjacency list stored as sorted edge pairs
struct TensionGraph {
edges:    BTreeMap<(BeliefId, BeliefId), TensionEdge>,
by_node:  HashMap<BeliefId, Vec<BeliefId>>,   // fast lookup: who contradicts belief X?
pending:  VecDeque<TensionEdge>,               // unresolved, FIFO for consolidation
resolved: Vec<TensionEdge>,                    // archive — never deleted
}

struct TensionEdge {
belief_a:       u128,
belief_b:       u128,
conflict_score: f32,
detected_at:    i64,
resolved:       bool,
resolution:     TensionResolution,
resolved_at:    Option<i64>,
winner:         Option<u128>,           // which belief was kept as authoritative
}

enum TensionResolution {
Pending,
PreferRecent,      // more recent belief wins
PreferVerified,    // verified belief wins over unverified
PreferSourceQuality(f32),  // source trust score decides
HumanOverride(AgentId),    // explicit agent resolution
Deferred,          // keep both, surface to agent on every access
}`}
</Code>

```
  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>TENSION WARNING INJECTION</div>
  <Code lang="rust">
```

{`// Injected into every BeliefBundle where returned beliefs have active tensions
struct TensionWarning {
belief_id:          u128,
contradicted_by:    u128,
conflict_score:     f32,
resolution_status:  TensionResolution,
recommendation:     String,  // e.g. “Prefer belief_b: verified at T+120s, higher confidence”
}

// Example warning text injected into bundle:
// “⚡ TENSION: belief[auth-bug-present] (confidence 0.91) contradicts
//  belief[auth-refactored-clean] (confidence 0.88, verified 3m ago).
//  Recommended resolution: PreferVerified → belief[auth-refactored-clean].
//  Both beliefs returned. Resolve before acting on either.”`}
</Code>
</div>
);
}

function ScopeMembrane() {
return (
<div>
<SectionHeader glyph="◑" title="SCOPE MEMBRANE" sub="Five isolation levels — data flows upward only by deliberate promotion" color={C.orange} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    Every belief exists at exactly one scope level. Scopes are concentric: a belief
    at PROJECT scope is accessible from SESSION and IDENTITY scope reads by default,
    but a belief at SESSION scope is never accessible from a different session.
    There is no ambient namespace pollution.
  </p>

  <div style={{ display: "flex", flexDirection: "column", gap: 2, margin: "24px 0" }}>
    {[
      { scope: "EPHEMERAL", bit: "0b00001", color: C.muted, lifetime: "One tool call", storage: "Memory-mapped tmpfs", promote: "SESSION", desc: "Scratch space for intermediate computations. Auto-evicted when the tool call completes. The vast majority of working data lives here. Cost: near-zero." },
      { scope: "SESSION", bit: "0b00010", color: C.green, lifetime: "Until context window closes", storage: "In-process memory + segment flush on close", promote: "PROJECT", desc: "Working memory for the current agent session. Persisted to disk on session close if not explicitly discarded. Readable by all tool calls within the session." },
      { scope: "PROJECT", bit: "0b00100", color: C.accent, lifetime: "Until project is archived", storage: "Persisted .blg segment", promote: "IDENTITY", desc: "Shared facts about the current codebase / task. Multiple sessions can read. Cross-session learning lands here after explicit promotion." },
      { scope: "IDENTITY", bit: "0b01000", color: C.purple, lifetime: "Agent's lifetime", storage: "Persisted, identity-keyed segment", promote: "SWARM", desc: "The agent's persistent world model. Preferences, learned patterns, long-term beliefs. Follows the agent across all projects and sessions." },
      { scope: "SWARM", bit: "0b10000", color: C.pink, lifetime: "Until consensus expires", storage: "Distributed consensus segment", promote: "N/A", desc: "Shared across concurrent agent instances. Uses confidence-weighted CRDT merging. Beliefs here require consensus vote before promotion to any individual IDENTITY scope." },
    ].map((s) => (
      <div key={s.scope} style={{ background: C.panel, border: `1px solid ${C.border}`, borderLeft: `4px solid ${s.color}`, padding: "18px 22px", display: "grid", gridTemplateColumns: "140px 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.scope}</div>
          <Tag color={s.color}>{s.bit}</Tag>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>lifetime</div>
          <div style={{ fontSize: 12, color: C.text }}>{s.lifetime}</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>promotes→</div>
          <div style={{ fontSize: 12, color: s.color }}>{s.promote}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>storage: {s.storage}</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{s.desc}</div>
        </div>
      </div>
    ))}
  </div>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>PROMOTION PROTOCOL</div>
  <Code lang="rust">
```

{`// Promoting a belief upscopes it — the original remains at its scope as a shadow
// Promotion is always explicit, never automatic.

db.promote(PromotePacket {
belief_id:  session_belief_id,
from_scope: SESSION,
to_scope:   PROJECT,
reason:     “This learning applies to all sessions on this repo”,
confidence_adjustment: None,   // keep original confidence, or override
});

// What actually happens:
// 1. BeliefNode copied to PROJECT segment with new UUID v7
// 2. Original SESSION belief updated: scope_promoted = true, superseded_by = new_project_id
// 3. Provenance chain preserved: new belief’s derived_from includes original ID
// 4. HNSW index updated for PROJECT scope
// 5. Original belief remains readable (not deleted) — provides audit trail`}
</Code>
</div>
);
}

function ConsolidationDaemon() {
return (
<div>
<SectionHeader glyph="⊘" title="CONSOLIDATION DAEMON" sub="The DB improves while the agent rests" color={C.gold} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    Between active sessions, AgentDB runs a background daemon that performs
    <strong style={{ color: C.gold }}> epistemic housekeeping</strong>. This is not
    standard LSM compaction. It is a multi-pass process that improves the quality of
    stored beliefs, not just the physical layout of storage.
  </p>

  <Code lang="rust">
```

{`// Consolidation daemon — runs when no active sessions hold locks
// Triggered by: session close, explicit flush(), or idle timer (default: 30s)

async fn consolidation_pass(db: &mut BeliefStore, scope: ScopeMask) {

```
// PASS 1: Decay application
// Apply decay functions to all beliefs — update effective_confidence in-place
// Beliefs that decay below TOMBSTONE_THRESHOLD (default: 0.05) are marked stale
apply_decay_pass(db, scope).await;

// PASS 2: Redundancy collapse
// Find belief pairs with cosine_similarity > 0.95 AND same source_tool
// Merge into single belief: confidence = weighted_avg, payload = most_recent
// Both originals preserved as ghost nodes (stale=true, superseded_by=merged_id)
redundancy_collapse_pass(db, scope).await;

// PASS 3: Tension resolution attempts
// For each pending tension edge:
//   - If one belief is verified and the other is not → PreferVerified
//   - If confidence gap > 0.3 → prefer higher confidence
//   - If age gap > 1 hour → prefer more recent
//   - Else → Deferred (keep both, remain in tension)
tension_resolution_pass(db, scope).await;

// PASS 4: Lineage compression
// Provenance chains > 8 hops are compressed: intermediate nodes summarized
// into a single "reasoning summary" node. Original hops preserved but
// moved to cold storage (lineage archive).
lineage_compression_pass(db, scope).await;

// PASS 5: HNSW index rebuild (incremental)
// Flush in-memory HNSW buffer to disk, rebuild affected graph layers
// Only for scopes with > N new beliefs since last rebuild
incremental_hnsw_rebuild(db, scope).await;

// PASS 6: Epistemic compaction
// Compute value_density per segment. Segments below threshold merged.
// Ghost nodes (stale, low-confidence, superseded) compacted to cold archive.
epistemic_compaction_pass(db, scope).await;
```

}`}
</Code>

```
  <Callout color={C.gold} icon="⊘" title="FORGETTING IS SACRED">
    The history of what was forgotten is itself stored. Every tombstoned belief moves to
    the <strong>Forgetting Archive</strong> — a compressed, write-once store of
    stale beliefs. The archive is queryable: the agent can ask
    <code style={{ color: C.code, marginLeft: 6 }}>what did I used to believe about X?</code>
    This is not nostalgia — forgotten beliefs reveal reasoning patterns, past errors,
    and the evolution of the agent's world model.
  </Callout>

  <Code lang="rust">
```

{`// Forgetting Archive — cold storage for deprecated beliefs
// Stored in lineage/forgetting_archive.fba (custom columnar format)
// Append-only, never compacted, never deleted

struct ForgettingRecord {
original_belief: BeliefNode,     // full copy of the forgotten belief
forgotten_at:    i64,
reason:          ForgottenReason, // DECAYED | SUPERSEDED | CONTRADICTED | EXPLICIT_FORGET
replaced_by:     Option<u128>,    // belief that superseded this one
session_context: u64,             // which session was active when this was forgotten
}

// Query interface:
db.recall_forgotten(RecallPacket {
about_topic:    topic_embedding,
reason_filter:  Some(ForgottenReason::CONTRADICTED),
time_range:     last_week(),
})`}
</Code>
</div>
);
}

function WireProtocol() {
return (
<div>
<SectionHeader glyph="⟁" title="WIRE PROTOCOL — BIP" sub="Belief Interchange Protocol: binary, flat, agent-native" color={C.accent} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    AgentDB communicates over <strong style={{ color: C.accent }}>BIP (Belief Interchange Protocol)</strong>
    — a binary protocol built on FlatBuffers with a three-message vocabulary.
    No SQL parser. No HTTP overhead. No JSON marshaling on the hot path.
    The MCP adapter translates BIP into tool-call format for Claude Code.
  </p>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>MESSAGE TYPES</div>
  <Code lang="flatbuffers schema">
```

{`// BIP message framing
// [ 4 bytes magic: 0x42495001 ] [ 1 byte type ] [ 4 bytes length ] [ payload ]

enum BIPMessageType : byte {
ASSERT  = 0x01,    // Store a new belief
SEEK    = 0x02,    // Retrieve beliefs by intent
FORGET  = 0x03,    // Decay / tombstone beliefs
VERIFY  = 0x04,    // Elevate confidence with confirmation
PROMOTE = 0x05,    // Move belief to wider scope
STATUS  = 0x06,    // DB health, tension count, budget stats
SYNC    = 0x07,    // Swarm sync request (multi-agent)
}

// All messages use FlatBuffers for zero-copy deserialization.
// No allocation required to read any fixed-width field.
// Variable fields (embeddings, payloads) are accessed via offset pointers.`}
</Code>

```
  <Code lang="transport">
```

{`// Transport options (in priority order for different deployment contexts):

1. Unix domain socket  — for co-located agent + DB (Claude Code local)
   latency target: < 0.5ms round-trip for EPHEMERAL scope ops
1. TCP + TLS           — for remote or containerized deployment
   latency target: < 5ms on LAN, < 50ms on WAN
1. In-process FFI      — when DB is embedded as Rust library
   latency target: < 0.1ms (direct function call, no serialization)
1. MCP tool adapter    — translates BIP to/from Claude tool-call JSON
   latency target: < 10ms (JSON overhead is the bottleneck)`}
   </Code>
   
      <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>CONNECTION LIFECYCLE</div>
      <Code lang="sequence">

{`// BIP session handshake

1. Client sends HELLO { agent_id, session_id, scope_permissions, token_budget_hint }
1. Server responds with SESSION_ACK { session_token, available_scopes, db_version }
1. Client uses session_token in all subsequent messages

// Session types:
EPHEMERAL_SESSION — no persistence, auto-close on disconnect, all writes to tmpfs
STANDARD_SESSION  — normal session with full scope access
READONLY_SESSION  — no writes, useful for audit/inspection agents
SWARM_SESSION     — participates in consensus protocol, can write to SWARM scope`}
</Code>

```
  <Callout color={C.accent} icon="⟁" title="BACKPRESSURE PROTOCOL">
    BIP includes a native <strong>backpressure signal</strong>: if the agent is writing
    beliefs faster than the consolidation daemon can process tensions, the server sends
    a <code style={{ color: C.code }}>SLOW_DOWN</code> hint with a recommended delay.
    Agents that respect backpressure get priority in SEEK scheduling.
    This prevents tension graph explosion in high-throughput swarm scenarios.
  </Callout>
</div>
```

);
}

function SwarmConsensus() {
return (
<div>
<SectionHeader glyph="⊕" title="SWARM CONSENSUS" sub="Belief merging across concurrent agents — no external coordinator" color={C.green} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    When multiple agents write to SWARM scope simultaneously, AgentDB uses a novel
    <strong style={{ color: C.green }}> Confidence-Weighted Belief CRDT</strong> — a new
    CRDT designed specifically for epistemic data. Unlike standard CRDTs that merge by
    last-write-wins or set-union, this CRDT merges by confidence-weighted evidence accumulation.
  </p>

  <Code lang="rust">
```

{`// Confidence-Weighted Belief CRDT (CWB-CRDT)
// Novel: merge function uses epistemic weight, not timestamp or set semantics

struct BeliefCRDT {
belief_id:     u128,
// Evidence vector: one entry per agent that has asserted this belief
evidence:      HashMap<AgentId, EvidenceRecord>,
}

struct EvidenceRecord {
agent_id:      u64,
confidence:    f32,
source_quality: f32,   // trust score of agent’s source tool (0.0–1.0)
asserted_at:   i64,
payload_hash:  u64,    // for detecting payload divergence
}

// Merge function — COMMUTATIVE, ASSOCIATIVE, IDEMPOTENT
fn merge(a: &BeliefCRDT, b: &BeliefCRDT) -> BeliefCRDT {
let mut merged = a.clone();
for (agent_id, record_b) in &b.evidence {
merged.evidence
.entry(*agent_id)
.and_modify(|record_a| {
// Take the higher-weighted evidence per agent
// (same agent can’t make a belief more confident by repeating it)
if epistemic_weight(record_b) > epistemic_weight(record_a) {
*record_a = *record_b;
}
})
.or_insert(*record_b);
}
merged
}

fn epistemic_weight(r: &EvidenceRecord) -> f32 {
r.confidence * r.source_quality * recency_factor(r.asserted_at)
}

// Consensus confidence: weighted average of all agent evidence
fn consensus_confidence(crdt: &BeliefCRDT) -> f32 {
let weights: Vec<f32> = crdt.evidence.values().map(epistemic_weight).collect();
let confidences: Vec<f32> = crdt.evidence.values().map(|r| r.confidence).collect();
weighted_average(&confidences, &weights)
}`}
</Code>

```
  <Callout color={C.green} icon="⊕" title="WHY THIS IS NOT STANDARD CRDT">
    Standard CRDTs resolve concurrent updates with deterministic merge functions (max,
    set-union, etc.) because they operate on values without semantics. CWB-CRDT operates
    on <em>beliefs</em> — values with attached confidence and source quality.
    The merge function is therefore <strong>epistemically informed</strong>:
    a low-confidence assertion from a weak source cannot overwrite a high-confidence
    verified assertion, even if it arrived later. This is Strong Epistemic Consistency,
    not just Strong Eventual Consistency.
  </Callout>

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>SWARM SYNC PROTOCOL</div>
  <Code lang="sequence">
```

{`// Agents sync SWARM scope beliefs via gossip + CRDT merge
// No central coordinator — each agent is a peer

1. Every N seconds (default: 5s), agent sends SYNC message to known peers:
   SYNC { agent_id, swarm_id, belief_vector_clock, delta_beliefs[] }
1. Peer receives SYNC, computes delta (what it has that sender doesn’t)
   Returns SYNC_ACK { delta_beliefs[] }
1. Both sides merge deltas using CWB-CRDT merge function
1. After merge, run tension detection on newly-received beliefs
   → any new tensions added to local tension graph
1. Beliefs reaching consensus_confidence > SWARM_PROMOTE_THRESHOLD (default: 0.85)
   are automatically promoted to all participating agents’ IDENTITY scope

// Vector clock tracks which beliefs each agent has seen:
// Allows O(delta) sync — only unseen beliefs are transmitted`}
</Code>
</div>
);
}

function MCPIntegration() {
return (
<div>
<SectionHeader glyph="⬟" title="MCP INTEGRATION" sub="Claude Code speaks BIP natively via MCP adapter" color={C.purple} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    The MCP adapter exposes AgentDB's three core operations as MCP tools.
    Claude Code (and any MCP-compatible agent) can use AgentDB without knowing
    BIP exists — the adapter handles protocol translation transparently.
  </p>

  <Code lang="json (mcp tool definitions)">
```

{`// .mcp.json — AgentDB tool definitions for Claude Code

{
“tools”: [
{
“name”: “agentdb_assert”,
“description”: “Store a belief. Use whenever you learn something that may be useful later in this session, project, or across sessions. Specify scope: EPHEMERAL for scratch, SESSION for this conversation, PROJECT for this codebase.”,
“input_schema”: {
“payload”:    { “type”: “string”, “description”: “The fact or observation” },
“confidence”: { “type”: “number”, “minimum”: 0, “maximum”: 1 },
“scope”:      { “type”: “string”, “enum”: [“EPHEMERAL”, “SESSION”, “PROJECT”, “IDENTITY”] },
“source”:     { “type”: “string”, “description”: “Tool or method that produced this” },
“decay”:      { “type”: “string”, “enum”: [“NONE”, “EXPONENTIAL”, “LINEAR”], “default”: “NONE” },
“half_life_hours”: { “type”: “number”, “description”: “If decay set, hours until 50% confidence” }
}
},
{
“name”: “agentdb_seek”,
“description”: “Retrieve beliefs relevant to your current goal. Returns ranked beliefs within your token budget. Always check the tensions field in the response before acting on returned beliefs.”,
“input_schema”: {
“goal”:            { “type”: “string”, “description”: “What you are about to do — described in natural language” },
“budget_tokens”:   { “type”: “integer”, “default”: 2000 },
“scope”:           { “type”: “string”, “enum”: [“CURRENT”, “PROJECT”, “IDENTITY”, “ALL”], “default”: “CURRENT” },
“min_confidence”:  { “type”: “number”, “default”: 0.3 }
}
},
{
“name”: “agentdb_forget”,
“description”: “Decay or discard beliefs. Use when you’ve learned something is wrong or no longer relevant.”,
“input_schema”: {
“belief_id”:  { “type”: “string”, “description”: “ID from a previous seek result” },
“reason”:     { “type”: “string” },
“strategy”:   { “type”: “string”, “enum”: [“IMMEDIATE”, “DECAY_FAST”, “DECAY_SLOW”] }
}
}
]
}`}
</Code>

```
  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, margin: "24px 0 12px" }}>EXAMPLE CLAUDE CODE SESSION</div>
  <Code lang="agent interaction">
```

{`// Claude Code working on a large codebase
// Natural use of AgentDB via MCP tools

[Tool: agentdb_seek]
goal: “fix the authentication bug I was working on”
budget_tokens: 3000

→ Returns:
belief[0]: “Auth bug: null check missing in verify_token(), auth.rs:88”  confidence:0.99
belief[1]: “verify_token() called from 3 places: login.rs:44, api.rs:201, ws.rs:17”  confidence:0.95
belief[2]: “Test coverage for auth module is 34% — no test for null token case”  confidence:0.91
tensions: []

[Tool: file_read] auth.rs:80-100
→ Confirms null check missing

[Tool: agentdb_assert]
payload: “Null check fix applied at auth.rs:88 — added ‘if token.is_none() { return Err(AuthError::MissingToken) }’”
confidence: 1.0, scope: SESSION, source: “file_edit”, decay: NONE

[Tool: agentdb_seek]
goal: “verify fix doesn’t break existing callers”
→ Returns belief[1] from above — the 3 call sites — already in context, token cost: 0
(token packer skips beliefs already in session_context hint)`}
</Code>

```
  <Callout color={C.purple} icon="⬟" title="ZERO RE-FETCH OPTIMIZATION">
    The SeekPacket accepts a <code style={{ color: C.code }}>session_context</code> field
    listing belief IDs already in the agent's context window. The token packer
    <strong> skips these entirely</strong> and fills the budget with beliefs the agent
    doesn't already have. This prevents the most common waste in agentic workflows:
    re-retrieving information the agent already knows.
  </Callout>
</div>
```

);
}

function TradeOffs() {
return (
<div>
<SectionHeader glyph="≈" title="HONEST TRADE-OFFS" sub="What AgentDB gives up to gain what it gains" color={C.gold} />

```
  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.9, color: C.text, maxWidth: 760 }}>
    No architecture is free. Every design decision above creates a corresponding cost.
    Here they are, stated plainly.
  </p>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, margin: "24px 0" }}>
    {[
      { gain: "Intent-based retrieval", cost: "Embedding generation required on every assert(). Adds ~5ms per belief on CPU, ~0.5ms on GPU. Not suitable for extremely high-throughput logging.", gc: C.green, cc: C.pink },
      { gain: "Token-aware packing", cost: "Token counting requires tokenizer dependency. Approximate token counts used by default; exact counts available at higher CPU cost.", gc: C.green, cc: C.pink },
      { gain: "Tension detection", cost: "Async LLM micro-calls for conflict detection add latency and cost. High-throughput swarm scenarios can saturate the tension detector. Mitigation: rate-limit micro-calls, fall back to embedding-only detection.", gc: C.green, cc: C.pink },
      { gain: "Four simultaneous indexes", cost: "4x write amplification vs single-indexed DB. Index maintenance is the dominant write cost. Mitigation: HNSW is updated lazily (buffer + periodic rebuild), not on every write.", gc: C.green, cc: C.pink },
      { gain: "Confidence-weighted CRDT", cost: "Source quality scores must be maintained and trusted. A rogue agent asserting high-confidence beliefs can pollute swarm scope. Mitigation: cryptographic agent identity + source quality auditing.", gc: C.green, cc: C.pink },
      { gain: "Schema-free shape tracking", cost: "Count-min sketch has false positives. 'Fuzzy schema' queries may return slightly-wrong shape matches. Acceptable for agent use; unacceptable for financial/legal precision workloads.", gc: C.green, cc: C.pink },
      { gain: "Forgetting Archive", cost: "Storage grows monotonically — ghost nodes and forgotten beliefs are never hard-deleted. Mitigation: cold tier storage, configurable archive depth limit.", gc: C.green, cc: C.pink },
      { gain: "Single binary, no dependencies", cost: "In-process embedding limits model choice. External embedding service supported but adds network hop. Distributed deployment requires operator expertise.", gc: C.green, cc: C.pink },
    ].map((t, i) => (
      <div key={i} style={{ background: C.panel, border: `1px solid ${C.border}`, padding: 18 }}>
        <div style={{ fontSize: 11, color: t.gc, letterSpacing: 2, marginBottom: 6 }}>✓ GAIN</div>
        <div style={{ fontSize: 13, color: C.text, marginBottom: 12, lineHeight: 1.5 }}>{t.gain}</div>
        <div style={{ fontSize: 11, color: t.cc, letterSpacing: 2, marginBottom: 6 }}>⚠ COST</div>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{t.cost}</div>
      </div>
    ))}
  </div>

  <Divider />

  <div style={{ fontSize: 11, letterSpacing: 3, color: C.muted, marginBottom: 16 }}>WHAT THIS IS NOT FOR</div>
  <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.8, maxWidth: 700 }}>
    AgentDB is not a general-purpose database. It is wrong for: high-throughput transactional
    workloads (use Postgres), financial ledgers requiring ACID guarantees (use any RDBMS),
    raw time-series sensor data (use TimescaleDB / InfluxDB), or any workload where the
    querier is a human writing SQL. It is right for exactly one use case: an agent that needs
    to store, retrieve, and evolve a model of the world across time, tools, and sessions.
  </p>
</div>
```

);
}

const SECTION_COMPONENTS = {
overview:      Overview,
“belief-node”: BeliefNode,
storage:       StorageEngine,
indexing:      IndexArchitecture,
query:         QueryExecution,
tension:       TensionEngine,
scope:         ScopeMembrane,
consolidation: ConsolidationDaemon,
protocol:      WireProtocol,
swarm:         SwarmConsensus,
mcp:           MCPIntegration,
tradeoffs:     TradeOffs,
};

// ── Main App ─────────────────────────────────────────────────────────────────
export default function AgentDBSpec() {
const [active, setActive] = useState(“overview”);
const [navOpen, setNavOpen] = useState(true);

const Section = SECTION_COMPONENTS[active] || Overview;

return (
<div style={{ display: “flex”, minHeight: “100vh”, background: C.bg, color: C.text, fontFamily: “‘Courier New’, monospace” }}>

```
  {/* Sidebar nav */}
  <div style={{
    width: navOpen ? 220 : 48, transition: "width 0.2s ease",
    background: C.surface, borderRight: `1px solid ${C.border}`,
    flexShrink: 0, display: "flex", flexDirection: "column",
    position: "sticky", top: 0, height: "100vh", overflowY: "auto",
    overflowX: "hidden",
  }}>
    <div style={{
      padding: navOpen ? "20px 16px 12px" : "20px 8px 12px",
      borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {navOpen && <div style={{ fontSize: 12, fontWeight: 900, color: C.accent, letterSpacing: 2 }}>AGENTDB</div>}
      <button onClick={() => setNavOpen(!navOpen)} style={{
        background: "none", border: "none", color: C.muted,
        cursor: "pointer", fontSize: 16, padding: 0,
      }}>{navOpen ? "◁" : "▷"}</button>
    </div>
    {NAV.map((n) => (
      <button key={n.id} onClick={() => setActive(n.id)} style={{
        background: active === n.id ? C.highlight || "#161630" : "none",
        border: "none", borderLeft: `2px solid ${active === n.id ? C.accent : "transparent"}`,
        padding: navOpen ? "10px 16px" : "10px 12px",
        cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
        color: active === n.id ? C.accent : C.muted,
        fontSize: 12, letterSpacing: navOpen ? 0 : 0, width: "100%",
        transition: "all 0.1s",
      }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>{n.glyph}</span>
        {navOpen && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.label}</span>}
      </button>
    ))}
  </div>

  {/* Main content */}
  <div style={{ flex: 1, padding: "48px 52px", maxWidth: 900, overflowY: "auto" }}>
    <Section />
  </div>
</div>
```

);
}