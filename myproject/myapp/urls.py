from django.urls import path

from .views import GenerateGraphView

urlpatterns = [
    path('generate-graph/', GenerateGraphView.as_view(), name='generate-graph'),
]
