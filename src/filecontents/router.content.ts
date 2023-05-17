export const routerContent = (name: string, type: ".js" | ".ts") => {
  return `
    ${
      type === ".ts"
        ? `import type { RouteObject } from "react-router-dom";`
        : ``
    }

    export const ${name}Routes${type === ".ts" ? `: RouteObject[]` : ``} = [{}]
    `;
};
