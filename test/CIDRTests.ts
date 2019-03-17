import test from 'ava';
import { CIDR } from '../src/CIDR';

test('CIDR checks the validity of a CIDR IP', t => {
    const scenarios = [
        { cidr: '255.255.255.0/24', expected: true },
        { cidr: '0.0.0.0/32', expected: true },
        { cidr: '128.64.32.19/23', expected: true },
        { cidr: '0.0.0.0/33', expected: false },
        { cidr: '0.0.0/8', expected: false },
        { cidr: '257.0.0.0/8', expected: false }
    ];
    scenarios.forEach((s, i) => {
        const result = new CIDR(s.cidr).isValid;
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});

test('CIDR calculates the subnet mask', t => {
    const scenarios = [
        { cidr: '0.0.0.0/9', expected: '255.128.0.0' },
        { cidr: '0.0.0.0/16', expected: '255.255.0.0' },
        { cidr: '0.0.0.0/24', expected: '255.255.255.0' },
        { cidr: '128.64.32.19/18', expected: '255.255.192.0' },
        { cidr: '128.64.32.19/23', expected: '255.255.254.0' }
    ];
    scenarios.forEach((s, i) => {
        const result = new CIDR(s.cidr).subnetMask;
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});

test('CIDR calculates the wildcard hosts', t => {
    const scenarios = [
        { cidr: '0.0.0.0/9', expected: '0.127.255.255' },
        { cidr: '0.0.0.0/16', expected: '0.0.255.255' },
        { cidr: '0.0.0.0/24', expected: '0.0.0.255' },
        { cidr: '128.64.32.19/18', expected: '0.0.63.255' },
        { cidr: '128.64.32.19/23', expected: '0.0.1.255' }
    ];
    scenarios.forEach((s, i) => {
        const result = new CIDR(s.cidr).wildcardHosts;
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});

test('CIDR calculates the total number of hosts', t => {
    const scenarios = [
        { cidr: '0.0.0.0/9', expected: 8388608 },
        { cidr: '0.0.0.0/16', expected: 65536 },
        { cidr: '0.0.0.0/24', expected: 256 },
        { cidr: '128.64.32.19/18', expected: 16384 },
        { cidr: '128.64.32.19/23', expected: 512 }
    ];
    scenarios.forEach((s, i) => {
        const result = new CIDR(s.cidr).totalHosts;
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});
