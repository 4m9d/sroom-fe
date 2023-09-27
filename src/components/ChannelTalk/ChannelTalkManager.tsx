'use client';
import { bootChannelTalk } from '@/src/util/channelTalk/channelTalk';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ChannelTalkManager({ children }: Props) {
  const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string;

  useEffect(() => {
    bootChannelTalk({
      pluginKey
    });

    return () => {
      window.ChannelIO?.('shutdown');
    };
  }, [pluginKey]);

  return <>{children}</>;
}
