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
                opened_row, opened_text = stack.pop()
                if opened_row == 3:
                     pass
                elif row+1 == 351:
                     print(f"Line 351 brace closes: {opened_row}: {opened_text}")
            else:
                pass
