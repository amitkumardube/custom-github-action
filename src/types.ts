export type state = {
    branch: string;
    open: number;
    dismissed: dismissed_reason;
}

type dismissed_reason = {
    "total": number;
    "false_positive": number;
    "use_in_tests": number;
    "wont_fix": number;
}

export type secret_state = {
    open: number;
    resolved: resolution_reason;
}

type resolution_reason = {
    "total": number;
    "false_positive": number;
    "use_in_tests": number;
    "wont_fix": number;
    "revoked": number;
}