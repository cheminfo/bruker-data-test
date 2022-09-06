import { fileListFromZip } from 'filelist-utils';

import { getCoffee, getData, getFile, getList, getZipped } from '..';

describe('bruker-data-test', () => {
  const filename = 'aspirin-1h.zip';
  it('getList', async () => {
    const list = await getList();
    expect(list).toContain(filename);
  });
  it('check getFile', async () => {
    const file = await getFile(filename);
    expect(file.name).toBe(filename);
  });
  it('getCoffee', async () => {
    expect(await getCoffee()).toHaveLength(197);
  });
  it('getZipped', async () => {
    const zipped = await getZipped();
    expect(zipped).toHaveLength(6);
    const aspirin = zipped.filter((entry) => entry.name.includes('aspirin'))[0];
    const data = await aspirin.arrayBuffer();
    expect(data).toHaveLength(59987);
  });
  it('getData', async () => {
    const buffer = await getData(filename);
    const fileList = await fileListFromZip(buffer);
    expect(fileList).toHaveLength(18);
    expect(fileList.map((f) => f.name)).toContain('acqus');
  });
});
