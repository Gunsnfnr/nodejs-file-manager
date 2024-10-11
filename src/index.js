import { listenToUserInput } from "../listen-to-user-input.js";
import { sayByeWhenExit } from "./goodbye.js";
import { salutation, username } from "./salutation.js";

salutation();
listenToUserInput(username);
sayByeWhenExit(username);
