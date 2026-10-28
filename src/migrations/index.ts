import * as migration_20261020_163439_phase_2_empty_tables from './20261020_163439_phase_2_empty_tables'
import * as migration_20261021_102736_audit_log from './20261021_102736_audit_log'
import * as migration_20261021_161927_media_storage from './20261021_161927_media_storage'
import * as migration_20261021_175842_audit_lock from './20261021_175842_audit_lock'
import * as migration_20261026_102718_marketing_tables from './20261026_102718_marketing_tables'
import * as migration_20261026_104936_social_description from './20261026_104936_social_description'
import * as migration_20261027_040247_rich_text_body from './20261027_040247_rich_text_body'
import * as migration_20261027_052121_publish_status from './20261027_052121_publish_status'
import * as migration_20261028_081144_contact_messages from './20261028_081144_contact_messages'

export const migrations = [
  {
    up: migration_20261020_163439_phase_2_empty_tables.up,
    down: migration_20261020_163439_phase_2_empty_tables.down,
    name: '20261020_163439_phase_2_empty_tables',
  },
  {
    up: migration_20261021_102736_audit_log.up,
    down: migration_20261021_102736_audit_log.down,
    name: '20261021_102736_audit_log',
  },
  {
    up: migration_20261021_161927_media_storage.up,
    down: migration_20261021_161927_media_storage.down,
    name: '20261021_161927_media_storage',
  },
  {
    up: migration_20261021_175842_audit_lock.up,
    down: migration_20261021_175842_audit_lock.down,
    name: '20261021_175842_audit_lock',
  },
  {
    up: migration_20261026_102718_marketing_tables.up,
    down: migration_20261026_102718_marketing_tables.down,
    name: '20261026_102718_marketing_tables',
  },
  {
    up: migration_20261026_104936_social_description.up,
    down: migration_20261026_104936_social_description.down,
    name: '20261026_104936_social_description',
  },
  {
    up: migration_20261027_040247_rich_text_body.up,
    down: migration_20261027_040247_rich_text_body.down,
    name: '20261027_040247_rich_text_body',
  },
  {
    up: migration_20261027_052121_publish_status.up,
    down: migration_20261027_052121_publish_status.down,
    name: '20261027_052121_publish_status',
  },
  {
    up: migration_20261028_081144_contact_messages.up,
    down: migration_20261028_081144_contact_messages.down,
    name: '20261028_081144_contact_messages',
  },
]
