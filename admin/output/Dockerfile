FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/
COPY ./dist /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx/html
COPY ./custom-nginx-file.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]