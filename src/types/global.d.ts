/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="gatsby" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    GATSBY_RPC_URL: string
    GATSBY_RPC_WS: string
    REACT_APP_BASE_URL: string
    SOLE_NETWORK: string
    REACT_APP_SENTRY_DSN: string
    REACT_APP_SENTRY_ENVIRONMENT: string
    SENTRY_PROJECT: string
    REACT_APP_GA_ID: string
    REACT_APP_RPC_ENDPOINT: string
    [key: string]: string | undefined
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
} 