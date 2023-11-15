#!/usr/bin/env bash

OLD_GID=$(id -g node)
OLD_UID=$(id -u node)

groupmod -o -g ${GID} node
usermod -o -u ${UID} node

find / -xdev -gid ${OLD_GID} | xargs -r chown -h :node
find / -xdev -uid ${OLD_UID} | xargs -r chown -h node

exec /usr/local/bin/docker-entrypoint.sh "$@"
