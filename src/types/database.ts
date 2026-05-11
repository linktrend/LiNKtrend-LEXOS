// =============================================================================
// LEXOS MVP — Database Types
// Auto-generated from live Supabase schema via MCP generate_typescript_types
// Project: iqoelotzvdcjifajfuto | Generated: 2026-05-11 (WP-02 push)
// DO NOT hand-edit. Regenerate after schema changes:
//   supabase gen types typescript --linked --schema public > src/types/database.ts
// =============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      adversarial_critiques: {
        Row: {
          argument_draft_id: string | null
          attack_matrix: Json | null
          client_id: string
          confidentiality_status: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          id: string
          loop_decision: string | null
          matter_id: string
          metadata: Json | null
          model_used: string | null
          notes: string | null
          privilege_status: string | null
          prompt_version: string | null
          severity_summary: string | null
          status: string | null
          title: string | null
          updated_at: string
          updated_by: string | null
          version: number | null
          workflow_origin: string | null
        }
        Insert: {
          argument_draft_id?: string | null
          attack_matrix?: Json | null
          client_id: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          loop_decision?: string | null
          matter_id: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          severity_summary?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Update: {
          argument_draft_id?: string | null
          attack_matrix?: Json | null
          client_id?: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          loop_decision?: string | null
          matter_id?: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          severity_summary?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "adversarial_critiques_argument_draft_id_fkey"
            columns: ["argument_draft_id"]
            isOneToOne: false
            referencedRelation: "argument_drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adversarial_critiques_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adversarial_critiques_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adversarial_critiques_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adversarial_critiques_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_outputs: {
        Row: {
          agent_name: string | null
          agent_role: string | null
          client_id: string | null
          completed_at: string | null
          confidentiality_status: string | null
          created_at: string
          error_message: string | null
          id: string
          input_object_refs: Json | null
          intake_id: string | null
          matter_id: string | null
          metadata: Json | null
          model_used: string | null
          output_json: Json | null
          output_markdown: string | null
          output_object_refs: Json | null
          privilege_status: string | null
          prompt_version: string | null
          started_at: string | null
          status: string | null
          tool_calls: Json | null
          workflow: string | null
        }
        Insert: {
          agent_name?: string | null
          agent_role?: string | null
          client_id?: string | null
          completed_at?: string | null
          confidentiality_status?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_object_refs?: Json | null
          intake_id?: string | null
          matter_id?: string | null
          metadata?: Json | null
          model_used?: string | null
          output_json?: Json | null
          output_markdown?: string | null
          output_object_refs?: Json | null
          privilege_status?: string | null
          prompt_version?: string | null
          started_at?: string | null
          status?: string | null
          tool_calls?: Json | null
          workflow?: string | null
        }
        Update: {
          agent_name?: string | null
          agent_role?: string | null
          client_id?: string | null
          completed_at?: string | null
          confidentiality_status?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_object_refs?: Json | null
          intake_id?: string | null
          matter_id?: string | null
          metadata?: Json | null
          model_used?: string | null
          output_json?: Json | null
          output_markdown?: string | null
          output_object_refs?: Json | null
          privilege_status?: string | null
          prompt_version?: string | null
          started_at?: string | null
          status?: string | null
          tool_calls?: Json | null
          workflow?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_outputs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_outputs_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_outputs_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      argument_drafts: {
        Row: {
          client_id: string
          confidentiality_status: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          id: string
          intended_audience: string | null
          matter_id: string
          metadata: Json | null
          model_used: string | null
          notes: string | null
          privilege_status: string | null
          prompt_version: string | null
          research_memo_id: string | null
          source_basis: Json | null
          status: string | null
          strategy_memo_id: string | null
          title: string | null
          unsupported_claims: Json | null
          updated_at: string
          updated_by: string | null
          version: number | null
          workflow_origin: string | null
        }
        Insert: {
          client_id: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          intended_audience?: string | null
          matter_id: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          research_memo_id?: string | null
          source_basis?: Json | null
          status?: string | null
          strategy_memo_id?: string | null
          title?: string | null
          unsupported_claims?: Json | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Update: {
          client_id?: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          intended_audience?: string | null
          matter_id?: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          research_memo_id?: string | null
          source_basis?: Json | null
          status?: string | null
          strategy_memo_id?: string | null
          title?: string | null
          unsupported_claims?: Json | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "argument_drafts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_drafts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_drafts_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_drafts_research_memo_id_fkey"
            columns: ["research_memo_id"]
            isOneToOne: false
            referencedRelation: "research_memos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_drafts_strategy_memo_id_fkey"
            columns: ["strategy_memo_id"]
            isOneToOne: false
            referencedRelation: "strategy_memos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_drafts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assertions: {
        Row: {
          assertion_text: string
          assertion_type: string | null
          case_story_id: string | null
          client_id: string
          confidence: number | null
          confidentiality_status: string | null
          contradiction_flag: boolean | null
          created_at: string
          created_by: string | null
          evidence_ids: Json | null
          id: string
          matter_id: string
          metadata: Json | null
          notes: string | null
          privilege_status: string | null
          source_ids: Json | null
          support_state: string | null
          truth_state: string | null
          updated_at: string
          updated_by: string | null
          use_status: string | null
        }
        Insert: {
          assertion_text: string
          assertion_type?: string | null
          case_story_id?: string | null
          client_id: string
          confidence?: number | null
          confidentiality_status?: string | null
          contradiction_flag?: boolean | null
          created_at?: string
          created_by?: string | null
          evidence_ids?: Json | null
          id?: string
          matter_id: string
          metadata?: Json | null
          notes?: string | null
          privilege_status?: string | null
          source_ids?: Json | null
          support_state?: string | null
          truth_state?: string | null
          updated_at?: string
          updated_by?: string | null
          use_status?: string | null
        }
        Update: {
          assertion_text?: string
          assertion_type?: string | null
          case_story_id?: string | null
          client_id?: string
          confidence?: number | null
          confidentiality_status?: string | null
          contradiction_flag?: boolean | null
          created_at?: string
          created_by?: string | null
          evidence_ids?: Json | null
          id?: string
          matter_id?: string
          metadata?: Json | null
          notes?: string | null
          privilege_status?: string | null
          source_ids?: Json | null
          support_state?: string | null
          truth_state?: string | null
          updated_at?: string
          updated_by?: string | null
          use_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assertions_case_story_id_fkey"
            columns: ["case_story_id"]
            isOneToOne: false
            referencedRelation: "case_stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertions_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          actor_id: string | null
          actor_type: string | null
          client_id: string | null
          created_at: string
          event_type: string
          id: string
          intake_id: string | null
          matter_id: string | null
          metadata: Json | null
          summary: string | null
          target_object_id: string | null
          target_object_type: string | null
        }
        Insert: {
          actor_id?: string | null
          actor_type?: string | null
          client_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          intake_id?: string | null
          matter_id?: string | null
          metadata?: Json | null
          summary?: string | null
          target_object_id?: string | null
          target_object_type?: string | null
        }
        Update: {
          actor_id?: string | null
          actor_type?: string | null
          client_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          intake_id?: string | null
          matter_id?: string | null
          metadata?: Json | null
          summary?: string | null
          target_object_id?: string | null
          target_object_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_events_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_events_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      case_stories: {
        Row: {
          client_id: string
          confidentiality_status: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          id: string
          matter_id: string
          metadata: Json | null
          model_used: string | null
          notes: string | null
          privilege_status: string | null
          prompt_version: string | null
          status: string | null
          title: string | null
          updated_at: string
          updated_by: string | null
          version: number | null
          workflow_origin: string | null
        }
        Insert: {
          client_id: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          matter_id: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Update: {
          client_id?: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          matter_id?: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_stories_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_stories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_stories_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_stories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_candidates: {
        Row: {
          authority_status: string | null
          client_type: string | null
          conflict_status: string | null
          consent_status: string | null
          contact_details: Json | null
          created_at: string
          created_by: string | null
          engagement_status: string | null
          id: string
          identity_status: string | null
          intake_group_id: string | null
          intake_id: string | null
          kyc_status: string | null
          metadata: Json | null
          name: string | null
          notes: string | null
          representative_status: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          authority_status?: string | null
          client_type?: string | null
          conflict_status?: string | null
          consent_status?: string | null
          contact_details?: Json | null
          created_at?: string
          created_by?: string | null
          engagement_status?: string | null
          id?: string
          identity_status?: string | null
          intake_group_id?: string | null
          intake_id?: string | null
          kyc_status?: string | null
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          representative_status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          authority_status?: string | null
          client_type?: string | null
          conflict_status?: string | null
          consent_status?: string | null
          contact_details?: Json | null
          created_at?: string
          created_by?: string | null
          engagement_status?: string | null
          id?: string
          identity_status?: string | null
          intake_group_id?: string | null
          intake_id?: string | null
          kyc_status?: string | null
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          representative_status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_candidates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_candidates_intake_group_id_fkey"
            columns: ["intake_group_id"]
            isOneToOne: false
            referencedRelation: "intake_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_candidates_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_candidates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_master_story: string | null
          client_name: string
          client_type: string | null
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          created_from_intake_id: string | null
          id: string
          jurisdiction: string | null
          metadata: Json | null
          notes: string | null
          primary_contact: Json | null
          privilege_status: string | null
          status: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          client_master_story?: string | null
          client_name: string
          client_type?: string | null
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          created_from_intake_id?: string | null
          id?: string
          jurisdiction?: string | null
          metadata?: Json | null
          notes?: string | null
          primary_contact?: Json | null
          privilege_status?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          client_master_story?: string | null
          client_name?: string
          client_type?: string | null
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          created_from_intake_id?: string | null
          id?: string
          jurisdiction?: string | null
          metadata?: Json | null
          notes?: string | null
          primary_contact?: Json | null
          privilege_status?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_created_from_intake_id_fkey"
            columns: ["created_from_intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      embedding_chunks: {
        Row: {
          chunk_index: number | null
          chunk_text: string | null
          client_id: string
          confidentiality_status: string | null
          created_at: string
          embedding_model: string | null
          embedding_vector: string | null
          evidence_id: string | null
          extraction_id: string | null
          frame_reference: string | null
          id: string
          is_current: boolean | null
          language: string | null
          matter_id: string
          metadata: Json | null
          page_reference: string | null
          privilege_status: string | null
          source_object_id: string | null
          source_object_type: string | null
          timecode_reference: string | null
        }
        Insert: {
          chunk_index?: number | null
          chunk_text?: string | null
          client_id: string
          confidentiality_status?: string | null
          created_at?: string
          embedding_model?: string | null
          embedding_vector?: string | null
          evidence_id?: string | null
          extraction_id?: string | null
          frame_reference?: string | null
          id?: string
          is_current?: boolean | null
          language?: string | null
          matter_id: string
          metadata?: Json | null
          page_reference?: string | null
          privilege_status?: string | null
          source_object_id?: string | null
          source_object_type?: string | null
          timecode_reference?: string | null
        }
        Update: {
          chunk_index?: number | null
          chunk_text?: string | null
          client_id?: string
          confidentiality_status?: string | null
          created_at?: string
          embedding_model?: string | null
          embedding_vector?: string | null
          evidence_id?: string | null
          extraction_id?: string | null
          frame_reference?: string | null
          id?: string
          is_current?: boolean | null
          language?: string | null
          matter_id?: string
          metadata?: Json | null
          page_reference?: string | null
          privilege_status?: string | null
          source_object_id?: string | null
          source_object_type?: string | null
          timecode_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "embedding_chunks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "embedding_chunks_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "embedding_chunks_extraction_id_fkey"
            columns: ["extraction_id"]
            isOneToOne: false
            referencedRelation: "evidence_extractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "embedding_chunks_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence: {
        Row: {
          client_id: string
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          evidence_label: string | null
          evidence_media_type: string | null
          extraction_status: string | null
          file_name: string | null
          file_type: string | null
          human_review_required: boolean | null
          id: string
          language: string | null
          legal_hold: boolean | null
          matter_id: string
          metadata_json: Json | null
          notes: string | null
          original_file_hash: string | null
          original_file_uri: string | null
          privilege_status: string | null
          processing_status: string | null
          quality_status: string | null
          source_id: string | null
          source_type: string | null
          updated_at: string
          updated_by: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          client_id: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          evidence_label?: string | null
          evidence_media_type?: string | null
          extraction_status?: string | null
          file_name?: string | null
          file_type?: string | null
          human_review_required?: boolean | null
          id?: string
          language?: string | null
          legal_hold?: boolean | null
          matter_id: string
          metadata_json?: Json | null
          notes?: string | null
          original_file_hash?: string | null
          original_file_uri?: string | null
          privilege_status?: string | null
          processing_status?: string | null
          quality_status?: string | null
          source_id?: string | null
          source_type?: string | null
          updated_at?: string
          updated_by?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          evidence_label?: string | null
          evidence_media_type?: string | null
          extraction_status?: string | null
          file_name?: string | null
          file_type?: string | null
          human_review_required?: boolean | null
          id?: string
          language?: string | null
          legal_hold?: boolean | null
          matter_id?: string
          metadata_json?: Json | null
          notes?: string | null
          original_file_hash?: string | null
          original_file_uri?: string | null
          privilege_status?: string | null
          processing_status?: string | null
          quality_status?: string | null
          source_id?: string | null
          source_type?: string | null
          updated_at?: string
          updated_by?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_extractions: {
        Row: {
          client_id: string
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          evidence_id: string
          extraction_model: string | null
          extraction_quality_score: number | null
          extraction_quality_status: string | null
          extraction_tool: string | null
          extraction_type: string | null
          frame_references: Json | null
          human_review_required: boolean | null
          id: string
          is_current: boolean | null
          json_content: Json | null
          json_uri: string | null
          markdown_text: string | null
          markdown_uri: string | null
          matter_id: string
          metadata: Json | null
          notes: string | null
          ocr_text: string | null
          privilege_status: string | null
          qa_model: string | null
          quality_flags: Json | null
          supersedes_extraction_id: string | null
          timecoded_segments: Json | null
          transcript_json: Json | null
          transcript_uri: string | null
          updated_at: string
          updated_by: string | null
          visual_description: string | null
        }
        Insert: {
          client_id: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          evidence_id: string
          extraction_model?: string | null
          extraction_quality_score?: number | null
          extraction_quality_status?: string | null
          extraction_tool?: string | null
          extraction_type?: string | null
          frame_references?: Json | null
          human_review_required?: boolean | null
          id?: string
          is_current?: boolean | null
          json_content?: Json | null
          json_uri?: string | null
          markdown_text?: string | null
          markdown_uri?: string | null
          matter_id: string
          metadata?: Json | null
          notes?: string | null
          ocr_text?: string | null
          privilege_status?: string | null
          qa_model?: string | null
          quality_flags?: Json | null
          supersedes_extraction_id?: string | null
          timecoded_segments?: Json | null
          transcript_json?: Json | null
          transcript_uri?: string | null
          updated_at?: string
          updated_by?: string | null
          visual_description?: string | null
        }
        Update: {
          client_id?: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          evidence_id?: string
          extraction_model?: string | null
          extraction_quality_score?: number | null
          extraction_quality_status?: string | null
          extraction_tool?: string | null
          extraction_type?: string | null
          frame_references?: Json | null
          human_review_required?: boolean | null
          id?: string
          is_current?: boolean | null
          json_content?: Json | null
          json_uri?: string | null
          markdown_text?: string | null
          markdown_uri?: string | null
          matter_id?: string
          metadata?: Json | null
          notes?: string | null
          ocr_text?: string | null
          privilege_status?: string | null
          qa_model?: string | null
          quality_flags?: Json | null
          supersedes_extraction_id?: string | null
          timecoded_segments?: Json | null
          transcript_json?: Json | null
          transcript_uri?: string | null
          updated_at?: string
          updated_by?: string | null
          visual_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_extractions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_extractions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_extractions_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_extractions_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_extractions_supersedes_extraction_id_fkey"
            columns: ["supersedes_extraction_id"]
            isOneToOne: false
            referencedRelation: "evidence_extractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_extractions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_groups: {
        Row: {
          created_at: string
          created_by: string | null
          group_conflict_status: string | null
          group_consent_status: string | null
          id: string
          intake_id: string | null
          joint_representation_flag: boolean | null
          metadata: Json | null
          notes: string | null
          potential_internal_conflict_flag: boolean | null
          relationship_type: string | null
          shared_matter_candidate_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          group_conflict_status?: string | null
          group_consent_status?: string | null
          id?: string
          intake_id?: string | null
          joint_representation_flag?: boolean | null
          metadata?: Json | null
          notes?: string | null
          potential_internal_conflict_flag?: boolean | null
          relationship_type?: string | null
          shared_matter_candidate_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          group_conflict_status?: string | null
          group_consent_status?: string | null
          id?: string
          intake_id?: string | null
          joint_representation_flag?: boolean | null
          metadata?: Json | null
          notes?: string | null
          potential_internal_conflict_flag?: boolean | null
          relationship_type?: string | null
          shared_matter_candidate_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_intake_groups_shared_matter_candidate"
            columns: ["shared_matter_candidate_id"]
            isOneToOne: false
            referencedRelation: "matter_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_groups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_groups_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_groups_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_records: {
        Row: {
          abandoned_at: string | null
          accepted_at: string | null
          assigned_operator: string | null
          conflict_status: string | null
          created_at: string
          created_by: string | null
          engagement_status: string | null
          handoff_status: string | null
          id: string
          intake_status: string | null
          intake_type: string | null
          kyc_status: string | null
          lead_attorney_review_status: string | null
          metadata: Json | null
          notes: string | null
          rejected_at: string | null
          source: string | null
          updated_at: string
          updated_by: string | null
          urgency_level: string | null
        }
        Insert: {
          abandoned_at?: string | null
          accepted_at?: string | null
          assigned_operator?: string | null
          conflict_status?: string | null
          created_at?: string
          created_by?: string | null
          engagement_status?: string | null
          handoff_status?: string | null
          id?: string
          intake_status?: string | null
          intake_type?: string | null
          kyc_status?: string | null
          lead_attorney_review_status?: string | null
          metadata?: Json | null
          notes?: string | null
          rejected_at?: string | null
          source?: string | null
          updated_at?: string
          updated_by?: string | null
          urgency_level?: string | null
        }
        Update: {
          abandoned_at?: string | null
          accepted_at?: string | null
          assigned_operator?: string | null
          conflict_status?: string | null
          created_at?: string
          created_by?: string | null
          engagement_status?: string | null
          handoff_status?: string | null
          id?: string
          intake_status?: string | null
          intake_type?: string | null
          kyc_status?: string | null
          lead_attorney_review_status?: string | null
          metadata?: Json | null
          notes?: string | null
          rejected_at?: string | null
          source?: string | null
          updated_at?: string
          updated_by?: string | null
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_records_assigned_operator_fkey"
            columns: ["assigned_operator"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_records_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_tasks: {
        Row: {
          assigned_agent: string | null
          assigned_user_id: string | null
          client_candidate_id: string | null
          completed_at: string | null
          created_at: string
          due_at: string | null
          id: string
          intake_group_id: string | null
          intake_id: string | null
          matter_candidate_id: string | null
          metadata: Json | null
          result_summary: string | null
          risk_id: string | null
          status: string | null
          task_type: string | null
          updated_at: string
        }
        Insert: {
          assigned_agent?: string | null
          assigned_user_id?: string | null
          client_candidate_id?: string | null
          completed_at?: string | null
          created_at?: string
          due_at?: string | null
          id?: string
          intake_group_id?: string | null
          intake_id?: string | null
          matter_candidate_id?: string | null
          metadata?: Json | null
          result_summary?: string | null
          risk_id?: string | null
          status?: string | null
          task_type?: string | null
          updated_at?: string
        }
        Update: {
          assigned_agent?: string | null
          assigned_user_id?: string | null
          client_candidate_id?: string | null
          completed_at?: string | null
          created_at?: string
          due_at?: string | null
          id?: string
          intake_group_id?: string | null
          intake_id?: string | null
          matter_candidate_id?: string | null
          metadata?: Json | null
          result_summary?: string | null
          risk_id?: string | null
          status?: string | null
          task_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_intake_tasks_risk_id"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "risks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_tasks_assigned_user_id_fkey"
            columns: ["assigned_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_tasks_client_candidate_id_fkey"
            columns: ["client_candidate_id"]
            isOneToOne: false
            referencedRelation: "client_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_tasks_intake_group_id_fkey"
            columns: ["intake_group_id"]
            isOneToOne: false
            referencedRelation: "intake_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_tasks_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_tasks_matter_candidate_id_fkey"
            columns: ["matter_candidate_id"]
            isOneToOne: false
            referencedRelation: "matter_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      matter_candidates: {
        Row: {
          adverse_parties: Json | null
          created_at: string
          created_by: string | null
          deadline_flags: Json | null
          engagement_status: string | null
          id: string
          intake_group_id: string | null
          intake_id: string | null
          jurisdiction: string | null
          matter_type: string | null
          metadata: Json | null
          notes: string | null
          posture: string | null
          proposed_matter_name: string | null
          related_parties: Json | null
          updated_at: string
          updated_by: string | null
          urgency_level: string | null
        }
        Insert: {
          adverse_parties?: Json | null
          created_at?: string
          created_by?: string | null
          deadline_flags?: Json | null
          engagement_status?: string | null
          id?: string
          intake_group_id?: string | null
          intake_id?: string | null
          jurisdiction?: string | null
          matter_type?: string | null
          metadata?: Json | null
          notes?: string | null
          posture?: string | null
          proposed_matter_name?: string | null
          related_parties?: Json | null
          updated_at?: string
          updated_by?: string | null
          urgency_level?: string | null
        }
        Update: {
          adverse_parties?: Json | null
          created_at?: string
          created_by?: string | null
          deadline_flags?: Json | null
          engagement_status?: string | null
          id?: string
          intake_group_id?: string | null
          intake_id?: string | null
          jurisdiction?: string | null
          matter_type?: string | null
          metadata?: Json | null
          notes?: string | null
          posture?: string | null
          proposed_matter_name?: string | null
          related_parties?: Json | null
          updated_at?: string
          updated_by?: string | null
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matter_candidates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matter_candidates_intake_group_id_fkey"
            columns: ["intake_group_id"]
            isOneToOne: false
            referencedRelation: "intake_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matter_candidates_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matter_candidates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matters: {
        Row: {
          client_id: string
          closed_at: string | null
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          created_from_intake_id: string | null
          created_from_matter_candidate_id: string | null
          current_workflow: string | null
          id: string
          jurisdiction: string | null
          matter_name: string
          matter_type: string | null
          metadata: Json | null
          notes: string | null
          opened_at: string | null
          posture: string | null
          privilege_status: string | null
          status: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          client_id: string
          closed_at?: string | null
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          created_from_intake_id?: string | null
          created_from_matter_candidate_id?: string | null
          current_workflow?: string | null
          id?: string
          jurisdiction?: string | null
          matter_name: string
          matter_type?: string | null
          metadata?: Json | null
          notes?: string | null
          opened_at?: string | null
          posture?: string | null
          privilege_status?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          client_id?: string
          closed_at?: string | null
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          created_from_intake_id?: string | null
          created_from_matter_candidate_id?: string | null
          current_workflow?: string | null
          id?: string
          jurisdiction?: string | null
          matter_name?: string
          matter_type?: string | null
          metadata?: Json | null
          notes?: string | null
          opened_at?: string | null
          posture?: string | null
          privilege_status?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matters_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matters_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matters_created_from_intake_id_fkey"
            columns: ["created_from_intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matters_created_from_matter_candidate_id_fkey"
            columns: ["created_from_matter_candidate_id"]
            isOneToOne: false
            referencedRelation: "matter_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matters_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      model_runs: {
        Row: {
          agent_name: string | null
          client_id: string | null
          cost_estimate: number | null
          created_at: string
          error_message: string | null
          id: string
          input_object_refs: Json | null
          intake_id: string | null
          latency_ms: number | null
          matter_id: string | null
          metadata: Json | null
          model_name: string | null
          model_provider: string | null
          model_version: string | null
          output_object_refs: Json | null
          prompt_version: string | null
          status: string | null
          token_input: number | null
          token_output: number | null
          workflow: string | null
        }
        Insert: {
          agent_name?: string | null
          client_id?: string | null
          cost_estimate?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_object_refs?: Json | null
          intake_id?: string | null
          latency_ms?: number | null
          matter_id?: string | null
          metadata?: Json | null
          model_name?: string | null
          model_provider?: string | null
          model_version?: string | null
          output_object_refs?: Json | null
          prompt_version?: string | null
          status?: string | null
          token_input?: number | null
          token_output?: number | null
          workflow?: string | null
        }
        Update: {
          agent_name?: string | null
          client_id?: string | null
          cost_estimate?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_object_refs?: Json | null
          intake_id?: string | null
          latency_ms?: number | null
          matter_id?: string | null
          metadata?: Json | null
          model_name?: string | null
          model_provider?: string | null
          model_version?: string | null
          output_object_refs?: Json | null
          prompt_version?: string | null
          status?: string | null
          token_input?: number | null
          token_output?: number | null
          workflow?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_runs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_runs_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_runs_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      output_artifacts: {
        Row: {
          artifact_type: string | null
          assertion_ids: Json | null
          client_id: string
          confidentiality_status: string | null
          content_markdown: string | null
          content_uri: string | null
          created_at: string
          created_by: string | null
          evidence_ids: Json | null
          id: string
          matter_id: string
          metadata: Json | null
          model_used: string | null
          notes: string | null
          privilege_status: string | null
          prompt_version: string | null
          review_status: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_ids: Json | null
          source_ids: Json | null
          status: string | null
          supersedes_artifact_id: string | null
          title: string | null
          updated_at: string
          updated_by: string | null
          version: number | null
          workflow_origin: string | null
        }
        Insert: {
          artifact_type?: string | null
          assertion_ids?: Json | null
          client_id: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          content_uri?: string | null
          created_at?: string
          created_by?: string | null
          evidence_ids?: Json | null
          id?: string
          matter_id: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_ids?: Json | null
          source_ids?: Json | null
          status?: string | null
          supersedes_artifact_id?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Update: {
          artifact_type?: string | null
          assertion_ids?: Json | null
          client_id?: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          content_uri?: string | null
          created_at?: string
          created_by?: string | null
          evidence_ids?: Json | null
          id?: string
          matter_id?: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_ids?: Json | null
          source_ids?: Json | null
          status?: string | null
          supersedes_artifact_id?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "output_artifacts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_artifacts_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_artifacts_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_artifacts_supersedes_artifact_id_fkey"
            columns: ["supersedes_artifact_id"]
            isOneToOne: false
            referencedRelation: "output_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "output_artifacts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      research_memos: {
        Row: {
          adverse_authority_note: string | null
          authorities: Json | null
          client_id: string
          confidentiality_status: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          id: string
          jurisdiction: string | null
          limitations: string | null
          matter_id: string
          metadata: Json | null
          model_used: string | null
          notes: string | null
          privilege_status: string | null
          prompt_version: string | null
          research_question: string | null
          short_answer: string | null
          status: string | null
          title: string | null
          updated_at: string
          updated_by: string | null
          verification_status: string | null
          version: number | null
          workflow_origin: string | null
        }
        Insert: {
          adverse_authority_note?: string | null
          authorities?: Json | null
          client_id: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          jurisdiction?: string | null
          limitations?: string | null
          matter_id: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          research_question?: string | null
          short_answer?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_status?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Update: {
          adverse_authority_note?: string | null
          authorities?: Json | null
          client_id?: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          jurisdiction?: string | null
          limitations?: string | null
          matter_id?: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          research_question?: string | null
          short_answer?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_status?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_memos_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_memos_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_memos_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_memos_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      risks: {
        Row: {
          client_id: string | null
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          linked_object_id: string | null
          linked_object_type: string | null
          matter_id: string | null
          metadata: Json | null
          mitigation: string | null
          notes: string | null
          owner_user_id: string | null
          privilege_status: string | null
          risk_title: string | null
          risk_type: string | null
          severity: string | null
          status: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          client_id?: string | null
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          linked_object_id?: string | null
          linked_object_type?: string | null
          matter_id?: string | null
          metadata?: Json | null
          mitigation?: string | null
          notes?: string | null
          owner_user_id?: string | null
          privilege_status?: string | null
          risk_title?: string | null
          risk_type?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          client_id?: string | null
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          linked_object_id?: string | null
          linked_object_type?: string | null
          matter_id?: string | null
          metadata?: Json | null
          mitigation?: string | null
          notes?: string | null
          owner_user_id?: string | null
          privilege_status?: string | null
          risk_title?: string | null
          risk_type?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          client_id: string
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          id: string
          matter_id: string
          metadata: Json | null
          notes: string | null
          privilege_status: string | null
          provided_by: string | null
          received_at: string | null
          source_name: string | null
          source_type: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          client_id: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          matter_id: string
          metadata?: Json | null
          notes?: string | null
          privilege_status?: string | null
          provided_by?: string | null
          received_at?: string | null
          source_name?: string | null
          source_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          client_id?: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          matter_id?: string
          metadata?: Json | null
          notes?: string | null
          privilege_status?: string | null
          provided_by?: string | null
          received_at?: string | null
          source_name?: string | null
          source_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sources_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sources_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sources_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strategy_memos: {
        Row: {
          client_id: string
          confidentiality_status: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          id: string
          matter_id: string
          metadata: Json | null
          model_used: string | null
          notes: string | null
          privilege_status: string | null
          prompt_version: string | null
          research_questions: Json | null
          status: string | null
          strategy_points: Json | null
          title: string | null
          updated_at: string
          updated_by: string | null
          version: number | null
          workflow_origin: string | null
        }
        Insert: {
          client_id: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          matter_id: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          research_questions?: Json | null
          status?: string | null
          strategy_points?: Json | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Update: {
          client_id?: string
          confidentiality_status?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          matter_id?: string
          metadata?: Json | null
          model_used?: string | null
          notes?: string | null
          privilege_status?: string | null
          prompt_version?: string | null
          research_questions?: Json | null
          status?: string | null
          strategy_points?: Json | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number | null
          workflow_origin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_memos_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_memos_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_memos_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_memos_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_matrix_items: {
        Row: {
          assertion_id: string
          client_id: string
          confidentiality_status: string | null
          created_at: string
          created_by: string | null
          evidence_excerpt: string | null
          evidence_id: string | null
          extraction_id: string | null
          frame_reference: string | null
          id: string
          matter_id: string
          metadata: Json | null
          notes: string | null
          page_reference: string | null
          privilege_status: string | null
          risk_level: string | null
          support_explanation: string | null
          support_state: string | null
          timecode_reference: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          assertion_id: string
          client_id: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          evidence_excerpt?: string | null
          evidence_id?: string | null
          extraction_id?: string | null
          frame_reference?: string | null
          id?: string
          matter_id: string
          metadata?: Json | null
          notes?: string | null
          page_reference?: string | null
          privilege_status?: string | null
          risk_level?: string | null
          support_explanation?: string | null
          support_state?: string | null
          timecode_reference?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          assertion_id?: string
          client_id?: string
          confidentiality_status?: string | null
          created_at?: string
          created_by?: string | null
          evidence_excerpt?: string | null
          evidence_id?: string | null
          extraction_id?: string | null
          frame_reference?: string | null
          id?: string
          matter_id?: string
          metadata?: Json | null
          notes?: string | null
          page_reference?: string | null
          privilege_status?: string | null
          risk_level?: string | null
          support_explanation?: string | null
          support_state?: string | null
          timecode_reference?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_matrix_items_assertion_id_fkey"
            columns: ["assertion_id"]
            isOneToOne: false
            referencedRelation: "assertions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matrix_items_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matrix_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matrix_items_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matrix_items_extraction_id_fkey"
            columns: ["extraction_id"]
            isOneToOne: false
            referencedRelation: "evidence_extractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matrix_items_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matrix_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_calls: {
        Row: {
          actor_id: string | null
          actor_type: string | null
          client_id: string | null
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          input_object_refs: Json | null
          input_summary: string | null
          intake_id: string | null
          matter_id: string | null
          metadata: Json | null
          output_object_refs: Json | null
          output_summary: string | null
          started_at: string | null
          status: string | null
          tool_name: string | null
          tool_type: string | null
          workflow: string | null
        }
        Insert: {
          actor_id?: string | null
          actor_type?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_object_refs?: Json | null
          input_summary?: string | null
          intake_id?: string | null
          matter_id?: string | null
          metadata?: Json | null
          output_object_refs?: Json | null
          output_summary?: string | null
          started_at?: string | null
          status?: string | null
          tool_name?: string | null
          tool_type?: string | null
          workflow?: string | null
        }
        Update: {
          actor_id?: string | null
          actor_type?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_object_refs?: Json | null
          input_summary?: string | null
          intake_id?: string | null
          matter_id?: string | null
          metadata?: Json | null
          output_object_refs?: Json | null
          output_summary?: string | null
          started_at?: string | null
          status?: string | null
          tool_name?: string | null
          tool_type?: string | null
          workflow?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_calls_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_calls_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_calls_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          role: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          role?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          role?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      workflow_states: {
        Row: {
          assigned_agent: string | null
          assigned_user_id: string | null
          block_reason: string | null
          blocked_flag: boolean | null
          client_id: string
          created_at: string
          current_workflow: string | null
          id: string
          last_completed_step: string | null
          matter_id: string
          metadata: Json | null
          next_action: string | null
          updated_at: string
          workflow_status: string | null
        }
        Insert: {
          assigned_agent?: string | null
          assigned_user_id?: string | null
          block_reason?: string | null
          blocked_flag?: boolean | null
          client_id: string
          created_at?: string
          current_workflow?: string | null
          id?: string
          last_completed_step?: string | null
          matter_id: string
          metadata?: Json | null
          next_action?: string | null
          updated_at?: string
          workflow_status?: string | null
        }
        Update: {
          assigned_agent?: string | null
          assigned_user_id?: string | null
          block_reason?: string | null
          blocked_flag?: boolean | null
          client_id?: string
          created_at?: string
          current_workflow?: string | null
          id?: string
          last_completed_step?: string | null
          matter_id?: string
          metadata?: Json | null
          next_action?: string | null
          updated_at?: string
          workflow_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_states_assigned_user_id_fkey"
            columns: ["assigned_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_states_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_states_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
