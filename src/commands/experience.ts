import command from '../../config.json' assert {type: 'json'};

const createExperience = () : string[] => {
  let string = "";
  const experience : string[] = [];
  const SPACE = "&nbsp;";

  experience.push("<br>")

  command.experience.forEach((ele) => {
    string += `<span class='command'>${ele[0]} </span>`;
    string += SPACE.repeat(1);
    string += SPACE.repeat(26 - ele[0].length);
    string += ele[1];
    experience.push(string);
    string = '';
    
  });

  experience.push("<br>");
  experience.push(`<br>For more details, see my <a href="${command.resumeLink[0]}" target="_blank">detailed resume</a>.`);
  experience.push("<br>");
  return experience;
}

export const EXPERIENCES = createExperience()
