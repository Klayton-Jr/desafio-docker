FROM mysql:5.7

USER mysql

CMD [ "--innodb-use-native-aio=0" ]

ENV MYSQL_ROOT_PASSWORD=change-me
ENV MYSQL_DATABASE=nodedb

COPY setup.sql /docker-entrypoint-initdb.d/