from dataclasses import dataclass


@dataclass
class ReceiverRequestGet:
    id: int

    def as_dictionary(self) -> dict:
        return {
            "id": self.id
        }
