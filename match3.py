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
            stack.append(row+1)
        elif char == '}':
            if stack:
                opening = stack.pop()
                if opening == 3:
                     print(f"FUNCTION FROM LINE 3 CLOSED AT LINE {row+1}")
            else:
                pass
