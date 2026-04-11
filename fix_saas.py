import re

with open('saas.js', 'r') as f:
    code = f.read()

# Find the fetch chain
find_block = """        let liturgiaData = {};
        fetch('data/liturgia.json')
            .then(response => response.json())
            .then(data => {
                window.liturgiaData = data;
                liturgiaData = data;
                
                fetch('data/cantos.json')
                .then(r => r.json())
                .then(cData => {
                    window.cantosDB = cData;
                    
                    document.getElementById('generate-btn').addEventListener('click', () => {"""

replace_block = """        let liturgiaData = window.liturgiaData || {};
        
        document.getElementById('generate-btn').addEventListener('click', () => {"""

code = code.replace(find_block, replace_block)

# Remove the trailing catches
find_block2 = """                            }
                        }

                        let data = liturgiaData[fecha];"""

replace_block2 = """                            }
                        }

                        let data = liturgiaData[fecha];"""

code = code.replace("""                    })
                })
            })
            .catch(error => console.error('Error cargando liturgia.json:', error));""", """                    });""")

with open('saas.js', 'w') as f:
    f.write(code)

