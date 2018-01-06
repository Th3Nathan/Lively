export const validTeamName = (name: string) => {
    return /^[a-z][a-z ]*[a-z]$/igm.test(name);
  };
  
export const stringToTeamName = (str: string) => {
    return str.toLowerCase().replace(/ /g, '-');
};

export const validateEmail = (email: string): boolean => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // tslint:disable-line
    return re.test(email);
};

interface Tokens {
    token?: string;
    refreshToken?: string;
}
export const handleTokens = ({token, refreshToken}: Tokens) => {
    if (!token || !refreshToken) {
        throw 'Expecting tokens but none received';
    }
    localStorage.setItem('x-token', token);
    localStorage.setItem('x-refresh-token', refreshToken);
};