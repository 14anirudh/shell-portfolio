import command from '../../config.json' assert {type: 'json'};

const createProject = () : string[] => {
  const projects : string[] = [];
  const SPACE = "&nbsp;";

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
      string += SPACE.repeat(2);
      string += link;
      string += SPACE.repeat(Math.max(1, 14 - String(name).length));
      string += desc;
      projects.push(string);
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

    projects.push(`${SPACE.repeat(2)}${title}${tagline ? `${SPACE.repeat(2)}${tagline}` : ""}`);

    if (live || github) {
      const linkParts = [
        live ? `<a href="${live}" target="_blank">Live</a>` : "",
        github ? `<a href="${github}" target="_blank">GitHub</a>` : "",
      ].filter(Boolean);
      projects.push(`${SPACE.repeat(4)}Links: ${linkParts.join(`${SPACE.repeat(2)}|${SPACE.repeat(2)}`)}`);
    }

    highlights.forEach((h) => {
      projects.push(`${SPACE.repeat(4)}- ${h}`);
    });

    projects.push("<br>");
  });

  projects.push("<br>");
  projects.push(`${command.projects.length} Project(s)`);
  projects.push("<br>");
  return projects
}

export const PROJECTS = createProject()
