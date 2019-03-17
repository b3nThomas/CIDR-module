import * as colors from 'colors';

export const cidrIsValid = (cidr: string): boolean => {
    const regex255 = '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
    const regex32 = '([0-9]|[1-2][0-9]|3[0-2])';
    const regexCIDR = new RegExp(`^(${regex255}\\.){3}${regex255}\\/${regex32}$`);
    if (regexCIDR.test(cidr)) {
        console.log(colors.green(`\n>> CIDR valid: ${cidr}\n`));
        return true;
    }
    console.log(colors.red(`\n>> CIDR invalid: ${cidr}`));
    console.log(colors.red(`>> Required format: [0-255].[0-255].[0-255].[0-255]/[0-32]\n`));
    return false;
};

// All subsequent functions assume that the CIDR IP is using the valid format...

export const calculateSubnetMask = (cidr: string): string => {
    const sigBits = cidr.split('/')[1];
    const fullDecimals = Math.floor(parseInt(sigBits) / 8);
    const remainder = parseInt(sigBits) - (fullDecimals * 8);
    let subnetMask = [];
    if (fullDecimals > 0) {
        for (let i = 0; i < fullDecimals; i++) {
            subnetMask.push('255')
        }
    }
    if (remainder > 0) {
        let bits = '00000000'.split('');
        for (let i = 0; i < remainder; i++) {
            bits[i] = '1';
        }
        subnetMask.push(parseInt(bits.join(''), 2).toString());
    }
    if (subnetMask.length !== 4) {
        for (let i = 0; i < (5 - subnetMask.length); i++) {
            subnetMask.push('0')
        }
    }
    return subnetMask.join('.');
};

// Check CIDR is valid.
// Calculate subnet mask.
// Calculate wildcard bits.
// Calculate IP addresses.