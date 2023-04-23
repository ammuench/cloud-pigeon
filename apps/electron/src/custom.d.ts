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
    getProfile: () => Promise<any>;
    logOut: () => Promise<void>;
    exit: () => Promise<void>;
    getPrivateData: () => Promise<any>;
  };
}
