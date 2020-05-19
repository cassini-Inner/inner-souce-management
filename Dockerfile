# Stage 1
FROM node as react-build
WORKDIR /innersource
COPY . ./
RUN npm install
ARG CLIENT_ID
ENV CLIENT_ID ${CLIENT_ID}
RUN echo "env ${CLIENT_ID}"
RUN npm run build  

# Stage 2 - start the production environment
CMD ["node","server.js"]
EXPOSE 80


