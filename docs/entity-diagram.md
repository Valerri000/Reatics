# Reatics 1.0 entity diagram

Reviewed October 26, 2026, against the approved scope. SEO fields are stored on pages, listings, posts, glossary terms, cities, and property types. A changed slug is stored in redirects as a 301. Inquiries are named here and are not a table yet. The Phase 2 tables were added empty on October 20, 2026. Marketing collections were added on October 26, 2026.

```mermaid
erDiagram
  users ||--o{ listings : lists
  users ||--o{ billing : records
  users ||--o{ inquiries : sends
  listings ||--o{ inquiries : receives
  listings }o--o{ media : shows
  pages }o--o{ media : shows
  pages ||--o{ redirects : replaces
  listings ||--o{ redirects : replaces

  users {
    string email
    string role
    string adminRole
  }

  pages {
    string title
    string slug
    string content
    string pageTitle
    string metaDescription
    string robots
    string canonicalUrl
    string h1
    string imageAlt
    string socialTitle
    string socialDescription
    bool sitemap
  }

  listings {
    string title
    string kind
    number price
    string street
    string city
    string state
    string postalCode
    string propertyType
    int photo
    string slug
    string pageTitle
    string metaDescription
    string robots
    string canonicalUrl
    string h1
    string imageAlt
    string socialTitle
    string socialDescription
    bool sitemap
  }

  media {
    string alt
    file upload
  }

  billing {
    string action
    number amount
    string note
  }

  redirects {
    string fromPath
    string toPath
    int statusCode
  }

  inquiries {
    string name
    string email
    string message
    int listing
  }
```

`seo` is a set of fields on `pages`, `listings`, `posts`, `glossary`, `cities`, and `property-types`, not its own table. The fields are slug, pageTitle, metaDescription, robots, canonicalUrl, h1, imageAlt, socialTitle, socialDescription, and sitemap. `robots` is index or noindex. `sitemap` says whether the record is included.

## Names kept

- Product role stays on `users.role`: space-seeker, broker, owner, broker-owner, coworking.
- Admin role stays on `users.adminRole`: owner, content-manager, moderator. There is no `roles` table.
- `owner` on `users.role` is Owner with listings. `owner` on `users.adminRole` is the staff Owner.
- `media` stays `media`. `billing` stays `billing`.
- `redirects.statusCode` is 301. A changed slug and a later move from the old domain use this one table.
- `inquiries` stores name, email, message, and an optional listing. It does not store providerPhone or providerEmail.

## Audit log

`audit-log` stores the time, actor, action, and target for a sign-in, a role change, and a deleted record. The Owner can read it.

```mermaid
erDiagram
  users ||--o{ audit_log : audits

  audit_log {
    int actor
    string action
    string target
  }
```

`audit-log` is `audit_log` in the drawing.

## Phase 2, empty

companies, company-members, deals, deal-participants, screening-requests, lease-drafts, signed-documents.

These tables are empty. A deal can be created by hand in the admin. There are no landlord or applicant screens.

```mermaid
erDiagram
  companies ||--o{ company_members : includes
  users ||--o{ company_members : joins
  companies ||--o{ deals : opens
  listings ||--o{ deals : concerns
  deals ||--o{ deal_participants : includes
  users ||--o{ deal_participants : joins
  deals ||--o{ screening_requests : requests
  deals ||--o{ lease_drafts : drafts
  lease_drafts ||--o{ signed_documents : files
  signed_documents }o--o| media : stores

  companies {
    string name
  }

  company_members {
    int company
    int user
  }

  deals {
    string title
    int company
    int listing
  }

  deal_participants {
    int deal
    int user
  }

  screening_requests {
    int deal
    string note
  }

  lease_drafts {
    string title
    int deal
  }

  signed_documents {
    string title
    int leaseDraft
    int file
  }
```

`company-members` is `company_members` in the drawing. `deal-participants` is `deal_participants`. `screening-requests` is `screening_requests`. `lease-drafts` is `lease_drafts`. `signed-documents` is `signed_documents`.

`users`, `pages`, `posts`, `glossary`, `cities`, `property-types`, `listings`, `media`, `billing`, `redirects`, and `audit-log` are tables. SEO fields are stored on `pages`, `listings`, `posts`, `glossary`, `cities`, and `property-types`. `inquiries` is named here and is not a table yet. `companies`, `company-members`, `deals`, `deal-participants`, `screening-requests`, `lease-drafts`, and `signed-documents` are Phase 2, empty.

## Marketing collections

posts, glossary, cities, and property-types. A content manager can edit them. A moderator cannot. Each slug is unique inside its collection.

```mermaid
erDiagram
  posts {
    string title
    string slug
    string content
  }

  glossary {
    string term
    string slug
    string definition
  }

  cities {
    string title
    string slug
    string content
  }

  property_types {
    string title
    string slug
    string content
  }
```

`property-types` is `property_types` in the drawing.

## Publish

pages, posts, glossary, cities, and property-types have a status of draft or published. The body is rich text. A post also has publishedOn and an author.

## Not in this diagram

saved-searches, alerts, favorites, prospects, ads, referrals.
