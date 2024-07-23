declare global {
  interface Window {
    tizen: any;
    webapis: any;
    webOS: any;
    webOSDev: any;

    webkitRTCPeerConnection?: any;
    mozRTCPeerConnection?: any;
  }

  type Any = any;
}

export {};
