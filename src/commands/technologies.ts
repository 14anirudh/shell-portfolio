import command from '../../config.json' assert {type: 'json'};
import { DEFAULT_MAX_LINE_WIDTH, nbsp, wrapWords } from '../utils/textWrap';

const createTech = () : string[] => {
  const tech : string[] = [];
  const files = `${command.skills.length} File(s)`;

  tech.push("<br>")

  const labels = command.skills.map((ele) => String(ele?.[0] ?? ""));
  const maxLabelLen = labels.reduce((max, l) => Math.max(max, l.length), 0);
  // Keep a minimum label column so short labels still look nice,
  // but align all values to the same starting column.
  const labelColumnWidth = Math.max(14, maxLabelLen) + 2; // +2 for spacing after label

  command.skills.forEach((ele) => {
    const label = String(ele?.[0] ?? "");
    const value = String(ele?.[1] ?? "");

    const labelHtml = `<span class='command'>${label}</span>`;
    const pad = Math.max(1, labelColumnWidth - label.length);
    const prefixHtml = `${labelHtml}${nbsp(pad)}`;
    const prefixLen = labelColumnWidth;

    const valueLines = wrapWords(value, DEFAULT_MAX_LINE_WIDTH - prefixLen);
    tech.push(`${prefixHtml}${valueLines[0] ?? ""}`);
    for (let i = 1; i < valueLines.length; i++) {
      tech.push(`${nbsp(prefixLen)}${valueLines[i]}`);
    }
    
  });

  tech.push("<br>");
  tech.push(files);
  tech.push("<br>");
  return tech;
}

export const TECHNOLOGIES = createTech()
