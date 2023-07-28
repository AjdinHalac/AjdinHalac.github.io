export default class ApiErrorResponse {
    public message?: string;
    public params?: string[];
    public fieldErrors?: {
        [key: string]: string;
    };
    public code?: number | null;
    public cause?: string;
    public status: number | null;

    constructor(error: Partial<ApiErrorResponse>, status: number) {
        if (error) {
            this.message = error.message ?? '';
            this.params = error.params ?? [];
            this.fieldErrors = error.fieldErrors ?? {};
            this.code = error.code ?? null;
            this.cause = error.cause ?? '';
        }
        this.status = status;
    }
}
