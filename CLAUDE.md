# Code Analysis Instructions

## Explain Function Purpose

When asked to explain what a function or code block does:

1. **Read the surrounding context** - Use the Read tool to view the code with sufficient context (usually 20-30 lines before and after)

2. **Analyze the code** to understand:
   - What the function/code block does
   - What triggers it (event handlers, conditions)
   - What actions it performs
   - Any side effects or state changes

3. **Add a clear comment** above the code explaining its purpose in plain English

### Example Pattern:
- For event handlers: `// [Action] when [trigger condition]`
- For utility functions: `// [What it does] and returns [what]`
- For complex logic: `// [Main purpose], [key behaviors]`

### Common Requests:
- "Explain what this does"
- "Add a comment explaining this"
- "What does this function do"

### Response Format:
1. First read the code with context
2. Add a concise, clear comment
3. Keep explanation brief and focused on the "what" not the "how"