import { INIT_SESSION, END_SESSION, SETUP_HOST, SET_CORE } from "./constants";

//siteurl
const setupHost = (payload) => ({
  type: SETUP_HOST,
  payload: payload
});

//apikey
const initSession = (payload) => ({
  type: INIT_SESSION,
  payload: payload
});

const setCore = (payload) => ({
  type: SET_CORE,
  payload: payload
});

const endSession = () => ({
  type: END_SESSION
});

export { setupHost, initSession, endSession, setCore };
