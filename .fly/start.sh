#!/bin/sh

set -ex

if [ -n $MIGRATE_ON_BOOT ]; then
  $(dirname $0)/migrate.sh
fi

# npx rw-server --port ${PORT} $@
node ./node_modules/.bin/rw-serve-fe &
node ./node_modules/.bin/rw-server api
