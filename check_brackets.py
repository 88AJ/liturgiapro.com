with open("saas.js", "r") as f:
    text = f.read()

lines = text.split("\n")
stack = []
for i, line in enumerate(lines):
    # Remove strings and regex to avoid false positives!
    import re
    line = re.sub(r'".*?(?<!\\)"', '""', line)
    line = re.sub(r"'.*?(?<!\\)'", "''", line)
    line = re.sub(r"`.*?`", "``", line)
    line = re.sub(r"//.*", "", line) # remove comments
    for char in line:
        if char == '{':
            stack.append(i + 1)
        elif char == '}':
            if stack:
                stack.pop()
            else:
                print(f"Extra closing brace at line {i + 1}")

print("Unclosed braces opened at lines:", stack)
