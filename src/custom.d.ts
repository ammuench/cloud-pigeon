declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

interface Window {
  electronAPI: {
    getProfile: () => Promise<any>; // TODO: Type this
    logOut: () => Promise<void>;
    getPrivateData: () => Promise<any>; // TODO: Type this
  };
}
