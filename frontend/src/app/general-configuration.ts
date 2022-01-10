import { interval } from "rxjs";

export const DEBOUNCE_GENERATOR = () => interval(1000);
export const SERVER_PATH = "/api/";
//export const SERVER_PATH = "http://localhost:5000/api/";
export const SERVER_TOPICS_PATH = "topics";
export const SERVER_RECORDS_PATH = "records";
export const SERVER_USER_PATH = "user";
export const SERVER_LOGOUT_PATH = "logout";