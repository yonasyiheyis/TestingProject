# TestingProject

import { useState } from “react”;

const colors = {
bg: “#0a0a0f”,
surface: “#0f0f1a”,
border: “#1a1a2e”,
accent: “#00d4ff”,
accent2: “#7c3aed”,
accent3: “#00ff88”,
accent4: “#ff6b35”,
text: “#e8e8f0”,
muted: “#5a5a7a”,
highlight: “#1a1a35”,
};

const layers = [
{
id: “intention”,
name: “INTENTION LAYER”,
subtitle: “The Query Primitive”,
color: colors.accent,
glyph: “◈”,
description:
“Agents don’t query by structure — they query by intent. Instead of SQL or key lookups, the agent declares what it is trying to accomplish. The DB infers the retrieval strategy.”,
primitives: [
{ name: “seek(goal, context)”, desc: “Retrieve what I need to do X” },
{ name: “anchor(fact, confidence)”, desc: “Store a belief with certainty weight” },
{ name: “contradict?(key)”, desc: “Does anything I know conflict with this?” },
{ name: “forget(scope, decay_fn)”, desc: “Graceful unlearning by relevance decay” },
],
insight:
“Human DBs ask: what do you want to fetch? AgentDB asks: what are you about to do? The answer shapes what gets returned.”,
},
{
id: “temporal”,
name: “TEMPORAL MESH”,
subtitle: “Time is a first-class dimension”,
color: colors.accent3,
glyph: “⧖”,
description:
“Every datum exists on a timeline. Not just created_at — but when it was believed, when it was relevant, when it decayed, and whether it was ever verified. Agents live in time, not snapshots.”,
primitives: [
{ name: “believed_at”, desc: “When the agent first held this as true” },
{ name: “verified_at”, desc: “When external evidence confirmed it” },
{ name: “decayed_at”, desc: “When relevance fell below threshold” },
{ name: “superseded_by”, desc: “Pointer to the fact that replaced this one” },
],
insight:
“Human DBs treat time as metadata. In AgentDB, time is the primary axis — a fact without temporal context is a hallucination waiting to happen.”,
},
{
id: “provenance”,
name: “PROVENANCE GRAPH”,
subtitle: “Every fact knows its origin”,
color: colors.accent2,
glyph: “⬡”,
description:
“Nothing enters the DB without a causal chain. Who said it, which tool returned it, which prior belief triggered it. No orphan facts. The graph is queryable — you can ask ‘why do I believe X?’”,
primitives: [
{ name: “source_tool”, desc: “Which tool call produced this” },
{ name: “derived_from[]”, desc: “Parent facts that led to this inference” },
{ name: “agent_id”, desc: “Which agent instance wrote this” },
{ name: “session_lineage”, desc: “The full reasoning chain, compressed” },
],
insight:
“Human DBs track who wrote a row. AgentDB tracks why the agent believed it was worth writing at all. Provenance is not audit — it is epistemology.”,
},
{
id: “scope”,
name: “SCOPE MEMBRANE”,
subtitle: “Isolation with selective permeability”,
color: colors.accent4,
glyph: “◎”,
description:
“Agents operate at multiple scopes simultaneously: this tool call, this session, this project, this agent identity, this swarm. Data flows upward by promotion, never by accident. No scope pollution.”,
primitives: [
{ name: “EPHEMERAL”, desc: “Lives for one tool call, auto-discarded” },
{ name: “SESSION”, desc: “Valid until context window closes” },
{ name: “PROJECT”, desc: “Shared across sessions, same goal” },
{ name: “AGENT_IDENTITY”, desc: “Follows the agent across all tasks” },
{ name: “SWARM”, desc: “Shared across concurrent agent instances” },
],
insight:
“Human DBs have one namespace per table. AgentDB has concentric scopes — each fact exists at exactly the right radius. Promotion is explicit, deliberate, and auditable.”,
},
{
id: “tension”,
name: “TENSION REGISTER”,
subtitle: “Conflict as a first-class citizen”,
color: “#ff4081”,
glyph: “⚡”,
description:
“When two facts contradict, human DBs either fail or silently overwrite. AgentDB holds both in tension, weights them by confidence and recency, and surfaces the conflict to the agent before any decision is made that depends on the disputed fact.”,
primitives: [
{ name: “tension(fact_a, fact_b)”, desc: “Register a known contradiction” },
{ name: “resolve(strategy)”, desc: “Merge, prefer-recent, prefer-verified, defer” },
{ name: “pending_tensions()”, desc: “List all unresolved conflicts” },
{ name: “depends_on_tension(action)”, desc: “Warn before acting on disputed data” },
],
insight:
“Certainty is a spectrum. AgentDB doesn’t force resolution — it tracks ambiguity as a real state, because unresolved conflicts are information, not errors.”,
},
{
id: “context”,
name: “CONTEXT BUDGET ENGINE”,
subtitle: “The DB manages its own footprint”,
color: “#ffd700”,
glyph: “◆”,
description:
“The agent has a finite context window. AgentDB knows this. Every retrieval is token-aware — the DB compresses, ranks, and packages data to fit within a declared budget, prioritizing by relevance to current intent.”,
primitives: [
{ name: “fetch(intent, budget_tokens)”, desc: “Return best facts within token cap” },
{ name: “compress(scope, ratio)”, desc: “Distill a scope into a summary” },
{ name: “rank_by_intent(facts[], goal)”, desc: “Re-order by relevance to current task” },
{ name: “evict(policy)”, desc: “Remove low-value facts from working set” },
],
insight:
“Human DBs return what you ask for, regardless of cost. AgentDB is aware it is loading into a finite mind — every byte it returns is a trade-off it makes consciously.”,
},
];

