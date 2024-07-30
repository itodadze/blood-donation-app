# BloodStream

### Pyhon version used: 3.11

### Before running docker
* Make sure you have a local postgresql database set up and your user has all the permissions.
* Make sure you have a gmail business email with an app-specific password.  
### For Building & Running Docker Container:

* Add .env file to backend directory with required fields:
  - POSTGRES_HOST (Set to host.docker.internal if hosted by localhost)
  - POSTGRES_DB
  - POSTGRES_USER
  - POSTGRES_PASSWORD
  - EMAIL_HOST_USER
  - EMAIL_HOST_PASSWORD
  - SECRET_KEY (Django)

* Run the following commands in terminal:
  - ```docker-compose build```
  - ```docker-compose up -d``` 
