from django.urls import path
from .views import blood_views, search_views, chat_views

urlpatterns = [
    path("blood/", blood_views.BloodTypesView.as_view(), name='get-blood-types'),
    path("search-requests", search_views.FilterSearchRequestsView.as_view(), name='get-search-requests'),
    path("users/", search_views.FilterUsersView.as_view(), name='get-users'),
    path("search-requests/", search_views.BroadcastSearchView.as_view(), name='broadcast-search-request'),
    path("chats/user/", chat_views.ChatPeopleView.as_view(), name='get-chat-people'),
    path("chats/user/messages/", chat_views.ChatMessagesView.as_view(), name='get-chat'
                                                                            '-messages'),
    path("chats/user/messages/new/", chat_views.ChatNewMessageView.as_view(), name='add-new'
                                                                                  '-message'),
]
