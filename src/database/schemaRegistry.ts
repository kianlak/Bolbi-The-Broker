import type { DatabaseSchema } from './types/DatabaseSchema.ts';

import { usersSchema } from './schemas/users.sqlite.ts';


export const schemaRegistry: DatabaseSchema[] = [
  usersSchema,
];
