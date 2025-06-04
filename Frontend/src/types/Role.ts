export const Role = {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER',
  TEAMLEADER: 'TEAMLEADER',
} as const;

export type Role = typeof Role[keyof typeof Role];

