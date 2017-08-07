"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from joinin.views import *

admin.autodiscover()


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/register/$', sessionRegister),
    url(r'^api/login/$', sessionLogin),
    url(r'^api/auth/$', sessionAuth),
    url(r'^api/logout/$', sessionLogout),
    url(r'^api/upload/$', upload),
    url(r'^api/student/update/$', updateStudent),
    url(r'^api/sponsor/update/$', updateSponsor),
    url(r'^api/event/create/$', eventCreate),
    url(r'^api/event/update/$', eventUpdate),
    url(r'^api/event/delete/$', eventDelete),
    url(r'^api/event/get/$', eventGet),
    url(r'^api/event/student/$', eventStudent),
    url(r'^api/event/membership/$', eventMembership),
    url(r'^api/event/register/$', eventRegister),
    url(r'^api/event/check/$', eventCheck),
    url(r'^api/event/check/set/$', eventCheckSet),
    url(r'^api/events/user/$', eventsUser),
    url(r'^api/events/all/$', eventsAll),
    url(r'^api/events/recoment/$', eventsRecoment),
    url(r'^api/events/like/$', eventsLike),
]
