export function parseRichText(input: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    const index = match.index;
    if (index > lastIndex) {
      result.push(input.slice(lastIndex, index));
    }
    result.push(<strong key={index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < input.length) {
    result.push(input.slice(lastIndex));
  }
  return result;
}
