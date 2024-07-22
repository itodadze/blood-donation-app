from dataclasses import dataclass

from api.api_models.search_models import BroadcastSearchRequest
from api.models import User


def dist_squared(search: BroadcastSearchRequest, user: User) -> float:
    a_sq = pow(abs(search.loc_latitude - user.loc_latitude), 2)
    b_sq = pow(abs(search.loc_longitude - user.loc_longitude), 2)
    return a_sq + b_sq


@dataclass
class DonorPriorityRanker:
    search: BroadcastSearchRequest

    def rank(self, users: list[User]) -> list[User]:
        # currently only location is taken into account, later take into
        # account documents.
        return sorted(users, key=lambda x: dist_squared(self.search, x))
