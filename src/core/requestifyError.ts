export class RequestifyError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "RequestifyError";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RequestifyError);
		}
	}
}
