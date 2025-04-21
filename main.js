  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          // Remove active class from all buttons and contents
          tabBtns.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          btn.classList.add('active');
          const tabId = btn.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });
  
  // Code execution function
  function runCode(codeId) {
      const code = document.getElementById(codeId).textContent;
      const outputDiv = document.getElementById(codeId.replace('-code', '-output'));
      
      try {
          // Clear previous output
          outputDiv.innerHTML = '';
          
          // Capture console.log output
          const originalConsoleLog = console.log;
          let logs = [];
          
          console.log = function() {
              logs.push(Array.from(arguments).join(' '));
              originalConsoleLog.apply(console, arguments);
          };
          
          // Execute the code
          const result = eval(code);
          
          // Restore original console.log
          console.log = originalConsoleLog;
          
          // Display the output
          if (logs.length > 0) {
              outputDiv.innerHTML = logs.join('<br>');
          } else if (result !== undefined) {
              outputDiv.innerHTML = result;
          } else {
              outputDiv.innerHTML = 'Code executed successfully (no output)';
          }
          
          // Special handling for DOM example
          if (codeId === 'dom-code') {
              const demoElement = document.getElementById('demo');
              if (demoElement) {
                  outputDiv.innerHTML += '<br><br>Resulting element:<br>';
                  outputDiv.innerHTML += demoElement.outerHTML;
              }
          }
      } catch (error) {
          outputDiv.innerHTML = `Error: ${error.message}`;
      }
  }

 