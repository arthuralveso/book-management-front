FROM node:16.14.2-slim AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG BACKEND_URL=http://192.168.1.10:3333
ENV REACT_APP_BACKEND_URL=$BACKEND_URL
RUN echo "BACKEND_URL = $BACKEND_URL"

RUN npm run build

FROM nginx AS server
COPY --from=builder /app/build /usr/share/nginx/html