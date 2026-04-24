import { execFileSync } from "node:child_process";

const generator = "/Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs";
const prototypeBuilder = "/Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/build-final-user-prototype.mjs";

execFileSync("node", [generator], { stdio: "inherit" });
execFileSync("node", [prototypeBuilder], { stdio: "inherit" });

