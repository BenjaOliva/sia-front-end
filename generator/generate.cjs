const {
  generateTemplateFiles,
  CaseConverterEnum,
} = require("generate-template-files");

generateTemplateFiles([
  {
    option: "Create default view",
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: "./generator/templates/default-view",
    },
    stringReplacers: [{ question: "Insert view name", slot: "__ViewName__" }],
    output: {
      path: "./src/views/__ViewName__",
      pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
      overwrite: true,
    },
  },
]);
