import { getCoffee, getZipped } from '..';

describe('bruker-data-test', () => {
  it('getCoffee', () => {
    expect(getCoffee()).toHaveLength(197);
  });
  it('getZipped', async () => {
    const zipped = getZipped();
    expect(zipped).toHaveLength(6);
    const aspirin = zipped.filter((entry) => entry.name.includes('aspirin'))[0];
    const data = await aspirin.arrayBuffer();
    expect(data).toHaveLength(59987);
  });
});
