import os
from pathlib import Path
from datetime import timedelta
from dotenv import dotenv_values
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
dev_config = {
    **dotenv_values(".env.dev"),
    **os.environ,
}

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = dev_config.get("SECRET_KEY", "3%shon=klkpnlfe4k$=r@40==6sn5!zd$2406!fqxc*=^fe5q=")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = int(dev_config.get("DEBUG", "1"))

ALLOWED_HOSTS = ['*']


# Application definition
INTERNAL_APPS = [
    'apps.user.apps.UserConfig',
    'apps.camp.apps.CampConfig',
    'apps.question.apps.QuestionConfig',
    'apps.register.apps.RegisterConfig',
]

EXTERNAL_APPS = [
    'corsheaders',
    # 'social_django',
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
        'DIRS': [BASE_DIR / 'templates'],
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

# 減少助教測試錯誤
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': dev_config.get("SQL_ENGINE", "django.db.backends.postgresql_psycopg2"),
#         'NAME': dev_config.get("SQL_DATABASE", ""),
#         'USER': dev_config.get("SQL_USER", ""),
#         'PASSWORD': dev_config.get("SQL_PASSWORD", ""),
#         'HOST': dev_config.get("SQL_HOST", "localhost"),
#         'PORT': dev_config.get("SQL_PORT", "5432"),
#     }
# }


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
    'TEST_REQUEST_RENDERER_CLASSES': [
            'rest_framework.renderers.MultiPartRenderer',
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.TemplateHTMLRenderer',
    ],
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

# todo: email template
DOMAIN = "localhost:3000"
SITE_NAME = "Camping Helper"

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
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=180),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=12),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    "UPDATE_LAST_LOGIN": False,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Camping Helper API",
    "DESCRIPTION": "All API use JWT to authenticate user",
    "SCHEMA_COERCE_PATH_PK_SUFFIX": True,
}

USE_SPACES = int(dev_config.get('USE_SPACES', '1'))

if USE_SPACES:
    AWS_ACCESS_KEY_ID = dev_config.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = dev_config.get('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = dev_config.get('AWS_STORAGE_BUCKET_NAME')
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_ENDPOINT_URL = 'https://sgp1.digitaloceanspaces.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    AWS_S3_CUSTOM_DOMAIN = dev_config.get('AWS_S3_CUSTOM_DOMAIN')
    S3_USE_SIGV4 = int(dev_config.get('S3_USE_SIGV4', '0'))
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


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = dev_config.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = dev_config.get('EMAIL_HOST_PASSWORD')

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:5432",
    "http://localhost:3000",
    "https://campinghelper.dodofk.xyz",
]
