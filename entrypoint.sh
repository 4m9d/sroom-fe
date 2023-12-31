#!/bin/sh

echo "Check that we have NEXTAUTH_SECRET"
test -n "$NEXTAUTH_SECRET"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXTAUTH_SECRET#$NEXTAUTH_SECRET#g"

echo "Check that we have NEXT_PUBLIC_GOOGLE_CLIENT_ID"
test -n "$NEXT_PUBLIC_GOOGLE_CLIENT_ID"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_GOOGLE_CLIENT_ID#$NEXT_PUBLIC_GOOGLE_CLIENT_ID#g"

echo "Check that we have NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY"
test -n "$NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY#$NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY#g"

echo "Check that we have NEXT_PUBLIC_SENTRY_DSN"
test -n "$NEXT_PUBLIC_SENTRY_DSN"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_SENTRY_DSN#$NEXT_PUBLIC_SENTRY_DSN#g"

echo "Starting Nextjs"
exec "$@"
