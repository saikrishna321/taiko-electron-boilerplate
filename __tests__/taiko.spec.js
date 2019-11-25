const electron = require('electron');
const kill = require('tree-kill');
const tk = require('taiko');
const { spawn } = require('child_process');

const port = 9200; // Debugging port
const timeout = 20000; // Timeout in miliseconds
let pid;

jest.setTimeout(timeout);

beforeEach(async () => {

  // Start Electron with custom debugging port
  pid = spawn(electron, ['.', `--remote-debugging-port=${port}`], {
    shell: true
  }).pid;
  await tk.openBrowser({ headless: false, host: 'localhost', port });
});

afterEach(async () => {
  try {
    await tk.closeBrowser();
  } catch (error) {
    kill(pid);
  }
});

  test('Text matches', async () => {
    const isText = await tk.text('Demo of Electron Taiko.').exists();
    expect(isText).toBe(true);
    });
