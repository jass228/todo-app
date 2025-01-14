""" api/urls.py """
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register('todoList', TodoViewSet, 'todo')

urlpatterns = [
    path('', include(router.urls))
]
