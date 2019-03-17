import test from 'ava';
import { CIDR } from '../src/CIDR';

test('cidrIsValid checks the validity of a CIDR IP', t => {
    const scenarios = [
        { cidr: '255.255.255.0/24', expected: true },
        { cidr: '0.0.0.0/32', expected: true },
        { cidr: '0.0.0.0/33', expected: false },
        { cidr: '0.0.0/8', expected: false },
        { cidr: '257.0.0.0/8', expected: false }
    ];
    scenarios.forEach((s, i) => {
        const result = new CIDR(s.cidr).isValid;
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});

test('calculateSubnetMask calculates the subnet mask based on the number of significant bits', t => {
    const scenarios = [
        { cidr: '0.0.0.0/9', expected: '255.128.0.0' },
        { cidr: '0.0.0.0/16', expected: '255.255.0.0' },
        { cidr: '0.0.0.0/24', expected: '255.255.255.0' },
        { cidr: '128.64.32.19/18', expected: '255.255.192.0' }
    ];
    scenarios.forEach((s, i) => {
        const result = new CIDR(s.cidr).subnetMask;
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});

// test('convertSubnetToWildcardHosts');