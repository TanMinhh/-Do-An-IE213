const { JSDOM } = require('jsdom');
const { expect } = require('chai');

describe('Login Form', () => {
  it('should show error message when login fails', () => {
    const dom = new JSDOM(`
      <form id="loginForm">
        <input id="username" />
        <input id="password" />
        <div id="errorMsg"></div>
      </form>
      <script>
        function showError(msg) {
          document.getElementById('errorMsg').textContent = msg;
        }
      </script>
    `, { runScripts: "dangerously" });

    const { window } = dom;
    window.showError('Sai thông tin đăng nhập');
    const errorMsg = window.document.getElementById('errorMsg').textContent;
    expect(errorMsg).to.equal('Sai thông tin đăng nhập');
  });
});
