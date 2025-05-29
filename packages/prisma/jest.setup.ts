import { resolve } from "path";
import "@testing-library/jest-dom";
process.env.DOTENV_FLOW_PATH = resolve(__dirname, "../../");
import "dotenv-flow/config";
