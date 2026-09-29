import { Handler } from "@/main";
import busboy from "busboy";

export default function (options?: {
  limits?: {
    fileSize?: number; // Max file size in bytes (e.g., 10 * 1024 * 1024 for 10MB)
    files?: number; // Max number of file uploads
    fields?: number; // Max number of non-file fields
  };
}) {
  return Handler(async ({ req }) => {
    return new Promise((resolve, reject) => {
      const bb = busboy({
        headers: req.raw.headers,
        limits: options?.limits ?? {
          fileSize: 10 * 1024 * 1024, // Default: 10MB limit per file
          files: 5,
        },
      });

      const body: Record<string, any> = {};
      const files: Record<string, any[]> = {};
      let limitExceeded = false;

      bb.on("field", (name, val) => {
        body[name] = val;
      });

      bb.on("file", (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        const chunks: Buffer[] = [];

        file.on("data", (chunk) => {
          chunks.push(chunk);
        });

        file.on("limit", () => {
          limitExceeded = true;
          file.resume();
          reject(new Error(`File upload limit exceeded for "${name}"`));
        });

        file.on("end", () => {
          if (limitExceeded) return;
          if (!files[name]) files[name] = [];
          files[name].push({
            filename,
            encoding,
            mimeType,
            data: Buffer.concat(chunks),
          });
        });
      });

      bb.on("close", () => {
        if (!limitExceeded) {
          req.body = { ...body, ...files };
          resolve(undefined);
        }
      });

      bb.on("error", (err) => {
        reject(err);
      });

      req.raw.pipe(bb);
    });
  });
}
