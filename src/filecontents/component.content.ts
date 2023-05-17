export const componentContent = (name: string) => {
  return `
    import React from 'react'

    export default function ${name}() {
        return <></>;
    }
    `;
};