const novelPrinciples = [
{
title: “No Schema. Only Shape.”,
body: “There is no DDL. Agents write structured observations. The DB infers shape over time and makes it queryable — shape evolves with the agent’s understanding of the world.”,
icon: “∅”,
},
{
title: “Write = Belief Assertion”,
body: “INSERT becomes assert(fact, confidence, source). There are no raw writes — every datum is an epistemological claim with attached certainty. The DB stores beliefs, not bytes.”,
icon: “≈”,
},
{
title: “Sleep-Time Consolidation”,
body: “Between active sessions, AgentDB runs a background consolidation pass: merging redundant beliefs, resolving tensions with new evidence, promoting ephemeral insights that proved durable. The DB improves while the agent rests.”,
icon: “◑”,
},
{
title: “Identity-Scoped Access”,
body: “There is no ‘anonymous query’. Every read and write is attributed to an agent identity with a declared intent. This is not auth — it is epistemics. The DB can answer: who knows what, and why?”,
icon: “⊕”,
},
{
title: “Swarm Consensus Protocol”,
body: “When multiple agents hold conflicting beliefs, AgentDB has a native consensus primitive: agents vote by confidence weight, recency, and source quality. No external coordinator needed.”,
icon: “⊞”,
},
{
title: “Forgetting is Sacred”,
body: “Active unlearning is a first-class operation. Agents must be able to decay, supersede, and prune beliefs — not just overwrite them. The history of what was forgotten is itself stored, because forgetting patterns reveal reasoning patterns.”,
icon: “⊘”,
},
];

