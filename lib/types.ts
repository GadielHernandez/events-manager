export enum EVENT_TYPES {
    XV = 'XV',
    WEDDING = 'Boda',
    BIRTHDAY = 'Cumpleaños',
    OTHER = 'Otro',
}

export const EVENT_TYPES_COLORS: Record<EVENT_TYPES, string> = {
    [EVENT_TYPES.XV]: '2',
    [EVENT_TYPES.WEDDING]: '3',
    [EVENT_TYPES.BIRTHDAY]: '4',
    [EVENT_TYPES.OTHER]: '5',
}
