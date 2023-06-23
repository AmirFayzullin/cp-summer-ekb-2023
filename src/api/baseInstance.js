import {config} from "../config";
import ky from "ky";

export const baseApi = ky.create({
    prefixUrl: config.baseUrl
});