<h1>MERN Workshop</h1>

<p>MERN Workshop is a blog post project made by MongoDB, Express, React and Node.js.</p>

<h2>IntelliSense</h2>

<p>If Intellisense isn't working, follow these methods.</p>
<p>1. add a <strong>jsconfig.json</strong> at the root of your workspace.</p>
<p>2. Copy and paste these commands in the file <strong>jsconfig.json</strong>.</p>

```javascript
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```