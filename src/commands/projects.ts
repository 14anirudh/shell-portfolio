import command from '../../config.json' assert {type: 'json'};
import { DEFAULT_MAX_LINE_WIDTH, nbsp, wrapWords } from '../utils/textWrap';

const createProject = () : string[] => {
  const projects : string[] = [];

  projects.push("<br>");

  // Supports both the legacy format:
  //   projects: [ [name, shortDesc, link], ... ]
  // and the new detailed format:
  //   projects: [ { name, tagline, links: { live, github }, highlights: string[] }, ... ]
  (command.projects as any[]).forEach((ele: any) => {
    // Legacy
    if (Array.isArray(ele)) {
      const name = ele[0] ?? "";
      const desc = ele[1] ?? "";
      const href = ele[2] ?? "";
      const link = href ? `<a href="${href}" target="_blank">${name}</a>` : `<span class='command'>${name}</span>`;

      let string = "";
      string += nbsp(2);
      string += link;
      string += nbsp(Math.max(1, 14 - String(name).length));

      // Wrap legacy description too (in case it's long).
      const prefixLen = 2 + Math.max(1, 14 - String(name).length) + String(name).length;
      const descLines = wrapWords(String(desc ?? ""), Math.max(10, DEFAULT_MAX_LINE_WIDTH - prefixLen));
      projects.push(`${string}${descLines[0] ?? ""}`);
      for (let i = 1; i < descLines.length; i++) {
        projects.push(`${nbsp(prefixLen)}${descLines[i]}`);
      }
      return;
    }

    // Detailed
    const name = ele.name ?? "";
    const tagline = ele.tagline ?? "";
    const github = ele.links?.github ?? "";
    const live = ele.links?.live ?? "";
    const highlights: string[] = Array.isArray(ele.highlights) ? ele.highlights : [];

    const title = github
      ? `<a href="${github}" target="_blank">${name}</a>`
      : `<span class='command'>${name}</span>`;

    // Wrap the title line + tagline so it doesn't truncate.
    const titleIndent = 2;
    const titleSpacer = 2; // spaces between title and tagline
    const titlePrefixHtml = `${nbsp(titleIndent)}${title}${nbsp(titleSpacer)}`;
    const titlePrefixLen = titleIndent + String(name).length + titleSpacer;
    const taglineLines = wrapWords(String(tagline ?? ""), DEFAULT_MAX_LINE_WIDTH - titlePrefixLen);
    projects.push(`${titlePrefixHtml}${taglineLines[0] ?? ""}`);
    for (let i = 1; i < taglineLines.length; i++) {
      projects.push(`${nbsp(titlePrefixLen)}${taglineLines[i]}`);
    }

    if (live || github) {
      const linkParts = [
        live ? `<a href="${live}" target="_blank">Live</a>` : "",
        github ? `<a href="${github}" target="_blank">GitHub</a>` : "",
      ].filter(Boolean);
      const linksIndent = 4;
      const linksLabel = "Links: ";
      const linksHtml = linkParts.join(`${nbsp(2)}|${nbsp(2)}`);
      const linksTextFallback = linkParts
        .map((p) => p.replace(/<[^>]+>/g, ""))
        .join(" | ");

      // Prefer wrapping based on visible text length, but render with HTML.
      const linksLines = wrapWords(linksTextFallback, DEFAULT_MAX_LINE_WIDTH - (linksIndent + linksLabel.length));
      projects.push(`${nbsp(linksIndent)}${linksLabel}${linksLines[0] ? linksHtml : ""}`);
      for (let i = 1; i < linksLines.length; i++) {
        projects.push(`${nbsp(linksIndent + linksLabel.length)}${linksLines[i]}`);
      }
    }

    highlights.forEach((h) => {
      // Wrap bullet text; keep indentation aligned under the bullet.
      const bulletIndent = 4;
      const bulletPrefix = "- ";
      const bulletPrefixLen = bulletIndent + bulletPrefix.length;
      const contPrefixLen = bulletIndent + 2; // align with text after "- "

      const bulletLines = wrapWords(String(h ?? ""), DEFAULT_MAX_LINE_WIDTH - bulletPrefixLen);
      projects.push(`${nbsp(bulletIndent)}${bulletPrefix}${bulletLines[0] ?? ""}`);
      for (let i = 1; i < bulletLines.length; i++) {
        projects.push(`${nbsp(contPrefixLen)}${bulletLines[i]}`);
      }
    });

    projects.push("<br>");
  });

  projects.push("<br>");
  projects.push(`${command.projects.length} Project(s)`);
  projects.push("<br>");
  return projects
}

export const PROJECTS = createProject()
