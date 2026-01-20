import command from '../../config.json' assert {type: 'json'};

const isUrl = (s: string) => /^https?:\/\//i.test(s);

const createAbout = () : string[] => {
  const about : string[] = [];

  const SPACE = "&nbsp;";

  const EMAIL = "Email";
  const GITHUB = "Github";
  const LINKEDIN = "Linkedin";
  
  const email = `<i class='fa-solid fa-envelope'></i> ${EMAIL}`;   
  const github = `<i class='fa-brands fa-github'></i> ${GITHUB}`;
  const linkedin = `<i class='fa-brands fa-linkedin'></i> ${LINKEDIN}`;
  let string = "";

  about.push("<br>");
  about.push(command.aboutGreeting);
  about.push("<br>");

  const emailValue = command.social?.email ?? "";
  const githubValue = command.social?.github ?? "";
  const linkedinValue = command.social?.linkedin ?? "";

  const githubHref = !githubValue ? "" : (isUrl(githubValue) ? githubValue : `https://github.com/${githubValue}`);
  const githubText = !githubValue ? "Not set" : (isUrl(githubValue) ? githubValue.replace(/^https?:\/\//i, "") : `github/${githubValue}`);

  const linkedinHref = !linkedinValue ? "" : (isUrl(linkedinValue) ? linkedinValue : `https://www.linkedin.com/in/${linkedinValue}`);
  const linkedinText = !linkedinValue ? "Not set" : (isUrl(linkedinValue) ? linkedinValue.replace(/^https?:\/\//i, "") : `linkedin/${linkedinValue}`);

  string += SPACE.repeat(2);
  string += email;
  string += SPACE.repeat(17 - EMAIL.length);
  string += emailValue
    ? `<a target='_blank' href='mailto:${emailValue}'>${emailValue}</a>`
    : "Not set";
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += github;
  string += SPACE.repeat(17 - GITHUB.length);
  string += githubHref
    ? `<a target='_blank' href='${githubHref}'>${githubText}</a>`
    : githubText;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += linkedin;
  string += SPACE.repeat(17 - LINKEDIN.length);  
  string += linkedinHref
    ? `<a target='_blank' href='${linkedinHref}'>${linkedinText}</a>`
    : linkedinText;
  about.push(string);

  about.push("<br>");
  return about
}

export const ABOUT = createAbout();
