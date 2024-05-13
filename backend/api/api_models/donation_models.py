from dataclasses import dataclass


@dataclass
class Donor:
    donor: int

    def as_dictionary(self) -> dict:
        return {
            "donor": self.donor
        }
