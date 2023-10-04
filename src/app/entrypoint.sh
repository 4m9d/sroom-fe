#!/bin/sh

echo "Check that we have NEXT_PUBLIC_GOOGLE_CLIENT_ID vars"
test -n "$NEXT_PUBLIC_GOOGLE_CLIENT_ID"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_GOOGLE_CLIENT_ID#$NEXT_PUBLIC_GOOGLE_CLIENT_ID#g"

test -n "$NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY#$NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY#g"

echo "Starting Nextjs"
exec "$@"
