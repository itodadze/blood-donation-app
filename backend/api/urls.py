from django.urls import path
from .views import blood_views, search_views

urlpatterns = [
    path("blood/", blood_views.BloodTypesView.as_view(), name='get-blood-types'),
    path("get/search-requests/", search_views.FilterSearchRequestsView.as_view(), name='get-search-requests'),
    path("filter-users/", search_views.FilterUsersView.as_view(), name='get-users'),
    path("broadcast/search-request/", search_views.BroadcastSearchView.as_view(), name='broadcast-search-request'),
]
