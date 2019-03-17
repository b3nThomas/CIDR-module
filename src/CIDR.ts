import * as colors from 'colors';

// "Classless Inter-Domain Routing" module

export class CIDR {
    public readonly cidr: string;
    public readonly isValid: boolean;
    public readonly subnetMask: string = null;
    public readonly wildcardHosts: string = null;
    public readonly totalHosts: number = null;

    constructor (cidr: string) {
        this.cidr = cidr;
        this.isValid = this.cidrIsValid();
        if (this.isValid) {
            this.subnetMask = this.calculateSubnetMask();
            this.wildcardHosts = this.calculateWildcardHosts();
            this.totalHosts = this.calculateTotalHosts();
        }
    }

    private cidrIsValid (): boolean {
        const regex255 = '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
        const regex32 = '([0-9]|[1-2][0-9]|3[0-2])';
        const regexCIDR = new RegExp(`^(${regex255}\\.){3}${regex255}\\/${regex32}$`);
        if (regexCIDR.test(this.cidr)) {
            console.log(colors.green(`\n[+] Valid CIDR received: ${this.cidr}`));
            return true;
        }
        console.log(colors.red(`\n[-] CIDR invalid: ${this.cidr}`));
        console.log(colors.red(`[-] Required format: [0-255].[0-255].[0-255].[0-255]/[0-32]\n`));
        return false;
    }

    private calculateSubnetMask (): string {
        const sigBits = this.cidr.split('/')[1];
        const fullDecimals = Math.floor(parseInt(sigBits) / 8);
        const remainder = parseInt(sigBits) - (fullDecimals * 8);
        let subnetMask: any = [];
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
            for (let i = 0; i <= (4 - subnetMask.length); i++) {
                subnetMask.push('0')
            }
        }
        subnetMask = subnetMask.join('.');
        console.log(colors.magenta(`[+] Subnet Mask: ${subnetMask}`));
        return subnetMask;
    }

    private calculateWildcardHosts(): string {
        let wildcardHosts: any = [];
        const subnetSplit = this.subnetMask.split('.');
        subnetSplit.forEach(val => {
            wildcardHosts.push(255 - parseInt(val));
        });
        wildcardHosts = wildcardHosts.join('.');
        console.log(colors.yellow(`[+] Wildcard Hosts: ${wildcardHosts}`));
        return wildcardHosts;
    }
    
    private calculateTotalHosts(): number {
        const wildcardSplit = this.wildcardHosts.split('.');
        const reduced = wildcardSplit.map(val => parseInt(val) + 1);
        const reducer = (accumulator, val) => accumulator * val;
        const totalHosts = reduced.reduceRight(reducer);
        console.log(colors.cyan(`[+] Total Hosts: ${totalHosts}\n`));
        return totalHosts;
    }
}

// All subsequent functions assume that the CIDR IP is using the valid format...


// Check CIDR is valid.
// Calculate subnet mask.
// Calculate wildcard bits.
// Calculate IP addresses.