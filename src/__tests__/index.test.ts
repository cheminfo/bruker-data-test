import { describe, expect, it } from 'vitest';

import {
  coffeeDirectory,
  zippedFiles,
  zippedFilesAsyncEntries,
  zippedFilesEntries,
} from '../index.ts';

describe('bruker-data-test', () => {
  const filename = 'aspirin-1h.zip';

  it('zippedFilesAsyncEntries', async () => {
    const relativePaths: string[] = [];

    for await (const file of zippedFilesAsyncEntries()) {
      relativePaths.push(file.relativePath);
    }

    expect(relativePaths).toContain(filename);
    expect(relativePaths).toHaveLength(12);
  });

  const nodeMajorVersion = Number.parseInt(
    process.versions.node.split('.')[0] ?? '0',
    10,
  );

  it.runIf(nodeMajorVersion >= 22)('zippedFilesEntries', async () => {
    const files = await zippedFilesEntries();
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

  it('zippedFiles should contain aspirin-1h.zip', async () => {
    const files = await zippedFiles();
    const aspirinFile = files.find((file) => file.name === filename);

    expect(aspirinFile).toBeDefined();
    await expect(aspirinFile?.buffer()).resolves.toHaveLength(59987);

    const buffers: Buffer[] = [];
    for await (const buffer of aspirinFile?.stream() ?? []) {
      buffers.push(buffer);
    }

    const sumSize = buffers.reduce((sum, buf) => sum + buf.length, 0);

    expect(sumSize).toBe(59987);
  });

  it('coffeeDirectory', () => {
    const path = coffeeDirectory();

    expect(path).toBeDefined();
    expect(path).toContain('data/flat/coffee');
  });
});
