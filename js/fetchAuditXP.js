import {URL, USERNAME} from "./constants.js";
import {fetchAllDataRecursive} from "./fetch.js";

const query = `query ($username: String, $start: Int) {
    user(where: { login: { _eq: $username }}) {
        transactions(where: {type: {_in: ["down", "up"]}}, offset: $start) {
            amount
            type
        }
    }
}`;

const variables = {
    username: USERNAME,
    start: 0,
}

const fetchAuditXP = async () => {
    return await fetchAllDataRecursive(URL, query, variables, "transactions");
}

export default fetchAuditXP;