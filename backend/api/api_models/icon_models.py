from dataclasses import dataclass


@dataclass
class IconSet:
    user_id: int
    icon_id: int

    def as_dictionary(self) -> dict:
        return {
            "user_id": self.user_id,
            "icon_id": self.icon_id
        }
