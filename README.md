# BloodStream

### For Building & Running Docker Container:

* Add .env file to backend directory with required fields:
  - POSTGRES_HOST (Set to host.docker.internal if hosted by localhost)
  - POSTGRES_DB
  - POSTGRES_USER
  - POSTGRES_PASSWORD
  - EMAIL_HOST_USER
  - EMAIL_HOST_PASSWORD
  - SECRET_KEY (Django)

* Run the following command in terminal:
  - ```docker-compose up -d``` 
