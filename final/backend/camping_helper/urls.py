from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from drf_spectacular.views import SpectacularSwaggerView, SpectacularRedocView, SpectacularAPIView

urlpatterns = [
    path('', include('apps.camp.urls')),
    # path('', include('apps.question.urls')),
    path('', include('apps.register.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/schema', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name="schema"), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name="schema"), name='redoc'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns += [
    path('', RedirectView.as_view(url='/api/schema/swagger-ui', permanent=True)),
]