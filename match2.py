import re
with open('motor_nodos.js', 'r') as f:
    text = f.read()

stack = []
lines = text.split('\n')
for row, line in enumerate(lines[:380]):
    clean = re.sub(r'//.*', '', line)
    clean = re.sub(r'".*?"', '""', clean)
    clean = re.sub(r"'.*?'", "''", clean)
    for col, char in enumerate(clean):
        if char == '{':
            stack.append((row+1, line.strip()))
        elif char == '}':
            if stack:
                stack.pop()
            else:
                print(f"EXTRA CLOSING BRACE AT LINE {row+1}: {line}")

if stack:
    for row, line in stack:
        print(f"UNCLOSED OPENING BRACE AT LINE {row}: {line}")
