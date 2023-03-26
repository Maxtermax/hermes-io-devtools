import processText from "./processText";

const code3 = [
  "function myFunction() {",
  "  if (someCondition) {",
  "    console.log('Condition is true!');",
  "  }",
  "}",
  "myFunction();",
];

const code4 = [
  "if (someCondition) {",
  "  console.log('Condition is true!');",
  "}",
];

const code5 = [
  "if (someCondition) {",
  "  console.log('Condition is true!');",
  "  console.log('Another log!');",
  "}",
];

const code6 = [
  "function myFunction() {",
  "  if (someCondition) {",
  "    console.log('Condition is true!');",
  "  } else {",
  "    console.log('Condition is false!');",
  "  }",
  "}",
  "myFunction();",
];

describe("processText", () => {
  test("finds end line of block with nested block", () => {
    const { container } = processText({
      text: code3,
      start: 0,
      highlightLine: "console.log('Condition is true!');",
    });
    expect(container).toEqual({ start: 1, end: 3 });
  });

  test("finds end line of block with only one line of code", () => {
    const { container } = processText({
      text: code4,
      start: 0,
      highlightLine: "console.log('Condition is true!');",
    });
    expect(container).toEqual({ start: 0, end: 1 });
  });

  test("finds end line of block with multiple lines of code", () => {
    const { container } = processText({
      text: code5,
      start: 0,
      highlightLine: "console.log('Condition is true!');",
    });
    expect(container).toEqual({ start: 0, end: 2 });
  });

  test("finds end line of block with else clause", () => {
    const { container } = processText({
      text: code6,
      start: 0,
      highlightLine: "console.log('Condition is true!');",
    });
    expect(container).toEqual({ start: 1, end: 1 });
  });
});
