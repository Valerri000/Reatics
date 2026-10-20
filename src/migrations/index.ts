import * as migration_20261020_163439_phase_2_empty_tables from './20261020_163439_phase_2_empty_tables'

export const migrations = [
  {
    up: migration_20261020_163439_phase_2_empty_tables.up,
    down: migration_20261020_163439_phase_2_empty_tables.down,
    name: '20261020_163439_phase_2_empty_tables',
  },
]
