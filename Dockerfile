FROM nginx:stable
RUN mkdir /usr/share/nginx/html/jcapph5 && mkdir /usr/share/nginx/html/jcapph5/build
COPY build /usr/share/nginx/html/jcapph5/build
RUN chmod -R 777 /usr/share/nginx/html
