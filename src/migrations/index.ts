import * as migration_20261020_163439_phase_2_empty_tables from './20261020_163439_phase_2_empty_tables'
import * as migration_20261021_102736_audit_log from './20261021_102736_audit_log'
import * as migration_20261021_161927_media_storage from './20261021_161927_media_storage'
import * as migration_20261021_175842_audit_lock from './20261021_175842_audit_lock'
import * as migration_20261026_102718_marketing_tables from './20261026_102718_marketing_tables'
import * as migration_20261026_104936_social_description from './20261026_104936_social_description'

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
]
