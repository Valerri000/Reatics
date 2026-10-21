import * as migration_20261020_163439_phase_2_empty_tables from './20261020_163439_phase_2_empty_tables'
import * as migration_20261021_102736_audit_log from './20261021_102736_audit_log'

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
]
