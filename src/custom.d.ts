declare module "*.svg" {
  const content: any;
  export default content;
}

interface Window {
  electronAPI: {
    getProfile: () => Promise<any>; // TODO: Type this
    logOut: () => Promise<void>;
    getPrivateData: () => Promise<any>; // TODO: Type this
  };
}
