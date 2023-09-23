import { KanjiVG } from "./KanjiVG";

const mockFetch = jest.fn();

global.fetch = mockFetch as jest.Mock;

afterEach(() => {
  mockFetch.mockReset();
});

const mockResponse = (status: number, data: string) => {
  mockFetch.mockImplementationOnce(async () => ({
    status,
    text: async () => data,
  }));
};

describe("getCodeForLiteral", () => {
  test("returns zero-padded hex string", () => {
    expect(KanjiVG.getCodeForLiteral("学")).toEqual("05b66");
  });

  test("throws error on invalid literal", () => {
    expect(() => KanjiVG.getCodeForLiteral("")).toThrowError(
      "Invalid literal []",
    );
  });
});

describe("fromString", () => {
  test("parses data from string", () => {
    const data = "<svg><g/></svg>";
    const result = KanjiVG.fromString("学", data);
    expect(result).not.toBeNull();
    expect(result?.toString()).toEqual(data);
  });

  test("svg element not found", () => {
    const data = "<div></div>";
    const result = KanjiVG.fromString("学", data);
    expect(result).toBeNull();
  });
});

describe("fetch", () => {
  test("returns data", async () => {
    const data = "<svg><g/></svg>";
    mockResponse(200, data);

    const result = await KanjiVG.fetch("学");

    expect(mockFetch).toHaveBeenCalledWith("/kanjivg/05b66.svg");
    expect(result).not.toBeNull();
    expect(result?.toString()).toEqual(data);
  });

  test("not found returns null", async () => {
    mockResponse(404, "");

    const result = await KanjiVG.fetch("学");

    expect(mockFetch).toHaveBeenCalledWith("/kanjivg/05b66.svg");
    expect(result).toBeNull();
  });
});

describe("fitParent", () => {
  test("removes width and height", () => {
    const data = '<svg width="20" height="20"><g/></svg>';
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.fitParent();
    expect(result.toString()).toEqual("<svg><g/></svg>");
  });
});

describe("removeStrokeNumbers", () => {
  test("removes stroke numbers", () => {
    const data = '<svg><g/><g id="kvg:StrokeNumbers_05b66"/></svg>';
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.removeStrokeNumbers();
    expect(result.toString()).toEqual("<svg><g/></svg>");
  });
});

describe("appendTo", () => {
  test("appends svg to the given element", () => {
    const parent = document.createElement("div");
    const data = "<svg><g/></svg>";
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.appendTo(parent);
    expect(parent.getElementsByTagName("svg")).toHaveLength(1);
  });
});

describe("showStroke", () => {
  const data = `
  <svg>
    <g>
      <path id="kvg:05b66-s1" d=""/>
      <path id="kvg:05b66-s2" d=""/>
    </g>
    <g>
      <path id="kvg:05b66-s3" d=""/>
    </g>
  </svg>`;

  test("adds class previous strokes", () => {
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.showStroke(2);
    expect(
      result.element.querySelectorAll("path")[0].getAttribute("class"),
    ).toEqual("stroke");
  });

  test("adds class to current stroke", () => {
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.showStroke(2);
    expect(
      result.element.querySelectorAll("path")[1].getAttribute("class"),
    ).toEqual("stroke current-stroke");
  });

  test("adds class to following strokes", () => {
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.showStroke(2);
    expect(
      result.element.querySelectorAll("path")[2].getAttribute("class"),
    ).toEqual("hidden-stroke");
  });

  test("missing stroke", () => {
    const result = KanjiVG.fromString("学", data) as KanjiVG;
    result.showStroke(4);
    expect(
      result.element.querySelectorAll("path")[0].getAttribute("class"),
    ).toEqual("stroke");
    expect(
      result.element.querySelectorAll("path")[1].getAttribute("class"),
    ).toEqual("stroke");
    expect(
      result.element.querySelectorAll("path")[2].getAttribute("class"),
    ).toEqual("stroke");
  });
});
