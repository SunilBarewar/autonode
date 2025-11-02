import { Polar } from "@polar-sh/sdk";
import { ENV } from "@/config/env";

export const polarClient = new Polar({
  accessToken: ENV.POLAR_ACCESS_TOKEN,
  server: ENV.POLAR_SERVER,
});
