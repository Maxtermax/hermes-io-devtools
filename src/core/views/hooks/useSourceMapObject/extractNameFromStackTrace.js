export default function extractNameFromStackTrace(stackTrace = '') {
  const lines = stackTrace.split(/\n/);
  const notifyIndex = lines.findIndex(line => line.includes('Observer.notify'));
  if (notifyIndex !== -1 && notifyIndex > 0) {
    const line = lines[notifyIndex + 1];
    const [, name] = line.trim().split(' ');
    return name;
  }
  return '';
}
