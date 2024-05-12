from dataclasses import dataclass


@dataclass
class ReceiverRequestId:
    id: int

    def as_dictionary(self) -> dict:
        return {
            "id": self.id
        }
