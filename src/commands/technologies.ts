import command from '../../config.json' assert {type: 'json'};

const createTech = () : string[] => {
  let string = "";
  const tech : string[] = [];
  const files = `${command.skills.length} File(s)`;
  const SPACE = "&nbsp;";

  tech.push("<br>")

  command.skills.forEach((ele) => {
    string += `<span class='command'>${ele[0]} </span>`;
    // string += SPACE.repeat(1);
    string += SPACE.repeat(14 - ele[0].length);
    string += ele[1];
    tech.push(string);
    string = '';
    
  });

  tech.push("<br>");
  tech.push(files);
  tech.push("<br>");
  return tech;
}

export const TECHNOLOGIES = createTech()
