-- =============================================================================
-- LEXOS MVP — Migration 006: Embedding Chunks, Agent Outputs, Tool Calls, Model Runs
-- Schema authority: docs/implementation/01 Database Schema v0.md §7.12, §7.23, §7.25–7.26
-- RLS: deferred to WP-03. Scoping fields present on all tables.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- §7.12 embedding_chunks
-- Vector chunks for retrieval. Embeddings are retrieval aids, NOT evidence.
-- Retrieval must filter by client_id, matter_id, privilege, confidentiality,
-- and is_current before vector similarity — never global default retrieval.
--
-- embedding dimension: vector(3072)
--   Default for Google Gemini (text-embedding-004 default output = 3072 dims).
--   Scaled Gemini outputs: 1536 or 768 dims also supported by the model.
--   To change: ALTER TABLE embedding_chunks ALTER COLUMN embedding_vector TYPE vector(N)
--   before any rows are inserted — coordinate with WP-08 (embedding pipeline).
-- ---------------------------------------------------------------------------
create table if not exists embedding_chunks (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  evidence_id            uuid references evidence(id),
  extraction_id          uuid references evidence_extractions(id),
  source_object_type     text,
  source_object_id       uuid,
  chunk_text             text,
  chunk_index            integer,
  page_reference         text,
  timecode_reference     text,
  frame_reference        text,
  language               text,
  privilege_status       text check (privilege_status in (
                           'unknown','not_privileged','potentially_privileged',
                           'privileged','work_product','restricted')),
  confidentiality_status text check (confidentiality_status in (
                           'unknown','public','internal','confidential',
                           'highly_confidential','restricted')),
  embedding_model        text,
  -- vector(3072): Gemini default dimension. See note above.
  embedding_vector       vector(3072),
  is_current             boolean default true,
  created_at             timestamptz not null default now(),
  metadata               jsonb
);

create index if not exists idx_embedding_chunks_client_id           on embedding_chunks(client_id);
create index if not exists idx_embedding_chunks_matter_id           on embedding_chunks(matter_id);
create index if not exists idx_embedding_chunks_evidence_id         on embedding_chunks(evidence_id);
create index if not exists idx_embedding_chunks_extraction_id       on embedding_chunks(extraction_id);
create index if not exists idx_embedding_chunks_source_object_type  on embedding_chunks(source_object_type);
create index if not exists idx_embedding_chunks_source_object_id    on embedding_chunks(source_object_id);
create index if not exists idx_embedding_chunks_is_current          on embedding_chunks(is_current);
create index if not exists idx_embedding_chunks_language            on embedding_chunks(language);
create index if not exists idx_embedding_chunks_privilege_status    on embedding_chunks(privilege_status);
create index if not exists idx_embedding_chunks_confidentiality     on embedding_chunks(confidentiality_status);

-- Vector index (ivfflat cosine). Requires pgvector with sufficient rows for probes.
-- Wrapped in a DO block so this migration is not blocked if pgvector is unavailable
-- in the current environment (e.g. local dev without Docker/pgvector enabled).
do $$ begin
  create index if not exists idx_embedding_chunks_vector
    on embedding_chunks
    using ivfflat (embedding_vector vector_cosine_ops)
    with (lists = 100);
exception when others then
  raise notice 'pgvector ivfflat index not created (pgvector may not be enabled): %', sqlerrm;
end $$;

-- No updated_at: embedding chunks are typically replaced (is_current = false) not mutated.
-- RLS: deferred to WP-03. Future queries MUST filter client_id + matter_id before
--      vector similarity — global retrieval is prohibited by architecture rules.

-- ---------------------------------------------------------------------------
-- §7.23 agent_outputs
-- Major AI agent outputs — must be traceable; failed runs must not disappear.
-- ---------------------------------------------------------------------------
create table if not exists agent_outputs (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid references clients(id),
  matter_id              uuid references matters(id),
  intake_id              uuid references intake_records(id),
  agent_name             text,
  agent_role             text,
  workflow               text check (workflow in (
                           'W0','W1','W2','W3','W4','W5','W6',
                           'W7','W8','W9','W10','W11')),
  status                 text check (status in (
                           'queued','running','completed','failed','cancelled','needs_review')),
  input_object_refs      jsonb,
  output_object_refs     jsonb,
  output_markdown        text,
  output_json            jsonb,
  model_used             text,
  prompt_version         text,
  tool_calls             jsonb,
  error_message          text,
  started_at             timestamptz,
  completed_at           timestamptz,
  created_at             timestamptz not null default now(),
  confidentiality_status text check (confidentiality_status in (
                           'unknown','public','internal','confidential',
                           'highly_confidential','restricted')),
  privilege_status       text check (privilege_status in (
                           'unknown','not_privileged','potentially_privileged',
                           'privileged','work_product','restricted')),
  metadata               jsonb
);

