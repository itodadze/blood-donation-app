import o_n from "../../src/assets/blood_types/o_n.svg"
import o_p from "../../src/assets/blood_types/o_p.svg"
import a_n from "../../src/assets/blood_types/a_n.svg"
import a_p from "../../src/assets/blood_types/a_p.svg"
import b_n from "../../src/assets/blood_types/b_n.svg"
import b_p from "../../src/assets/blood_types/b_p.svg"
import ab_n from "../../src/assets/blood_types/ab_n.svg"
import ab_p from "../../src/assets/blood_types/ab_p.svg"

export const bloodTypeToSvg = ({path}) => {
    const bloodTypeSVGs = {
        "o_n": o_n,
        "o_p": o_p,
        "a_n": a_n,
        "a_p": a_p,
        "b_n": b_n,
        "b_p": b_p,
        "ab_n": ab_n,
        "ab_p": ab_p,
    };
    if (path) {
        for (const bloodType in bloodTypeSVGs) {
            if (path.includes(bloodType)) {
                return bloodTypeSVGs[bloodType];
            }
        }
    }
    return null;
}