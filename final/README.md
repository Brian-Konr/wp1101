# Group 14 - Camping-Helper
Camping-Helper provides activity organizers, especially college students the ability to create an elegant display page on the platform for their own activities, summer camps, and more. Besides, people interested in activities on the platform can also submit their registration information right at the website. We believe through Camping-Helper, both activity organizers and participants can host or join activities in an easy, fast, and convenient way.

## Motivation
Nowadays, more and more students want to explore their interests before entering universities. Thus whenever the summer or winter vacation is nearby, many universities will host camps for high school students to provide them an opportunity to experience college life, specific subjects, and campus environments for finding out which subject or campus lifestyle they truly like. However, these kinds of activities usually lack a systematic way to host events easily and conveniently. Thus we decided to build an activity platform where organizers can host their events fastly by following fluent and clear instructions. After creating activities, organizers can also examine registration situations and download registration information from the platform. Other than that, students interested in participating can also view camp intro and submit their registration information right on the platform, which saves them a lot of time for finding where to sign up or browse the camp information.

## Getting Started (Run the app and server in localhost)
First, we need to clone this repo. After this, `cd` to the repo directory, then we can setup frontend and backend in localhost separately by following instructions below:
### Frontend
1. `cd frontend`
2. Run `yarn`
3. find `frontend\.env` and set value of `REACT_APP_BACKEND_URL` according to different scenarios:
    - If the server is run at localhost, replace the value with `http://localhost:8000`
    - If the server is deployed, replace the value with `https://campinghelper.temp.dodofk.xyz`
4. Run `yarn start` and make sure the app is run at `localhost:3000` (Due to CORS Issue)
5. You should see your app being launched in your default browser.

### Backend
1. `cd backend`
2. Start virtual environment and load the required packages
    - using python venv for example (of course you could use conda, pipenv, or something else):
    - type python3 or python according to your own machine (Since I'm using old Mac, I should use python3)
    - if using python3 getting error in the following step, you might want to use python, we've occured this error on our Windows laptop
    - only test on python3.9.7 and on mac and ubuntu 20.0.4
    ```
    # for mac/linux
    python3 -m venv be_env
    source be_env/bin/activate

    # for windows(cmd.exe)
    python3 -m venv be_env
    be_env/Scripts/activate.bat

    # for windows(powershell)
    python3 -m venv be_env
    be_env/Scripts/Activate.ps1
    ```
    Make sure you are now in the virtual environment, then you can install required packages by typing the following command:  
    `pip3 install -r requirements.txt`
    (using pip3 if use have python2 and python3 on your system, otherwise, use pip)
3. Set up environment files

    We have given the required env files named .env.dev.ta.defaults in the wp1101/private repo please don't leak the secret key. You could either copy and paste the `.env.dev.ta.defaults` content to `.env.dev`, or use the following commands by first adding the .env.dev.ta.defaults to the backend/ directory
    `cp .env.dev.ta.defaults .env.dev`

    *Explanations and Precautions for the .env.dev*
    - you could change the secret key, we are using another key in production
    - the Email is one of our team member's own Email, and please don't use it for other purposes
    - we've use a different s3 bucket for testing, so it's encouraged to contact us after testing so that we could close the service and save some unnecessary costs.

4. Set up Database and Set up static files
    ```console
    python3 manage.py migrate

    python3 manage.py collectstatic --no-input --clear
    ```
    (Use python instead if python3 is getting error)
    - Set up sqlite3 for local test to reduce opportunity of causing errors, we use postgresql in production
    - after this two command, a db.sqlite3 file will create at backend/, and the static files will store at s3

5. Create superuser (optional)
- To use the django admin page, you need to create a superuser account
    ``` console
        python3 manage.py createsuperuser
        # type the corresponding value to create superuser
    ```
6. Start server:
    ``` console
        python3 manage.py runserver
    ```
    (Use python instead if python3 is getting error)
    Ensure that the server run at port 8000
    
    For admin page: `localhost:8000/admin` (You could get, create, update, delete data in the admin page)

    For API documentation: `localhost:8000/api/schema/swagger-ui/`

    Use (Ctrl+C or Ctrl+D) to shut down the server


## Features

### Register / Activate / Login
An user can register for the app service by entering their Email and password. After submitting a registration request, the password is encrypted and stored in the database. And the server will send an Email to the requested user's Email for account activation. When the account is activated, the user can login and host or join activities on the platform.

### View activities through different filters
The home page displays all activities, and by clicking on different filters or searching by specific activity name, the page will automatically render corresponding results.

### View activity detailed information
An user can view the detailed description of activities he / she is interested in by clicking on the activity card. After clicking on it, the page will be led to the intro of the activity.

### Join an activity (As a participant)
When viewing an activity and feeling interested in it, an user can click on the sign up button and fill in the form required by the activity. After filling the form, the user can click on the submit button and complete the activation registration process. At the same time, organizers of the activity can see new registration information by looking up registration situations on the platform.

### Host an activity (As an organizer)
An organizer can host his / her own activity on the platform by entering the host event button. After clicking on it, the user can fill in the activity information through detailed instructions. The information includes activity name, activity sign up interval, activity date, form questions and more. After filling the required information, the organizer can submit and post his / her own activity. The activity will now be displayed on the platform and participants can submit the registration information in allowed sign up intervals.

### Examine / Download all registration information (As an organizer)
An organizer can view, examine, and download detailed registration information on the platform. The registration information will be displayed using table form, the organizer can view directly on the platform. And if he / she wants to download the information, just click on the download button, then the file is downloaded. What deserves to be noticed is that the downloaded csv file has solved the UTF-8 encoding problem, any Chinese letter can now be viewed properly even when opening the file using Excel.

###

## Dependencies / Resources

### Frontend

#### User Interface / User Experience
* [Ant Design of React](https://ant.design/docs/react/introduce)
* Icons in [Flaticon](https://www.flaticon.com/) / [Ant Design Icons](https://ant.design/docs/spec/icon)
* Random pictures and backgrounds on [Unsplash](https://unsplash.com/) 
#### Web Services
* [React](https://reactjs.org/)
* [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
* [Axios](https://axios-http.com/docs/intro)


### Backend
Only listing the main package, otherwise it'll be too long
#### Web Framework
* [Django](https://www.djangoproject.com)
* [Django REST framework](https://www.django-rest-framework.org)

#### Autheentication
* [Djoser](https://djoser.readthedocs.io/en/latest/)
* [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
* [Django-Templated-Email](https://github.com/vintasoftware/django-templated-email)

#### File Storge
* [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
* [django-storages](https://django-storages.readthedocs.io/en/latest/)

#### Database
* [psycopg2](https://www.psycopg.org)

#### OpenAPI generation
* [drf-spectacular](https://drf-spectacular.readthedocs.io/en/latest/)

#### utils
* [django-cors-headers](https://github.com/adamchainz/django-cors-headers)
* [python-dotenv](https://github.com/theskumar/python-dotenv)

### DevOps
* Docker/docker-compose
* Nginx

### Third Party Service
* Digital Ocean Droplet Space Database DNS

## Contirbutors

資管三 B08705038 郭子麟 
> [Brian Konr](https://github.com/Brian-Konr), Frontend / Project Manager

資管三 B08705024 劉鈺祥
> [Ricky Liu](https://github.com/dodofk), Backend / DevOps

資管二 B09705024 劉智心
> [Alison Liu](https://github.com/Cyalisonliu), Frontend / User Interface / User Experience

## Deployment Link
[Camping-Helper](https://campinghelper.dodofk.xyz/)

*Thanks for using Camping-Helper, a convenient platform for displaying your activities.*


