FROM mysql:8.0.41

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=user
ENV MYSQL_USER=app
ENV MYSQL_PASSWORD=app

COPY ./script /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]
