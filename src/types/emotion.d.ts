/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    // Define tu tema aquí si lo necesitas
    colors: {
      primary: string
      secondary: string
      // etc...
    }
  }
} 