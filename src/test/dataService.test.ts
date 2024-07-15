import { transformData } from "../services/dataService";

describe("transformData", () => {
  it("Should transform the URLs into the expected structure", () => {
    const data = [
      "http://34.8.32.234:48183/SvnRep/ADV-H5-New/README.txt",
      "http://34.8.32.234:48183/SvnRep/ADV-H5-New/VisualSVN.lck",
      "http://34.8.32.234:48183/SvnRep/ADV-H5-New/hooks-env.tmpl",
      "http://34.8.32.234:48183/SvnRep/AT-APP/README.txt",
      "http://34.8.32.234:48183/SvnRep/AT-APP/VisualSVN.lck",
      "http://34.8.32.234:48183/SvnRep/AT-APP/hooks-env.tmpl",
      "http://34.8.32.234:48183/SvnRep/README.txt",
      "http://34.8.32.234:48183/SvnRep/VisualSVN.lck",
      "http://34.8.32.234:48183/SvnRep/hooks-env.tmpl",
      "http://34.8.32.234:48183/www/README.txt",
      "http://34.8.32.234:48183/www/VisualSVN.lck",
      "http://34.8.32.234:48183/www/hooks-env.tmpl",
    ];

    const expectedOutput = {
      "34.8.32.234": [
        {
          SvnRep: [
            {
              "ADV-H5-New": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
            },
            {
              "AT-APP": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
            },
            "README.txt",
            "VisualSVN.lck",
            "hooks-env.tmpl",
          ],
        },
        {
          www: ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
        },
      ],
    };

    const result = transformData(data);
    expect(result).toEqual(expectedOutput);
  });
});
