declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT: string,
            DB_URI: string
        }
    }
}

export {};