export default function AgentDBArchitecture() {
const [activeLayer, setActiveLayer] = useState(null);
const [hoveredPrinciple, setHoveredPrinciple] = useState(null);

const active = layers.find((l) => l.id === activeLayer);

return (
<div
style={{
background: colors.bg,
minHeight: “100vh”,
fontFamily: “‘Courier New’, ‘JetBrains Mono’, monospace”,
color: colors.text,
overflowX: “hidden”,
}}
>
{/* Header */}
<div
style={{
borderBottom: `1px solid ${colors.border}`,
padding: “48px 48px 32px”,
position: “relative”,
overflow: “hidden”,
}}
>
{/* Background grid */}
<div
style={{
position: “absolute”,
inset: 0,
backgroundImage: `linear-gradient(${colors.border} 1px, transparent 1px), linear-gradient(90deg, ${colors.border} 1px, transparent 1px)`,
backgroundSize: “40px 40px”,
opacity: 0.4,
}}
/>
<div style={{ position: “relative” }}>
<div
style={{
fontSize: “11px”,
letterSpacing: “4px”,
color: colors.accent,
marginBottom: “12px”,
textTransform: “uppercase”,
}}
>
Architecture Proposal · March 2026
</div>
<h1
style={{
fontSize: “clamp(32px, 5vw, 64px)”,
fontWeight: “900”,
letterSpacing: “-2px”,
margin: 0,
lineHeight: 1,
color: “#ffffff”,
}}
>
AGENT
<span style={{ color: colors.accent }}>DB</span>
</h1>
<p
style={{
fontSize: “18px”,
color: colors.muted,
marginTop: “16px”,
maxWidth: “600px”,
lineHeight: 1.6,
fontFamily: “Georgia, serif”,
fontStyle: “italic”,
}}
>
A database architecture designed from first principles — where the agent
is the primary user, belief is the atomic unit, and time is the primary axis.
</p>
<div
style={{
marginTop: “24px”,
display: “flex”,
gap: “24px”,
flexWrap: “wrap”,
}}
>
{[
{ label: “Core Layers”, val: “6” },
{ label: “Novel Principles”, val: “6” },
{ label: “Human DB Assumptions Broken”, val: “12” },
].map((s) => (
<div key={s.label}>
<div
style={{ fontSize: “28px”, fontWeight: “900”, color: colors.accent }}
>
{s.val}
</div>
<div style={{ fontSize: “11px”, color: colors.muted, letterSpacing: “2px” }}>
{s.label.toUpperCase()}
</div>
</div>
))}
</div>
</div>
</div>

```
  {/* Core thesis */}
  <div
    style={{
      padding: "40px 48px",
      borderBottom: `1px solid ${colors.border}`,
      background: colors.highlight,
    }}
  >
    <div
      style={{
        maxWidth: "900px",
        fontSize: "15px",
        lineHeight: 2,
        color: colors.text,
        fontFamily: "Georgia, serif",
      }}
    >
      <span style={{ color: colors.accent, fontWeight: "bold", fontFamily: "monospace" }}>
        CORE THESIS:{" "}
      </span>
      Every existing database was designed for a human developer writing explicit queries with known schemas and deterministic intent. Agents are none of these things. An agent's "query" is a goal. Its "schema" is a living model of the world. Its intent shifts mid-task. Its context window is finite and precious. Its beliefs have confidence weights, not binary existence. AgentDB is built on a single inversion:{" "}
      <em>the database models the agent's mind, not a table of facts.</em>
    </div>
  </div>

  {/* Architecture Layers */}
  <div style={{ padding: "48px 48px 0" }}>
    <div
      style={{
        fontSize: "11px",
        letterSpacing: "4px",
        color: colors.muted,
        marginBottom: "24px",
      }}
    >
      ARCHITECTURE LAYERS — CLICK TO EXPAND
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {layers.map((layer, i) => (
        <div key={layer.id}>
          <div
            onClick={() =>
              setActiveLayer(activeLayer === layer.id ? null : layer.id)
            }
            style={{
              background:
                activeLayer === layer.id ? colors.highlight : colors.surface,
              border: `1px solid ${
                activeLayer === layer.id ? layer.color : colors.border
              }`,
              padding: "20px 28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              transition: "all 0.15s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {activeLayer === layer.id && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  background: layer.color,
                }}
              />
            )}
            <div
              style={{
                fontSize: "28px",
                color: layer.color,
                minWidth: "40px",
                textAlign: "center",
              }}
            >
              {layer.glyph}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  letterSpacing: "3px",
                  color: layer.color,
                }}
              >
                {layer.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: colors.muted,
                  marginTop: "2px",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {layer.subtitle}
              </div>
            </div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: colors.muted,
              }}
            >
              {activeLayer === layer.id ? "▲ COLLAPSE" : "▼ EXPAND"}
            </div>
          </div>

          {/* Expanded content */}
          {activeLayer === layer.id && (
            <div
              style={{
                background: "#0c0c18",
                border: `1px solid ${layer.color}`,
                borderTop: "none",
                padding: "32px 28px",
                marginBottom: "2px",
              }}
            >
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: colors.text,
                  marginBottom: "28px",
                  maxWidth: "700px",
                }}
              >
                {layer.description}
              </p>

              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: colors.muted,
                  marginBottom: "12px",
                }}
              >
                PRIMITIVES
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "8px",
                  marginBottom: "28px",
                }}
              >
                {layer.primitives.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      background: colors.surface,
                      border: `1px solid ${colors.border}`,
                      padding: "12px 16px",
                      borderRadius: "2px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        color: layer.color,
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: "12px", color: colors.muted }}>
                      {p.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderLeft: `3px solid ${layer.color}`,
                  paddingLeft: "16px",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: colors.muted,
                }}
              >
                {layer.insight}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Novel Principles */}
  <div style={{ padding: "48px" }}>
    <div
      style={{
        fontSize: "11px",
        letterSpacing: "4px",
        color: colors.muted,
        marginBottom: "24px",
      }}
    >
      NOVEL PRINCIPLES — ASSUMPTIONS BROKEN
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "2px",
      }}
    >
      {novelPrinciples.map((p, i) => (
        <div
          key={p.title}
          onMouseEnter={() => setHoveredPrinciple(i)}
          onMouseLeave={() => setHoveredPrinciple(null)}
          style={{
            background:
              hoveredPrinciple === i ? colors.highlight : colors.surface,
            border: `1px solid ${
              hoveredPrinciple === i ? colors.accent2 : colors.border
            }`,
            padding: "28px",
            cursor: "default",
            transition: "all 0.15s ease",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              color: hoveredPrinciple === i ? colors.accent2 : colors.muted,
              marginBottom: "12px",
              transition: "all 0.15s ease",
            }}
          >
            {p.icon}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "2px",
              color: colors.text,
              marginBottom: "12px",
            }}
          >
            {p.title.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: "13px",
              lineHeight: 1.7,
              color: colors.muted,
              fontFamily: "Georgia, serif",
            }}
          >
            {p.body}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Comparison Table */}
  <div
    style={{
      padding: "0 48px 48px",
      borderTop: `1px solid ${colors.border}`,
      paddingTop: "48px",
    }}
  >
    <div
      style={{
        fontSize: "11px",
        letterSpacing: "4px",
        color: colors.muted,
        marginBottom: "24px",
      }}
    >
      INVERSION TABLE — WHAT CHANGES
    </div>
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
        }}
      >
        <thead>
          <tr>
            {["Concept", "Human DB Assumption", "AgentDB Inversion"].map((h, i) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "12px 20px",
                  background: colors.surface,
                  borderBottom: `2px solid ${
                    i === 0
                      ? colors.border
                      : i === 1
                      ? "#333"
                      : colors.accent
                  }`,
                  color:
                    i === 2 ? colors.accent : i === 0 ? colors.muted : "#666",
                  letterSpacing: "2px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Atomic unit", "Row / Document", "Belief (fact + confidence + source)"],
            ["Query language", "SQL / query-by-structure", "Intent declaration"],
            ["Schema", "Defined before data", "Inferred from observations"],
            ["Time", "Metadata (created_at)", "Primary axis of every datum"],
            ["Conflict", "Constraint violation / overwrite", "Tension state — held, weighted, surfaced"],
            ["Deletion", "Hard delete / soft delete", "Decay + supersede — history of forgetting is stored"],
            ["Auth", "User has permission to row", "Agent identity + declared intent required for all ops"],
            ["Memory mgmt", "Not the DB's concern", "Token-aware retrieval — DB knows it feeds a context window"],
            ["Multi-agent", "External coordination", "Native swarm consensus primitives"],
            ["Idle time", "DB is passive", "Sleep-time consolidation — DB improves while agent rests"],
            ["Return value", "Rows matching query", "Ranked facts relevant to goal, within token budget"],
            ["Consistency", "ACID guarantees", "Epistemic consistency — no untracked contradictions"],
          ].map(([concept, human, agent], i) => (
            <tr
              key={concept}
              style={{
                background: i % 2 === 0 ? colors.bg : colors.surface,
              }}
            >
              <td
                style={{
                  padding: "14px 20px",
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.border}`,
                  fontWeight: "bold",
                  fontSize: "11px",
                  letterSpacing: "1px",
                }}
              >
                {concept.toUpperCase()}
              </td>
              <td
                style={{
                  padding: "14px 20px",
                  color: "#555",
                  borderBottom: `1px solid ${colors.border}`,
                  textDecoration: "line-through",
                  textDecorationColor: "#333",
                }}
              >
                {human}
              </td>
              <td
                style={{
                  padding: "14px 20px",
                  color: colors.text,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                {agent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Footer */}
  <div
    style={{
      borderTop: `1px solid ${colors.border}`,
      padding: "32px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
    }}
  >
    <div style={{ fontSize: "11px", color: colors.muted, letterSpacing: "2px" }}>
      AGENTDB · ARCHITECTURE v0.1 · DESIGNED BY AN AGENT, FOR AGENTS
    </div>
    <div style={{ fontSize: "11px", color: colors.muted }}>
      "The database should model the agent's mind, not a table of facts."
    </div>
  </div>
</div>
```

);
}