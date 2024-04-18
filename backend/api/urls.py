from django.urls import path
from .views import blood_views, search_views, user_views

urlpatterns = [
    path("blood/", blood_views.BloodTypesView.as_view(), name='get-blood-types'),
    path("search-requests", search_views.FilterSearchRequestsView.as_view(), name='get-search-requests'),
    path("users", user_views.FilterDonorsView.as_view(), name='get-users'),
    path("search-requests", search_views.BroadcastSearchView.as_view(), name='broadcast-search-request'),
]
