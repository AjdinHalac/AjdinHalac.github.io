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

    if (errorData) {
        if (errorData.code) {
            return `Error occured with code ${errorData.code}`;
        }

        if (errorData.message) {
            return errorData.message;
        }
    }

    return fallbackErrorMessage;
};

export const toTitleCase = (phrase: string) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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

export const removeLeadingZeros = (str: string) => {
    let alpha;
    let numeric;
    if (str.slice(0, 2) === 'KU' || str.slice(0, 2) === 'KX') {
        alpha = 'KU-KX';
        numeric = str.slice(2, str.length);
    } else {
        alpha = 'BCRT';
        numeric = str.slice(4, str.length);
    }
    numeric = numeric.replace(/^0+/, '');
    return alpha + numeric;
};

export const formatDateTime = (value: string) => {
    return value.substring(0, 16).replace(/[TZ]/, ' ');
};
