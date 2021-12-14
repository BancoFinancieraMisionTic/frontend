sudo heroku login
sudo heroku container:login
sudo heroku container:push web --app sarlaft-frontend-ms
sudo heroku container:release web --app sarlaft-frontend-ms