from django.urls import path

from .views import (auth_views, blood_views, chat_views, donation_views,
                    icon_views, request_views, search_views, user_views)

urlpatterns = [
    path("blood/", blood_views.BloodTypesView.as_view(), name="get-blood-types"),
    path(
        "search-requests/",
        search_views.FilterSearchRequestsView.as_view(),
        name="get-search-requests",
    ),
    path("users/", user_views.FilterDonorsView.as_view(), name="get-users"),
    path(
        "users/donors/",
        user_views.ReceiverDonorUsersView.as_view(),
        name="get-donor-partners",
    ),
    path(
        "broadcast/",
        search_views.BroadcastSearchView.as_view(),
        name="broadcast-search-request",
    ),
    path("chats/user/", chat_views.ChatPeopleView.as_view(), name="get-chat-people"),
    path(
        "chats/user/messages/",
        chat_views.ChatMessagesView.as_view(),
        name="get-chat" "-messages",
    ),
    path(
        "chats/user/messages/new/",
        chat_views.ChatNewMessageView.as_view(),
        name="add-new" "-message",
    ),
    path("requests/", request_views.ReceiverRequestView.as_view(), name="requests"),
    path(
        "chats/new/",
        chat_views.ConversationCreateView.as_view(),
        name="create-conversation",
    ),
    path(
        "chats/delete/",
        chat_views.ConversationDeleteView.as_view(),
        name="delete-conversation",
    ),
    path("donation/", donation_views.DonationView.as_view(), name="donation"),
    path(
        "donation/count/",
        donation_views.DonationAmountView().as_view(),
        name="donation-count",
    ),
    path("register/", auth_views.RegisterUser.as_view(), name="register-user"),
    path("icons/", icon_views.UserIconView.as_view(), name="get-user-icons"),
    path("icons/user/", icon_views.SetUserIconView.as_view(), name="update-user-icon"),
]
