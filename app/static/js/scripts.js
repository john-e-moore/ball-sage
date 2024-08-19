document.addEventListener("DOMContentLoaded", function() {
    const toggleNLButton = document.getElementById('toggle-nl-query');
    const nlQueryDiv = document.getElementById('nl-query');
    const toggleSQLButton = document.getElementById('toggle-sql');
    const sqlQueryDiv = document.getElementById('sql-query');

    toggleNLButton.addEventListener('click', function() {
        if (nlQueryDiv.style.display === 'none') {
            nlQueryDiv.style.display = 'block';
            toggleNLButton.textContent = 'Hide Natural Language Query';
        } else {
            nlQueryDiv.style.display = 'none';
            toggleNLButton.textContent = 'Show Natural Language Query';
        }
    });

    toggleSQLButton.addEventListener('click', function() {
        if (sqlQueryDiv.style.display === 'none') {
            sqlQueryDiv.style.display = 'block';
            toggleSQLButton.textContent = 'Hide SQL Query';
        } else {
            sqlQueryDiv.style.display = 'none';
            toggleSQLButton.textContent = 'Show SQL Query';
        }
    });
});
