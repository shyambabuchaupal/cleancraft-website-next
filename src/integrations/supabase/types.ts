export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_permissions: {
        Row: {
          action: string | null
          action_parameters: Json | null
          conditions: Json | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          properties: Json | null
          published_at: string | null
          subject: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          action_parameters?: Json | null
          conditions?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          properties?: Json | null
          published_at?: string | null
          subject?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          action_parameters?: Json | null
          conditions?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          properties?: Json | null
          published_at?: string | null
          subject?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_permissions_role_lnk: {
        Row: {
          id: number
          permission_id: number | null
          permission_ord: number | null
          role_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_ord?: number | null
          role_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_ord?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_role_links_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "admin_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_role_lnk_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "admin_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_role_lnk_ifk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_roles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          blocked: boolean | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          email: string | null
          firstname: string | null
          id: number
          is_active: boolean | null
          lastname: string | null
          locale: string | null
          password: string | null
          prefered_language: string | null
          published_at: string | null
          registration_token: string | null
          reset_password_token: string | null
          updated_at: string | null
          updated_by_id: number | null
          username: string | null
        }
        Insert: {
          blocked?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean | null
          lastname?: string | null
          locale?: string | null
          password?: string | null
          prefered_language?: string | null
          published_at?: string | null
          registration_token?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Update: {
          blocked?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean | null
          lastname?: string | null
          locale?: string | null
          password?: string | null
          prefered_language?: string | null
          published_at?: string | null
          registration_token?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users_roles_lnk: {
        Row: {
          id: number
          role_id: number | null
          role_ord: number | null
          user_id: number | null
          user_ord: number | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          role_ord?: number | null
          user_id?: number | null
          user_ord?: number | null
        }
        Update: {
          id?: number
          role_id?: number | null
          role_ord?: number | null
          user_id?: number | null
          user_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_roles_links_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_roles_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_roles_lnk_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_roles_lnk_ifk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_categories_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_categories_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories_country_lnk: {
        Row: {
          blog_category_id: number | null
          country_id: number | null
          id: number
        }
        Insert: {
          blog_category_id?: number | null
          country_id?: number | null
          id?: number
        }
        Update: {
          blog_category_id?: number | null
          country_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_categories_country_lnk_fk"
            columns: ["blog_category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_categories_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          excerpt: string | null
          id: number
          is_featured: boolean | null
          locale: string | null
          published_at: string | null
          published_date: string | null
          slug: string | null
          title: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          excerpt?: string | null
          id?: number
          is_featured?: boolean | null
          locale?: string | null
          published_at?: string | null
          published_date?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          excerpt?: string | null
          id?: number
          is_featured?: boolean | null
          locale?: string | null
          published_at?: string | null
          published_date?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blogs_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs_author_lnk: {
        Row: {
          blog_id: number | null
          id: number
          user_id: number | null
        }
        Insert: {
          blog_id?: number | null
          id?: number
          user_id?: number | null
        }
        Update: {
          blog_id?: number | null
          id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_author_lnk_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blogs_author_lnk_ifk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs_blog_categories_lnk: {
        Row: {
          blog_category_id: number | null
          blog_category_ord: number | null
          blog_id: number | null
          blog_ord: number | null
          id: number
        }
        Insert: {
          blog_category_id?: number | null
          blog_category_ord?: number | null
          blog_id?: number | null
          blog_ord?: number | null
          id?: number
        }
        Update: {
          blog_category_id?: number | null
          blog_category_ord?: number | null
          blog_id?: number | null
          blog_ord?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "blogs_blog_categories_lnk_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blogs_blog_categories_lnk_ifk"
            columns: ["blog_category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs_cmps: {
        Row: {
          cmp_id: number | null
          component_type: string | null
          entity_id: number | null
          field: string | null
          id: number
          order: number | null
        }
        Insert: {
          cmp_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Update: {
          cmp_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs_country_lnk: {
        Row: {
          blog_id: number | null
          blog_ord: number | null
          country_id: number | null
          id: number
        }
        Insert: {
          blog_id?: number | null
          blog_ord?: number | null
          country_id?: number | null
          id?: number
        }
        Update: {
          blog_id?: number | null
          blog_ord?: number | null
          country_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "blogs_country_lnk_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blogs_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      components_seo_seos: {
        Row: {
          id: number
          meta_description: string | null
          meta_title: string | null
        }
        Insert: {
          id?: number
          meta_description?: string | null
          meta_title?: string | null
        }
        Update: {
          id?: number
          meta_description?: string | null
          meta_title?: string | null
        }
        Relationships: []
      }
      cookie_consents: {
        Row: {
          analytics: boolean | null
          country_code: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          essential: boolean | null
          id: number
          ip_address: string | null
          locale: string | null
          marketing: boolean | null
          preferences: boolean | null
          published_at: string | null
          session_id: string | null
          text: string | null
          updated_at: string | null
          updated_by_id: number | null
          user_agent: string | null
          uuid: string | null
        }
        Insert: {
          analytics?: boolean | null
          country_code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          essential?: boolean | null
          id?: number
          ip_address?: string | null
          locale?: string | null
          marketing?: boolean | null
          preferences?: boolean | null
          published_at?: string | null
          session_id?: string | null
          text?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          user_agent?: string | null
          uuid?: string | null
        }
        Update: {
          analytics?: boolean | null
          country_code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          essential?: boolean | null
          id?: number
          ip_address?: string | null
          locale?: string | null
          marketing?: boolean | null
          preferences?: boolean | null
          published_at?: string | null
          session_id?: string | null
          text?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          user_agent?: string | null
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cookie_consents_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cookie_consents_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          is_active: boolean | null
          locale: string | null
          name: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          is_active?: boolean | null
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          is_active?: boolean | null
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "countries_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries_default_locale_lnk: {
        Row: {
          country_id: number | null
          id: number
          locale_id: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          locale_id?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          locale_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_default_locale_links_fk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "countries_default_locale_links_inv_fk"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "countries_default_locale_lnk_fk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "countries_default_locale_lnk_ifk"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: Json | null
          category: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          order: number | null
          published_at: string | null
          question: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          answer?: Json | null
          category?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          order?: number | null
          published_at?: string | null
          question?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          answer?: Json | null
          category?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          order?: number | null
          published_at?: string | null
          question?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faqs_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs_country_lnk: {
        Row: {
          country_id: number | null
          faq_id: number | null
          faq_ord: number | null
          id: number
        }
        Insert: {
          country_id?: number | null
          faq_id?: number | null
          faq_ord?: number | null
          id?: number
        }
        Update: {
          country_id?: number | null
          faq_id?: number | null
          faq_ord?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "faqs_country_lnk_fk"
            columns: ["faq_id"]
            isOneToOne: false
            referencedRelation: "faqs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faqs_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          alternative_text: string | null
          caption: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          ext: string | null
          folder_path: string | null
          formats: Json | null
          hash: string | null
          height: number | null
          id: number
          locale: string | null
          mime: string | null
          name: string | null
          preview_url: string | null
          provider: string | null
          provider_metadata: Json | null
          published_at: string | null
          size: number | null
          updated_at: string | null
          updated_by_id: number | null
          url: string | null
          width: number | null
        }
        Insert: {
          alternative_text?: string | null
          caption?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          ext?: string | null
          folder_path?: string | null
          formats?: Json | null
          hash?: string | null
          height?: number | null
          id?: number
          locale?: string | null
          mime?: string | null
          name?: string | null
          preview_url?: string | null
          provider?: string | null
          provider_metadata?: Json | null
          published_at?: string | null
          size?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
          url?: string | null
          width?: number | null
        }
        Update: {
          alternative_text?: string | null
          caption?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          ext?: string | null
          folder_path?: string | null
          formats?: Json | null
          hash?: string | null
          height?: number | null
          id?: number
          locale?: string | null
          mime?: string | null
          name?: string | null
          preview_url?: string | null
          provider?: string | null
          provider_metadata?: Json | null
          published_at?: string | null
          size?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
          url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "files_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      files_folder_lnk: {
        Row: {
          file_id: number | null
          file_ord: number | null
          folder_id: number | null
          id: number
        }
        Insert: {
          file_id?: number | null
          file_ord?: number | null
          folder_id?: number | null
          id?: number
        }
        Update: {
          file_id?: number | null
          file_ord?: number | null
          folder_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "files_folder_links_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_folder_links_inv_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_folder_lnk_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_folder_lnk_ifk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      files_related_mph: {
        Row: {
          field: string | null
          file_id: number | null
          id: number
          order: number | null
          related_id: number | null
          related_type: string | null
        }
        Insert: {
          field?: string | null
          file_id?: number | null
          id?: number
          order?: number | null
          related_id?: number | null
          related_type?: string | null
        }
        Update: {
          field?: string | null
          file_id?: number | null
          id?: number
          order?: number | null
          related_id?: number | null
          related_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_related_morphs_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_related_mph_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      franchise_leads: {
        Row: {
          city: string | null
          country: string
          created_at: string
          email: string
          id: string
          investment_range: string | null
          lead_type: string
          name: string
          phone: string
          source_cta: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          country?: string
          created_at?: string
          email: string
          id?: string
          investment_range?: string | null
          lead_type?: string
          name: string
          phone: string
          source_cta?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          country?: string
          created_at?: string
          email?: string
          id?: string
          investment_range?: string | null
          lead_type?: string
          name?: string
          phone?: string
          source_cta?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      i18n_locale: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "i18n_locale_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "i18n_locale_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      locales: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          is_default: boolean | null
          locale: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          is_default?: boolean | null
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          is_default?: boolean | null
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "locales_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locales_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      locales_country_lnk: {
        Row: {
          country_id: number | null
          id: number
          locale_id: number | null
          locale_ord: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          locale_id?: number | null
          locale_ord?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          locale_id?: number | null
          locale_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "locales_country_links_fk"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locales_country_links_inv_fk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locales_country_lnk_fk"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locales_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string | null
          title: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_cmps: {
        Row: {
          cmp_id: number | null
          component_type: string | null
          entity_id: number | null
          field: string | null
          id: number
          order: number | null
        }
        Insert: {
          cmp_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Update: {
          cmp_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_country_lnk: {
        Row: {
          country_id: number | null
          id: number
          page_id: number | null
          page_ord: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          page_id?: number | null
          page_ord?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          page_id?: number | null
          page_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_country_links_fk"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_country_links_inv_fk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_country_lnk_fk"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      policies_country_lnk: {
        Row: {
          country_id: number | null
          id: number
          policy_id: number | null
          policy_ord: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          policy_id?: number | null
          policy_ord?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          policy_id?: number | null
          policy_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_country_lnk_fk"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          description: string | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          price_from: number | null
          published_at: string | null
          slug: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          price_from?: number | null
          published_at?: string | null
          slug?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          price_from?: number | null
          published_at?: string | null
          slug?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "services_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      services_country_lnk: {
        Row: {
          country_id: number | null
          id: number
          service_id: number | null
          service_ord: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          service_id?: number | null
          service_ord?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          service_id?: number | null
          service_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "services_country_lnk_fk"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_token_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_token_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_token_permissions_token_lnk: {
        Row: {
          api_token_id: number | null
          api_token_permission_id: number | null
          api_token_permission_ord: number | null
          id: number
        }
        Insert: {
          api_token_id?: number | null
          api_token_permission_id?: number | null
          api_token_permission_ord?: number | null
          id?: number
        }
        Update: {
          api_token_id?: number | null
          api_token_permission_id?: number | null
          api_token_permission_ord?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_token_permissions_token_links_fk"
            columns: ["api_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_token_links_inv_fk"
            columns: ["api_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_token_lnk_fk"
            columns: ["api_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_token_lnk_ifk"
            columns: ["api_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_tokens: {
        Row: {
          access_key: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          document_id: string | null
          encrypted_key: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          lifespan: number | null
          locale: string | null
          name: string | null
          published_at: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          encrypted_key?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          locale?: string | null
          name?: string | null
          published_at?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          encrypted_key?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          locale?: string | null
          name?: string | null
          published_at?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_tokens_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_tokens_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_core_store_settings: {
        Row: {
          environment: string | null
          id: number
          key: string | null
          tag: string | null
          type: string | null
          value: string | null
        }
        Insert: {
          environment?: string | null
          id?: number
          key?: string | null
          tag?: string | null
          type?: string | null
          value?: string | null
        }
        Update: {
          environment?: string | null
          id?: number
          key?: string | null
          tag?: string | null
          type?: string | null
          value?: string | null
        }
        Relationships: []
      }
      strapi_database_schema: {
        Row: {
          hash: string | null
          id: number
          schema: Json | null
          time: string | null
        }
        Insert: {
          hash?: string | null
          id?: number
          schema?: Json | null
          time?: string | null
        }
        Update: {
          hash?: string | null
          id?: number
          schema?: Json | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_history_versions: {
        Row: {
          content_type: string
          created_at: string | null
          created_by_id: number | null
          data: Json | null
          id: number
          locale: string | null
          related_document_id: string | null
          schema: Json | null
          status: string | null
        }
        Insert: {
          content_type: string
          created_at?: string | null
          created_by_id?: number | null
          data?: Json | null
          id?: number
          locale?: string | null
          related_document_id?: string | null
          schema?: Json | null
          status?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          created_by_id?: number | null
          data?: Json | null
          id?: number
          locale?: string | null
          related_document_id?: string | null
          schema?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_history_versions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_migrations: {
        Row: {
          id: number
          name: string | null
          time: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_migrations_internal: {
        Row: {
          id: number
          name: string | null
          time: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_release_actions: {
        Row: {
          content_type: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          entry_document_id: string | null
          id: number
          is_entry_valid: boolean | null
          locale: string | null
          published_at: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          entry_document_id?: string | null
          id?: number
          is_entry_valid?: boolean | null
          locale?: string | null
          published_at?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          entry_document_id?: string | null
          id?: number
          is_entry_valid?: boolean | null
          locale?: string | null
          published_at?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_release_actions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_release_actions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_release_actions_release_lnk: {
        Row: {
          id: number
          release_action_id: number | null
          release_action_ord: number | null
          release_id: number | null
        }
        Insert: {
          id?: number
          release_action_id?: number | null
          release_action_ord?: number | null
          release_id?: number | null
        }
        Update: {
          id?: number
          release_action_id?: number | null
          release_action_ord?: number | null
          release_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_release_actions_release_lnk_fk"
            columns: ["release_action_id"]
            isOneToOne: false
            referencedRelation: "strapi_release_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_release_actions_release_lnk_ifk"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "strapi_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_releases: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          released_at: string | null
          scheduled_at: string | null
          status: string | null
          timezone: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          released_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          released_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_releases_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_releases_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_token_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_token_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_token_permissions_token_lnk: {
        Row: {
          id: number
          transfer_token_id: number | null
          transfer_token_permission_id: number | null
          transfer_token_permission_ord: number | null
        }
        Insert: {
          id?: number
          transfer_token_id?: number | null
          transfer_token_permission_id?: number | null
          transfer_token_permission_ord?: number | null
        }
        Update: {
          id?: number
          transfer_token_id?: number | null
          transfer_token_permission_id?: number | null
          transfer_token_permission_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_links_fk"
            columns: ["transfer_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_links_inv_fk"
            columns: ["transfer_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_lnk_fk"
            columns: ["transfer_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_lnk_ifk"
            columns: ["transfer_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_tokens: {
        Row: {
          access_key: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          document_id: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          lifespan: number | null
          locale: string | null
          name: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_tokens_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_tokens_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_webhooks: {
        Row: {
          enabled: boolean | null
          events: Json | null
          headers: Json | null
          id: number
          name: string | null
          url: string | null
        }
        Insert: {
          enabled?: boolean | null
          events?: Json | null
          headers?: Json | null
          id?: number
          name?: string | null
          url?: string | null
        }
        Update: {
          enabled?: boolean | null
          events?: Json | null
          headers?: Json | null
          id?: number
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      strapi_workflows: {
        Row: {
          content_types: Json | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          content_types?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          content_types?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_workflows_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_workflows_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_workflows_stage_required_to_publish_lnk: {
        Row: {
          id: number
          workflow_id: number | null
          workflow_stage_id: number | null
        }
        Insert: {
          id?: number
          workflow_id?: number | null
          workflow_stage_id?: number | null
        }
        Update: {
          id?: number
          workflow_id?: number | null
          workflow_stage_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_workflows_stage_required_to_publish_lnk_fk"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "strapi_workflows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_workflows_stage_required_to_publish_lnk_ifk"
            columns: ["workflow_stage_id"]
            isOneToOne: false
            referencedRelation: "strapi_workflows_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_workflows_stages: {
        Row: {
          color: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_workflows_stages_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_workflows_stages_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_workflows_stages_permissions_lnk: {
        Row: {
          id: number
          permission_id: number | null
          permission_ord: number | null
          workflow_stage_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_ord?: number | null
          workflow_stage_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_ord?: number | null
          workflow_stage_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_workflows_stages_permissions_lnk_fk"
            columns: ["workflow_stage_id"]
            isOneToOne: false
            referencedRelation: "strapi_workflows_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_workflows_stages_permissions_lnk_ifk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "admin_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_workflows_stages_workflow_lnk: {
        Row: {
          id: number
          workflow_id: number | null
          workflow_stage_id: number | null
          workflow_stage_ord: number | null
        }
        Insert: {
          id?: number
          workflow_id?: number | null
          workflow_stage_id?: number | null
          workflow_stage_ord?: number | null
        }
        Update: {
          id?: number
          workflow_id?: number | null
          workflow_stage_id?: number | null
          workflow_stage_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_workflows_stages_workflow_lnk_fk"
            columns: ["workflow_stage_id"]
            isOneToOne: false
            referencedRelation: "strapi_workflows_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_workflows_stages_workflow_lnk_ifk"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "strapi_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          platform: string | null
          published_at: string | null
          rating: number | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          platform?: string | null
          published_at?: string | null
          rating?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          platform?: string | null
          published_at?: string | null
          rating?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials_country_lnk: {
        Row: {
          country_id: number | null
          id: number
          testimonial_id: number | null
          testimonial_ord: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          testimonial_id?: number | null
          testimonial_ord?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          testimonial_id?: number | null
          testimonial_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_country_lnk_fk"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_country_lnk_ifk"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      up_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_permissions_role_lnk: {
        Row: {
          id: number
          permission_id: number | null
          permission_ord: number | null
          role_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_ord?: number | null
          role_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_ord?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_permissions_role_links_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "up_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_role_lnk_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "up_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_role_lnk_ifk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      up_roles: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          description: string | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          published_at: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          published_at?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_roles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_roles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_users: {
        Row: {
          blocked: boolean | null
          confirmation_token: string | null
          confirmed: boolean | null
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          email: string | null
          id: number
          locale: string | null
          password: string | null
          provider: string | null
          published_at: string | null
          reset_password_token: string | null
          updated_at: string | null
          updated_by_id: number | null
          username: string | null
        }
        Insert: {
          blocked?: boolean | null
          confirmation_token?: string | null
          confirmed?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          email?: string | null
          id?: number
          locale?: string | null
          password?: string | null
          provider?: string | null
          published_at?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Update: {
          blocked?: boolean | null
          confirmation_token?: string | null
          confirmed?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          email?: string | null
          id?: number
          locale?: string | null
          password?: string | null
          provider?: string | null
          published_at?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "up_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_users_role_lnk: {
        Row: {
          id: number
          role_id: number | null
          user_id: number | null
          user_ord: number | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          user_id?: number | null
          user_ord?: number | null
        }
        Update: {
          id?: number
          role_id?: number | null
          user_id?: number | null
          user_ord?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_users_role_links_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "up_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_role_lnk_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "up_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_role_lnk_ifk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_folders: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          document_id: string | null
          id: number
          locale: string | null
          name: string | null
          path: string | null
          path_id: number | null
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          path?: string | null
          path_id?: number | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          document_id?: string | null
          id?: number
          locale?: string | null
          name?: string | null
          path?: string | null
          path_id?: number | null
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_folders_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_folders_parent_lnk: {
        Row: {
          folder_id: number | null
          folder_ord: number | null
          id: number
          inv_folder_id: number | null
        }
        Insert: {
          folder_id?: number | null
          folder_ord?: number | null
          id?: number
          inv_folder_id?: number | null
        }
        Update: {
          folder_id?: number | null
          folder_ord?: number | null
          id?: number
          inv_folder_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_folders_parent_links_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_parent_links_inv_fk"
            columns: ["inv_folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_parent_lnk_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_parent_lnk_ifk"
            columns: ["inv_folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
