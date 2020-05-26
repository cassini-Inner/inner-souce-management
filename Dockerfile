# Stage 1
FROM node as react-build
WORKDIR /innersource
COPY . ./
RUN npm install
ARG API_URL
ARG CLIENT_ID
ARG GITHUB_DOMAIN
ARG GRAPH_API_URL

ENV API_URL ${API_URL}
ENV CLIENT_ID ${CLIENT_ID}
ENV GRAPH_API_URL ${GRAPH_API_URL}
ENV GITHUB_DOMAIN ${GITHUB_DOMAIN}

RUN echo "env ${CLIENT_ID} ${API_URL} ${GRAPH_API_URL} ${GITHUB_DOMAIN}"
RUN npm run build  

# Stage 2 - start the production environment
CMD ["node","server.js"]
EXPOSE 80


