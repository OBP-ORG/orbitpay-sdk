import { describe, expect, it } from 'vitest';
import * as sdk from './index';
import { OrbitPayClient } from './client';
import { PayrollStreamClient } from './payroll';
import { TreasuryClient } from './treasury';

function getServerUrl(client: OrbitPayClient): string {
  const server = client.getServer() as unknown as { serverURL: URL | string };
  return server.serverURL.toString();
}

describe('public exports', () => {
  it('exports the SDK client classes from the package entrypoint', () => {
    expect(sdk.OrbitPayClient).toBe(OrbitPayClient);
    expect(sdk.PayrollStreamClient).toBe(PayrollStreamClient);
    expect(sdk.TreasuryClient).toBe(TreasuryClient);
  });
});

describe('OrbitPayClient', () => {
  it('constructs with the Stellar testnet Horizon URL by default', () => {
    const client = new OrbitPayClient();

    expect(getServerUrl(client)).toBe('https://horizon-testnet.stellar.org/');
  });

  it('constructs with a custom Horizon server URL', () => {
    const client = new OrbitPayClient('https://horizon.example.test');

    expect(getServerUrl(client)).toBe('https://horizon.example.test/');
  });
});
