import { CurlGenerator } from "./lib/CurlGenerator.js";

function toCurl(config) {
  return new CurlGenerator(config).generate();
}

export { toCurl };
