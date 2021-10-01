export type state = {
    open: number;
    dismissed: dismissed_reason;
}

type dismissed_reason = {
    "total": number;
    "false_positive": number;
    "use_in_tests": number;
    "wont_fix": number;
}