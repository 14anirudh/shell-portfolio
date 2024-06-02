const helpObj = {
  commands: [
    ["'about'", "Developed by a wizard in training, beware, it might just cast a spell on you!"],
    ["'experience'", "Step into the Pensieve and explore the memories that shaped this website!"],
    ["'skills'", "Wingardium Leviosa! These skills can lift any project to new heights!"],
    ["'projects'", "This is just one Horcrux in my collection of projects! Explore more here!"],
    ["'whoami'", "A question worthy of the Sorting Hat! Perhaps this website can offer some clues to you..."],
    ["'sudo'", "Woah there! Unleashing ultimate power requires the Chosen One. Are you worthy?"],
    ["'repo'", "Descend into the depths of the code, but beware the Basilisk within!"],
    ["'banner'", "Mischief Managed! The banner unveils the website's secrets, but beware of hidden surprises!"],
    ["'clear'", "Obliviate! The terminal is cleared, ready for a fresh start."],
  ],
};

const createHelp = (): string[] => {
  const help: string[] = [];
  help.push("<br>");

  helpObj.commands.forEach((ele) => {
    const SPACE = "&nbsp;";
    let string = "";
    string += SPACE.repeat(2);
    string += "<span class='command'>";
    string += ele[0];
    string += "</span>";
    string += SPACE.repeat(17 - ele[0].length);
    string += ele[1];
    help.push(string);
  });

  help.push("<br>");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push(
    "Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands."
  );
  help.push("<br>");
  return help;
};

export const HELP = createHelp();
