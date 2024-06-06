import { BuiltInParserName } from "prettier";
export default interface ProjectStructure {
    name: string;
    files: ProjectFile[]
    dir: ProjectStructure[]
}

export interface ProjectFile {
    name: string;
    dep: { [x: string]: string }
    format: BuiltInParserName
}