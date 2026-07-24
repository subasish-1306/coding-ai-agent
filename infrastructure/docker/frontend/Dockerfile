FROM nginx:alpine
COPY infrastructure/docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
