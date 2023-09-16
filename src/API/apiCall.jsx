import axios from "axios";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY)

const instance = axios.create({
  baseURL: process.env.REACT_APP_TASKS_URL,
});

export default {
  GetCall: (URL, methodyType) =>
    instance({
      method: methodyType,
      url: URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  PostCall: (URL, methodType, params) =>
    instance({
      method: methodType,
      url: URL,
      data: params,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }),
    SupaBase:supabase
};
