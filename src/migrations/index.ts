import * as migration_20251231_055556 from './20251231_055556';

export const migrations = [
  {
    up: migration_20251231_055556.up,
    down: migration_20251231_055556.down,
    name: '20251231_055556'
  },
];
