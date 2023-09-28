declare global {
  interface Window {
    ChannelIO?: IChannelIO;
    ChannelIOInitialized?: boolean;
  }
}

export function bootChannelTalk(option: BootOption, callback?: Callback) {
  window.ChannelIO?.('boot', option, callback);
}

export function showChannelTalkButton() {
  window.ChannelIO?.('showChannelButton');
}

export function hideChannelTalkButton() {
  window.ChannelIO?.('hideChannelButton');
}
