import test from 'ava';
import { cidrIsValid } from '../src/cidr-to-ips';

test('CIDR blocks should be in the correct format', t => {
    const scenarios = [
        { cidr: '255.255.255.0/24', expected: true },
        { cidr: '0.0.0.0/32', expected: true },
        { cidr: '0.0.0.0/33', expected: false },
        { cidr: '0.0.0/8', expected: false },
        { cidr: '257.0.0.0/8', expected: false }
    ];
    scenarios.forEach((s, i) => {
        const result = cidrIsValid(s.cidr);
        t.deepEqual({ result, i }, { result: s.expected, i });
    });
});

//