export const routerContent = (name: string) => {
  return `
    import type { RouteObject } from "react-router-dom";

    export const ${name}Routes: RouteObject[] = [{}]
    `;
};
