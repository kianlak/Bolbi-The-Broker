import { getTimestamp } from '../../helper/getTimestamp.ts';

import type { LogType } from './types/LogType.ts';
import type { LogTypeData } from './types/LogTypeData.ts';

export class Logger {
  private readonly styles: Readonly<Record<LogType, LogTypeData>> = {
    INFO:    { color: '\x1b[36m', emoji: 'ℹ️ ' },  // Space needed for console spacing to be aligned
    SUCCESS: { color: '\x1b[32m', emoji: '✅' },
    WARN:    { color: '\x1b[33m', emoji: '⚠️' },
    ERROR:   { color: '\x1b[31m', emoji: '❌' },
  };

  private readonly reset = '\x1b[0m';

  private log(type: LogType, message: string, meta?: unknown) {
    const { color, emoji } = this.styles[type];
    const timestamp = getTimestamp();

    let metaText = '';

    if (meta instanceof Error) {
      metaText = `${meta.stack ?? `${meta.name}: ${meta.message}`}`;
    } else if (meta !== undefined) {
      metaText = ` ${JSON.stringify(meta, null, 2)}`;
    }

    console.log(
      `${color}${emoji} [${type}] ${timestamp} — ${message}${metaText}${this.reset}`
    );
  }

  info(message: string, meta?: unknown) {
    this.log('INFO', message, meta);
  }

  success(message: string, meta?: unknown) {
    this.log('SUCCESS', message, meta);
  }

  warn(message: string, meta?: unknown) {
    this.log('WARN', message, meta);
  }

  error(message: string, meta?: unknown) {
    this.log('ERROR', message, meta);
  }
}
