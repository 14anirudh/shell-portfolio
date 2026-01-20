import command from '../../config.json' assert {type: 'json'};

const createExperience = () : string[] => {
  const experience : string[] = [];
  const SPACE = "&nbsp;";

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
      string += SPACE.repeat(1);
      string += SPACE.repeat(Math.max(1, 26 - String(role).length));
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

    experience.push(`<span class='command'>${role}</span>${SPACE.repeat(2)}${headerRight}`);

    highlights.forEach((h) => {
      experience.push(`${SPACE.repeat(4)}- ${h}`);
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
