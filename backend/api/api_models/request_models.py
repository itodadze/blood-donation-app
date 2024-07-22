from dataclasses import dataclass


@dataclass
class ReceiverRequestId:
    id: int

    def as_dictionary(self) -> dict:
        return {"request_id": self.id}
