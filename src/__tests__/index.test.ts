import assert from 'node:assert';

import { fileCollectionFromZip } from 'filelist-utils';

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
    expect((await getCoffee()).files).toHaveLength(197);
  });
  it('getZipped', async () => {
    const zipped = await getZipped();
    expect(zipped.files).toHaveLength(12);

    const aspirin = zipped.files.find((entry) =>
      entry.name.includes('aspirin-1h.zip'),
    );
    assert(aspirin);

    const data = await aspirin.arrayBuffer();
    expect(data).toHaveLength(59987);
  });
  it('getData', async () => {
    const buffer = await getData(filename);
    const fileCollection = await fileCollectionFromZip(buffer);
    expect(fileCollection.files).toHaveLength(18);
    expect(fileCollection.files.map((f) => f.name)).toContain('acqus');
  });
});
