import {config} from "../config";
import ky from "ky";

export const baseApi = ky.create({
    prefixUrl: config.baseUrl,
    timeout: 5 * 60 * 1000      // 5 min
});
