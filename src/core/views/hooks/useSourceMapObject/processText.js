const hasLineOpenToken = (line = "") =>
  /({)/.test(line.substring(line.length - 3, line.length));

const hasLineCloseToken = (line = "") =>
  /(})/.test(line.substring(line.length - 5, line.length));

const isNotLineAutoComplete = (line = "") => line.split(/({|})/g).filter((token) => token === "{" || token === "}").length % 2 !== 0;

const findEndLine = ({ start = 0, code = [] }) => {
  let end = null;
  const openTokensCollection = [];
  for (let i = start; i < code.length; i++) {
    const [line] = code.slice(i, i + 1);
    const isOpenToken = hasLineOpenToken(line);
    const isCloseToken = hasLineCloseToken(line) && isNotLineAutoComplete(line);
    const hasPendingToken = openTokensCollection.length > 0;
    if (isOpenToken) {
      openTokensCollection.push(line);
    }
    if (isCloseToken && hasPendingToken) {
      openTokensCollection.pop();
    }
    const hasNotPendingToken = openTokensCollection.length === 0;
    if (hasNotPendingToken && isCloseToken) {
      end = i;
      break;
    }
  }
  return end;
};

const buildHighlightPosition = ({ chunk = [], highlightLine = "" }) => {
  const start = chunk.findIndex((line) => line === highlightLine);
  let end = null;
  if (hasLineOpenToken(highlightLine)) {
    end = findEndLine({ start, code: chunk });
  }
  if (hasLineCloseToken(highlightLine)) {
    end = start;
  }
  return { start, end };
};

const processText = ({ text = [], start = "", highlightLine = "" }) => {
  const end = findEndLine({ start, code: text });
  const container = { start, end };
  const chunk = text.slice(start, end + 1);
  const highlight = buildHighlightPosition({
    chunk,
    highlightLine, 
  });
  return { container, highlight };
};

export default processText;
