FROM kyma/docker-nginx

MAINTAINER Dmitri Voronianski <dmitri.voronianski@gmail.com>

ADD public/ /var/www

CMD 'nginx'
