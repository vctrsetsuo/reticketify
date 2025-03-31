#!/bin/bash
echo
echo Parando os containers...
docker-compose down

echo
echo Removendo os volumes...
docker volume rm $(docker volume ls -q | grep ^reticketify)

echo
echo Removendo as imagens...
docker rmi $(docker images 'reticketify*' -q)

