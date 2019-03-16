import * as colors from 'colors';

export const cidrIsValid = (cidr: string) => {
    const regex255 = '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
    const regex32 = '([0-9]|[1-2][0-9]|3[0-2])';
    const regexCIDR = new RegExp(`^(${regex255}\\.){3}${regex255}\\/${regex32}$`);
    if (regexCIDR.test(cidr)) {
        console.log(colors.green(`\n>> CIDR valid: ${cidr}\n`));
        return true;
    }
    console.log(colors.red(`\n>> CIDR invalid: ${cidr}\n`));
    return false;
};
