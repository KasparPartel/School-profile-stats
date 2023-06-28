export const URL = "https://01.kood.tech/api/graphql-engine/v1/graphql";
export const USERNAME = "kasparp";
export const MONTHS = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
];

export let jwt = null;
export function setJwt(jwtToken) {
    jwt = jwtToken
}