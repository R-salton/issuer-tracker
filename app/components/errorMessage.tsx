


import { Callout } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({children}: PropsWithChildren) => {
    if (!children) {
        return null;
    }
  return (
     <Callout.Root color='red' className="mb-1 text-sm">
        <Callout.Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
        </svg>
        </Callout.Icon>
        <Callout.Text className="text-xs">
               <p className="text-sm">{children}</p>
        </Callout.Text>
    </Callout.Root>
  )
}

export default ErrorMessage