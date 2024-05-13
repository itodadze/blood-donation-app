from dataclasses import dataclass


@dataclass
class DonationPost:
    donor: int

    def as_dictionary(self) -> dict:
        return {
            "donor": self.donor
        }
