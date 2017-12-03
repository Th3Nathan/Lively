export const validTeamName = (name: string) => {
    return /^[a-z][a-z ]*[a-z]$/igm.test(name);
  }
  
export const stringToTeamName = (str: string) => {
    return str.toLowerCase().replace(/ /g, '-');
}