import os

# Define the directory structure
project_structure = {
    'askqubits': {
        'backend': {
            'scraping': {
                'ai-tradebot.js': '',
            },
            'quantum': {
                'qmc.py': '',
                'ae.py': '',
                'qaoa.py': '',
            },
            'portfolio-generator.js': '',
            'server.js': '',
        },
        'frontend': {
            'public': {
                'index.html': '',
                'qubit-animation.gif': '',  # Placeholder for actual image
                'noise.png': '',            # Placeholder for actual image
            },
            'src': {
                'components': {
                    'QubitAnimation.jsx': '',
                    'ManimVisualizer.jsx': '',
                    'ui': {
                        'Button.jsx': '',
                        'Input.jsx': '',
                        'Card.jsx': '',
                    },
                },
                'HomePage.jsx': '',
                'App.jsx': '',
                'index.js': '',
            },
            'styles': {
                'globals.css': '',
            },
        },
        'manim': {
            'portfolio_visualization.py': '',
            'generateVisualization.js': '',
            'outputs': {},
        },
        'package.json': '',
        'README.md': '',
    }
}

def create_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            # It's a directory
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            # It's a file
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

def main():
    base_path = os.getcwd()  # Get current working directory
    create_structure(base_path, project_structure)
    print("Project directory structure created successfully.")

if __name__ == '__main__':
    main()