create index if not exists idx_agent_outputs_client_id   on agent_outputs(client_id);
create index if not exists idx_agent_outputs_matter_id   on agent_outputs(matter_id);
create index if not exists idx_agent_outputs_intake_id   on agent_outputs(intake_id);
create index if not exists idx_agent_outputs_agent_name  on agent_outputs(agent_name);
create index if not exists idx_agent_outputs_workflow    on agent_outputs(workflow);
create index if not exists idx_agent_outputs_status      on agent_outputs(status);
create index if not exists idx_agent_outputs_created_at  on agent_outputs(created_at);

-- No updated_at: agent output rows are typically immutable records.
-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.25 tool_calls
-- Material tool calls. Do NOT store sensitive full prompt or evidence text.
-- Material failures must remain visible.
-- ---------------------------------------------------------------------------
create table if not exists tool_calls (
  id                   uuid primary key default gen_random_uuid(),
  client_id            uuid references clients(id),
  matter_id            uuid references matters(id),
  intake_id            uuid references intake_records(id),
  tool_name            text,
  tool_type            text,
  workflow             text check (workflow in (
                         'W0','W1','W2','W3','W4','W5','W6',
                         'W7','W8','W9','W10','W11')),
  actor_type           text,
  actor_id             uuid,
  input_summary        text,
  input_object_refs    jsonb,
  output_summary       text,
  output_object_refs   jsonb,
  status               text check (status in (
                         'queued','running','completed','failed','cancelled','needs_review')),
  error_message        text,
  started_at           timestamptz,
  completed_at         timestamptz,
  created_at           timestamptz not null default now(),
  metadata             jsonb
);

create index if not exists idx_tool_calls_client_id   on tool_calls(client_id);
create index if not exists idx_tool_calls_matter_id   on tool_calls(matter_id);
create index if not exists idx_tool_calls_intake_id   on tool_calls(intake_id);
create index if not exists idx_tool_calls_tool_name   on tool_calls(tool_name);
create index if not exists idx_tool_calls_tool_type   on tool_calls(tool_type);
create index if not exists idx_tool_calls_workflow    on tool_calls(workflow);
create index if not exists idx_tool_calls_status      on tool_calls(status);
create index if not exists idx_tool_calls_created_at  on tool_calls(created_at);

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.26 model_runs
-- Material model usage records.
-- Avoid storing full privileged prompt content unless secured.
-- ---------------------------------------------------------------------------
create table if not exists model_runs (
  id                   uuid primary key default gen_random_uuid(),
  client_id            uuid references clients(id),
  matter_id            uuid references matters(id),
  intake_id            uuid references intake_records(id),
  model_provider       text,
  model_name           text,
  model_version        text,
  workflow             text check (workflow in (
                         'W0','W1','W2','W3','W4','W5','W6',
                         'W7','W8','W9','W10','W11')),
  agent_name           text,
  prompt_version       text,
  input_object_refs    jsonb,
  output_object_refs   jsonb,
  token_input          integer,
  token_output         integer,
  cost_estimate        numeric,
  latency_ms           integer,
  status               text check (status in (
                         'queued','running','completed','failed','cancelled','needs_review')),
  error_message        text,
  created_at           timestamptz not null default now(),
  metadata             jsonb
);

create index if not exists idx_model_runs_client_id      on model_runs(client_id);
create index if not exists idx_model_runs_matter_id      on model_runs(matter_id);
create index if not exists idx_model_runs_intake_id      on model_runs(intake_id);
create index if not exists idx_model_runs_model_provider on model_runs(model_provider);
create index if not exists idx_model_runs_model_name     on model_runs(model_name);
create index if not exists idx_model_runs_workflow       on model_runs(workflow);
create index if not exists idx_model_runs_agent_name     on model_runs(agent_name);
create index if not exists idx_model_runs_status         on model_runs(status);
create index if not exists idx_model_runs_created_at     on model_runs(created_at);

-- RLS: deferred to WP-03.
