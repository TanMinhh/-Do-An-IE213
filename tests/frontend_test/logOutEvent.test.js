describe('Logout Button', () => {
    it('should redirect to login page when clicked', () => {
        const dom = new JSDOM(`
        <button id="logoutBtn"></button>
        <script>
          document.getElementById('logoutBtn').addEventListener('click', () => {
            window.location.href = '/login';
          });
        </script>
      `, { runScripts: 'dangerously', url: 'http://localhost/' });

        const { window } = dom;
        const button = window.document.getElementById('logoutBtn');
        button.click();
        expect(window.location.href).to.include('/login');
    });
});
