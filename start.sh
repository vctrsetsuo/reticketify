#!/bin/bash

DOCKERCOMPOSECURRENTRELEASENUMBER="$(curl -4 -k --http2 https://github.com/docker/compose/releases | grep -m1 '<a href="/docker/compose/releases/download/' | awk -F/ '{print $6}')"

if [[ ! -f /usr/local/bin/docker-compose ]]; then
    curl -L "https://github.com/docker/compose/releases/download/"$DOCKERCOMPOSECURRENTRELEASENUMBER"/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

docker-compose --version
