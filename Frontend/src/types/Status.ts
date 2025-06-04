// export type Status = "NOT_STARTED" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";

export const Status = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DELAYED: 'DELAYED',
} as const;

export type Status = typeof Status[keyof typeof Status];