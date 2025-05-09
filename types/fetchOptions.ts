export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?:
    | Record<string, unknown>
    | string
    | FormData
    | URLSearchParams
    | Blob
    | ArrayBuffer
    | null
    | undefined
  params?: Record<string, string | number | boolean | null | undefined>
}
