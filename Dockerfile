# stage 1
FROM node:12.7-alpine
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --silent
COPY . .
RUN node_modules/.bin/ng build --prod --output-path=/dist

# stage 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# WORKDIR /usr/src/app
# RUN rm -rf /usr/share/nginx/html/*
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
