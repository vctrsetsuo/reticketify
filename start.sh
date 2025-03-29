#!/bin/bash

echo
docker --version

echo
docker-compose --version

echo
echo "Digite a URL para o Webhook:"
read valor

# Definindo a variável
export WEBHOOK_URL=$valor

# Confirmando
echo
echo "WEBHOOK_URL foi definida como: $WEBHOOK_URL"

echo
docker-compose up -d