export interface Rule {
    className: string;
    name: string;
    comment: string;
    rule: () => true | { voiceIndex: number; noteIndex: number };
}