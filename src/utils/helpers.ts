import querystring from 'querystring';

export function createQueryString(paginator: any) {
    return querystring.stringify(paginator);
}

export const truncate = (str: string, n: number, ellipsis: string) => {
    const tooLong = str.length > n;
    const singular = str.search(/\s/) === -1;

    // Edge case where someone enters a ridiculously long string.
    str = tooLong ? str.substr(0, n - 1) : str;

    if (!singular) {
        str = ellipsis && tooLong ? str.substr(0, str.lastIndexOf(' ')) : str;
    }

    return tooLong ? str + ellipsis : str;
};

export const parseError = (error: any, fallbackErrorMessage = '') => {
    const errorData = error?.response?.data?.error;

    if (errorData === undefined) {
        return 'Unexpected error occurred...'
    }

    switch (errorData.code) {
        case '0':
            return errorData.message;
        case 'TOKEN.020':
            return 'Token does not exist.'
        case 'TOKEN.030':
            return 'Token could not be verified.'
        case 'TOKEN.040':
            return 'Token could not be deleted.'
        default:
            return fallbackErrorMessage;
    }
};

export const isNullOrUndefined = (value?: unknown): boolean => {
    return value === undefined || value === null;
};

export const isEmailValid = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const isEventKeyEnter = (event: any) => {
    return event.key === 'Enter';
};

export const scrollToHero = () => {
    scrollTo("#hero")
};

export const scrollToAbout = () => {
    scrollTo("#about")
};

export const scrollToExperience = () => {
    scrollTo("#experience")
};

export const scrollToSkills = () => {
    scrollTo("#skills")
};

export const scrollToBlog = () => {
    scrollTo("#blog")
};

export const scrollToTerminal = () => {
    scrollTo("#terminal")
};

export const scrollToContact = () => {
    scrollTo("#contact")
};

export const scrollTo = (sectionID: string) => {
    const yOffset = -75;
    const section = document.querySelector(sectionID);
    const y = section ? section.getBoundingClientRect().top + window.scrollY + yOffset : 0

    window.scrollTo({ top: y, behavior: 'smooth' });
}