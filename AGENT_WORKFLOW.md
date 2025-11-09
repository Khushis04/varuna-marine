# AI Agent Workflow Log

## Agents Used
I used two main AI tools throughout this project:

1. GitHub Copilot  
   I used this for quick in-editor suggestions and autocomplete. It helped with React components, TypeScript typing hints, and small SQL snippets.

2. ChatGPT  
   I used ChatGPT for larger tasks like generating boilerplate code, explaining architecture patterns, debugging runtime errors, and fixing TypeScript issues. It was the main tool for planning and logic-heavy debugging.

## Prompts and Outputs

### Example 1: Generating backend boilerplate
Prompt:  
"Give me a clean hexagonal backend structure for FuelEU with controllers, usecases, ports, routes, compliance logic, banking logic and pooling logic based on the context i have given."

Output:  
ChatGPT generated a full backend folder layout with controller/use-case/port/repository stubs that followed the hexagonal pattern. I added the real logic afterward.

### Example 2: Fixing ComputeCB returning null
Prompt:  
"why am I getting cb null? here is my ComputeCB class and route logs"

Output:  
ChatGPT walked through the calculations, asked me to log fuel and intensity values, and helped identify that the fields were strings and needed numeric conversion. After logging, I fixed the logic.

### Example 3: Removing any types in frontend
Prompt:  
"help me remove all remaining 'any' types from the frontend so eslint passes"

Output:  
ChatGPT helped rewrite the API types and component states to use proper interfaces so linting would pass with strict mode on.

## Validation and Corrections

I validated AI-generated output in several ways:

1. Running the backend after every change to check for runtime errors.
2. Querying the PostgreSQL database directly using docker exec + psql.
3. Adding debug logs(especially in computeCB) to verify assumptions when ChatGPT produced incorrect code.
4. Running eslint with strict rules to enforce clean TypeScript.
5. Manually reviewing all generated files to remove hallucinated imports or wrong field names.
6. Testing all API endpoints in a test.http file before wiring up the frontend.

Whenever something didn’t work, I added console.log statements or SQL queries and corrected the code manually.

## Observations

### Where the agent helped
- Fast generation of React screens and backend controllers.
- Speeding up boilerplate code and repetitive patterns.
- Good at structuring the hexagonal architecture.
- Helpful when debugging complicated errors with routes, CB calculations, or TypeScript types.
- Saved time by pointing out incorrect assumptions and mismatched types.

### Where the agent failed or hallucinated
- Sometimes created functions that didn’t exist in the actual repo.
- Generated wrong import paths.
- Mixed naming conventions halfway through files.
- Added schema fields that weren’t part of my database.
- Sometimes gave endpoints missing required parameters.

### How I combined tools effectively
- I used Copilot for small edits and inline completionse.
- I used ChatGPT for deep reasoning, designing architecture, debugging complex issues and generating basic boilerplate.
- I kept a mental checklist of what ChatGPT generated vs what needed manual verification.
- I tested everything in small steps—never trusting a full AI-generated file without checking.

## Best Practices Followed
- Used ChatGPT for long-form guidance and Copilot for inline coding.
- Ran eslint regularly to keep the repo clean.
- Added strict TypeScript types to avoid implicit any problems.
- Used docker logs and psql queries to verify backend correctness.
- Tested each endpoint before hooking it into the frontend.
- Manually validated all AI-generated code before committing.
