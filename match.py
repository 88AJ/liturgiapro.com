import re
with open('motor_nodos.js', 'r') as f:
    text = f.read()

def trace():
    stack = []
    lines = text.split('\n')
    for row, line in enumerate(lines[:380]):
        line = re.sub(r'//.*', '', line)
        line = re.sub(r'".*?"', '""', line)
        line = re.sub(r"'.*?'", "''", line)
        for col, char in enumerate(line):
            if char == '{':
                stack.append(row+1)
            elif char == '}':
                if stack:
                    opening = stack.pop()
                    if not stack:
                        print(f"ROOT block closed at line {row+1} (opened at {opening})")
                else:
                    print(f"Error: Unmatched closing brace at line {row+1}")
trace()
