import command from '../../config.json' assert {type: 'json'};
import { DEFAULT_MAX_LINE_WIDTH, nbsp, wrapWords } from '../utils/textWrap';

const createExperience = () : string[] => {
  const experience : string[] = [];

  experience.push("<br>");

  // Supports both the legacy format:
  //   experience: [ [role, companyAndDates], ... ]
  // and the new detailed format:
  //   experience: [ { role, company, dates, location, highlights: string[] }, ... ]
  (command.experience as any[]).forEach((ele: any) => {
    // Legacy
    if (Array.isArray(ele)) {
      const role = ele[0] ?? "";
      const right = ele[1] ?? "";
      let string = "";
      string += `<span class='command'>${role} </span>`;
      string += nbsp(1);
      string += nbsp(Math.max(1, 26 - String(role).length));
      string += right;
      experience.push(string);
      return;
    }

    // Detailed
    const role = ele.role ?? "";
    const company = ele.company ?? "";
    const dates = ele.dates ?? "";
    const location = ele.location ?? "";
    const highlights: string[] = Array.isArray(ele.highlights) ? ele.highlights : [];

    const headerRight = [company, dates ? `(${dates})` : "", location ? `• ${location}` : ""]
      .filter(Boolean)
      .join(" ");

    // Wrap the header line (role + right-side details) to avoid truncation.
    const headerPrefixHtml = `<span class='command'>${role}</span>${nbsp(2)}`;
    const headerPrefixLen = String(role).length + 2;
    const headerLines = wrapWords(headerRight, DEFAULT_MAX_LINE_WIDTH - headerPrefixLen);
    experience.push(`${headerPrefixHtml}${headerLines[0] ?? ""}`);
    for (let i = 1; i < headerLines.length; i++) {
      experience.push(`${nbsp(headerPrefixLen)}${headerLines[i]}`);
    }

    highlights.forEach((h) => {
      // Wrap bullet text; keep indentation aligned under the bullet.
      const bulletIndent = 4;
      const bulletPrefix = "- ";
      const bulletPrefixLen = bulletIndent + bulletPrefix.length;
      const contPrefixLen = bulletIndent + 2; // align with text after "- "

      const bulletLines = wrapWords(String(h ?? ""), DEFAULT_MAX_LINE_WIDTH - bulletPrefixLen);
      experience.push(`${nbsp(bulletIndent)}${bulletPrefix}${bulletLines[0] ?? ""}`);
      for (let i = 1; i < bulletLines.length; i++) {
        experience.push(`${nbsp(contPrefixLen)}${bulletLines[i]}`);
      }
    });

    experience.push("<br>");
  });

  experience.push("<br>");

  const resumeLink = Array.isArray(command.resumeLink) ? command.resumeLink[0] : "";
  if (resumeLink) {
    experience.push(`<br>For more details, see my <a href="${resumeLink}" target="_blank">detailed resume</a>.`);
    experience.push("<br>");
  }
  return experience;
}

export const EXPERIENCES = createExperience()
