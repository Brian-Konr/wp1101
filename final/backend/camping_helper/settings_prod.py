import os, sys, dj_database_url
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# have a different secret key in enviorment files
SECRET_KEY = os.environ.get("SECRET_KEY", "3%shon=klkpnlfe4k$=r@40==6sn5!zd$2406!fqxc*=^fe5q=")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = int(os.environ.get("DEBUG", "0"))
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

# Application definition
INTERNAL_APPS = [
    'apps.user.apps.UserConfig',
    'apps.camp.apps.CampConfig',
    'apps.question.apps.QuestionConfig',
    'apps.register.apps.RegisterConfig',
]

EXTERNAL_APPS = [
    # 'social_django',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'django_filters',
    'drf_spectacular',
    'djoser',
    'storages',
    # dev only
    'django_extensions',
    'django_cleanup.apps.CleanupConfig',
]

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

INSTALLED_APPS = EXTERNAL_APPS + INTERNAL_APPS + DJANGO_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'camping_helper.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'camping_helper.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": dj_database_url.parse(os.environ.get("DATABASE_URL"))
}

AUTH_USER_MODEL = 'user.User'

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [

]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Taipei'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'


# DRF Setting
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # Basic Auth
        'rest_framework_simplejwt.authentication.JWTAuthentication',

        # # Social Auth
        # 'social_core.backends.github.GithubOAuth2',
        # 'social_core.backends.google.GoogleOAuth2',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    "PAGE_SIZE": 100,
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    # 'DEFAULT_THROTTLE_RATES': {
    #     'test': '10000/day',  # Currently activity has set throttle
    # },
}

SITE_NAME = "Camping Helper"
DOMAIN = "campinghelper.dodofk.xyz"

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'google.com/{uid}/{token}',
    # 不開放改Email
    'USERNAME_RESET_CONFIRM_URL': '#username/reset/confirm/',
    #  改Email template 來解決前端domain 問題
    'ACTIVATION_URL': 'activation/{uid}/{token}/',

    'SEND_ACTIVATION_EMAIL': True,
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': [
        "http://localhost:8000/complete/github",
    ],
    'USER_CREATE_PASSWORD_RETYPE': True,
    'TOKEN_MODEL': None,
    'USER_ID_FIELD': 'pk',
    'activation': ""
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=180),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=2),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    "UPDATE_LAST_LOGIN": False,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Camping Helper API",
    "DESCRIPTION": "All API use JWT to authenticate user",
    "SCHEMA_COERCE_PATH_PK_SUFFIX": True,
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')

USE_SPACES = int(os.environ.get('USE_SPACES', '1'))

if USE_SPACES:
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_ENDPOINT_URL = 'https://sgp1.digitaloceanspaces.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    AWS_S3_CUSTOM_DOMAIN = os.environ.get('AWS_S3_CUSTOM_DOMAIN')
    S3_USE_SIGV4 = int(os.environ.get('S3_USE_SIGV4', '0'))
    # static settings
    AWS_LOCATION = 'static'
    STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
    STATICFILES_STORAGE = 'camping_helper.storage_backends.StaticStorage'
    # public media settings
    PUBLIC_MEDIA_LOCATION = 'media'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'camping_helper.storage_backends.PublicMediaStorage'
    # private media
    PRIVATE_MEDIA_LOCATION = 'private'
    PRIVATE_FILE_STORAGE = 'camping_helper.storage_backends.PrivateMediaStorage'
else:
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:5432",
    "http://localhost:3000",
    "https://campinghelper.dodofk.xyz",
]

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
