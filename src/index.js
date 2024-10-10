import { goodbye } from "./goodbye.js";
import { salutation, username } from "./salutation.js";

salutation();

if (username) {
  goodbye(username);
}
