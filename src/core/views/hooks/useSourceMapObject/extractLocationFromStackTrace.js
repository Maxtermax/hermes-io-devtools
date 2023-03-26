const extractLocationFromStackTrace = ({ stackTrace, name }) => {
  const arrayOfLines = stackTrace.match(/[^\r\n]+/g);
  const targetLine = arrayOfLines
    .find((line) => line.includes(name))
    .replace(")", "");
  const data = targetLine.split(":");
  const column = parseInt(data.at(-1));
  const line = parseInt(data.at(-2));
  return { line, column };
};

export default extractLocationFromStackTrace;
