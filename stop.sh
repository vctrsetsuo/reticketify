docker-compose down
docker volume rm $(docker volume ls -q | grep ^reticketify)
docker rmi $(docker images 'reticketify*' -q)

