import { assert, describe, expect, it } from 'vitest';

import { coffee, zipped } from '../index.ts';

describe('bruker-data-test zipped', () => {
  const filename = 'aspirin-1h.zip';

  it('filesAsyncValues', async () => {
    const relativePaths: string[] = [];

    for await (const file of zipped.filesAsyncValues()) {
      relativePaths.push(file.relativePath);
    }

    expect(relativePaths).toContain(filename);
    expect(relativePaths).toHaveLength(12);
  });

  const nodeMajorVersion = Number.parseInt(
    process.versions.node.split('.')[0] ?? '0',
    10,
  );

  it.runIf(nodeMajorVersion >= 22)('filesValues cyclosporin', async () => {
    const files = await zipped.filesValues();
    const cyclosporinFiles = files
      .map((file) => file.name)
      .filter((name) => name.includes('cyclosporin'))
      .toArray()
      .sort();

    expect(cyclosporinFiles).toStrictEqual([
      'cyclosporin_1h.zip',
      'cyclosporin_cosy.zip',
      'cyclosporin_hmbc.zip',
      'cyclosporin_hsqc.zip',
    ]);
  });

  it('zipped files should contain aspirin-1h.zip', async () => {
    const files = await zipped.files();
    const aspirinFile = files.find((file) => file.name === filename);

    assert(aspirinFile);

    await expect(aspirinFile.buffer()).resolves.toHaveLength(59987);

    const buffers: Buffer[] = [];
    for await (const buffer of aspirinFile.stream()) {
      buffers.push(buffer);
    }

    const sumSize = buffers.reduce((sum, buf) => sum + buf.length, 0);

    expect(sumSize).toBe(59987);
  });

  it('coffee root', () => {
    const path = coffee.root;

    expect(path).toBeDefined();
    expect(path).toMatch(/\/data\/flat\/coffee$/);
  });
});
