#!/bin/bash
yum -y update
yum -y install nginx

www_path='/usr/share/nginx/html'

chown -R root:www-data "${www_path}"
chmod 2775 "${www_path}"

find "${www_path}" -type d -exec chmod 2775 {} +
find "${www_path}" -type f -exec chmod 0664 {} +

service nginx start
/sbin/chkconfig nginx on
