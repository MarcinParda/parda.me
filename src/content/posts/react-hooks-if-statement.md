---
title: Why you can’t use React hooks in if statements?
pubDate: 2024-04-13
tags: [react, react-hooks, under-the-hood]
---

## The Problem

Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class component. However, there are certain rules that you need to follow when using hooks. One of these rules is that you cannot use hooks inside an `if` statement.

## Explanation

The reason why you cannot use hooks inside an `if` statement is that hooks rely on the order in which they are called (the hook call chain). When you use a hook, React keeps track of the order in which the hooks are called and uses that information to manage the state and other resources associated with that hook.

## The Hook Call Chain

Let's take a look at an example of a simple functional component:

```jsx
function Component() {
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  function logTitle() {
    console.log(title);
  }
  function logDescription() {
    console.log(description);
  }
  useEffect(logTitle);
  useEffect(logDescription);
}
```

In this example, the hooks are called in the following order on every render:

1. `useState('Title')`
2. `useState('Description')`
3. `useEffect(logTitle)`
4. `useEffect(logDescription)`

React needs to call these hooks in that order every time. If you were to put one of the `useState` 

calls inside an `if` statement, it would break the chain order and could lead to bugs.

## Reasons Why the Hook Call Order Matters

1. **Preserving State Between Renders**: If the order of hooks changes between renders, React won't know how to match the state to the correct hook call, leading to bugs.
2. **Consistent Behavior**: Hooks must be called in the same order each time a component renders. This ensures the component's behavior is consistent and predictable.
3. **Enabling Optimizations**: The consistent hook call order allows React to optimize the component's performance. If the order changes, React loses the ability to make certain optimizations.
4. **Clarity of Code**: Calling hooks in a consistent order at the top level of the component makes the stateful logic of the component clear and easy to understand.

## Summary

That’s all. I hope you enjoyed this article. If you have any questions, feel free to ask them in the comments.

**Here’s an addon for you.** Brief summary of an article. You can use it to create fiches cards (e.g. in Anki).

### What is hook call chain?

The hook call chain refers to the order in which hooks are called within a functional component.

The hook call chain is important because hooks must be called in the same order on every render of a functional component. This is because hooks rely on the order in which they are called to maintain their internal state, performance and behavior.
