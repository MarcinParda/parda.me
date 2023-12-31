---
title: How to avoid passing multiple props to components using component composition in React?
pubDate: 2023-03-26
tags: [react, component-composition, design-patterns]
---

## Problem

Imagine that you have to implement a simple panel in your application that displays information to the user about a successful action. All you have to do is pass a few props to the component responsible for displaying this panel. Everything suggests that you can do it in 5 minutes.

You start working on it, but when you begin to implement this component, you realize that you need to pass a few props related to how the panel header looks.

Then you notice that you need to pass several props related to how the content looks in this panel.

Later on, you notice that you need to pass props responsible for how the collapsing and closing buttons of the panel look and whether to show them at all.

And so on.

As a result, our "little" monster looks like this:

```tsx
<Panel
  headerTitle="Panel title"
  headerIcon="icon"
  headerIconColor="red"
  headerTextColor="white"
  headerButtonCloseColor="white"
  headerButtonCloseVisible={true}
  headerButtonCloseOnClick={() => {}}
  headerButtonCollapseColor="white"
  headerButtonCollapseVisible={true}
  headerButtonCollapseOnClick={() => {}}
  contentBackgroundColor="white"
  contentTextColor="black"
  contentText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nunc
  tortor aliquam nisl, eget ultricies lorem ipsum vitae nunc. Donec auctor, nisl eget ultricies ultricies, nunc tortor aliquam
  nisl, eget ultricies lorem ipsum vitae nunc."
  contentButtonColor="blue"
  ...
/>
```

Once you have implemented your component, it's time to move on to the next component to be implemented, which will be a panel displaying an action error to the user. At this point, you have two options:

1. Implement a new component in the same way as the previous one, but with a slightly different appearance and name.
2. Add props to the `Panel` component that will be responsible for displaying the error. As a result, the number of props may even double 😳

...or you can learn about **component composition** & **compound components** and implement your component in such a way that you don't have to pass dozens of props to it. In this article we will talk about the first option.

## Solution

### Component composition

Let's start with the **component composition** technique. It is a technique that allows you to create more complex components by composing smaller, logical sub-components.

You may be familiar with the HTML `<table>` tag. Inside this tag, you can place `<tr>` and `<td>` tags, which are responsible for displaying rows and columns in a table.
All these tags are related to each other, and their common parent is the `<table>` tag. In this way, you can create more complex components by composing smaller, logical sub-components.

In a similar way, you can create more complex components in React by composing smaller, logical sub-components.
If you have used the [Material UI](https://material-ui.com/), library, you must be familiar with components such as `Button`, `TextField` or `Select`.

Their usage might look like this:

```tsx
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={age}
  label="Age"
  onChange={handleChange}
>
  <MenuItem value={10}>Ten</MenuItem>
  <MenuItem value={20}>Twenty</MenuItem>
  <MenuItem value={30}>Thirty</MenuItem>
</Select>
```

As you can see in the above example, `Select` takes its children in the form of several `MenuItem`s, instead of passing these elements in props.
Thanks to this, these elements can be modified independently of the `Select` component. But how can we implement our `Panel` in such a way?

### Component composition implementation

1. Let's first define the interface for our (slightly simplified) component `Panel`:

```tsx
// Panel.tsx
interface PanelProps {
  title: string;
}

// types.ts
interface ParentProps {
  children: React.ReactNode;
}
```

2. Next, let's define the `Panel` component:

```tsx
// Panel.tsx
export const Panel = ({ title, children }: PanelProps & ParentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

3. Now let's define the `PanelHeader` and `PanelBody` components:

```tsx
// PanelHeader.tsx
export const PanelHeader = ({ children }: ParentProps) => {
  return <header>{children}</header>;
};

// PanelBody.tsx
export const PanelBody = ({ children }: ParentProps) => {
  return <main>{children}</main>;
};
```

4. The whole thing will look like this:

```tsx
// Panel.tsx
import { ParentProps } from "./types";

interface PanelProps {
  title: string;
}

export const Panel = ({ title, children }: PanelProps & ParentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

```tsx
// PanelHeader.tsx
import { ParentProps } from "./types";
export const PanelHeader = ({ children }: ParentProps) => {
  return <header>{children}</header>;
};
```

```tsx
// PanelBody.tsx
import { ParentProps } from "./types";
export const PanelBody = ({ children }: ParentProps) => {
  return <main>{children}</main>;
};
```

This allows us to use these components as follows:

```tsx
<Panel title="Panel">
  <PanelHeader>
    <h3>Header</h3>
  </PanelHeader>
  <PanelBody>
    <p>Body</p>
  </PanelBody>
</Panel>
```

By doing so, we have achieved several things:

- `PanelHeader` and `PanelBody` are descendant components of `Panel`, we can easily modify them without modifying `Panel`, avoiding **props drilling**.
- We have removed from `Panel` the responsibility of rendering `PanelHeader` and `PanelBody`. If either of these components had its own state, rendering it would not re-render the large `Panel` component.
- We have easily obtained the ability to modify the `Panel` component. Nothing prevents us from swapping `PanelHeader` and `PanelBody` in place or removing one of them.

But we also added a few problems:

- We added a new layer of abstraction that you need to remember and know exists. It would also be useful to document it.
- We don't know exactly what components we should use in `Panel` if we want the whole component to look consistent and work properly. It would be useful to have some kind of syntax prompt that would tell us what we should use in `Panel`, right? :)
- If we wanted components to be able to communicate with each other, e.g. when we clicked a button in `PanelHeader` we wanted to hide the whole `Panel` component, then we would have to pass additional props to the components (`handleClick`, `isPanelVisible`).

The solution to the last two (and partially the first) problems is to use **compund components** with the **Context API**.

In the next article, I will describe how to do this.

## Summary

That's all. I hope you enjoyed this article. If you have any questions, feel free to ask them in the comments.

**Here's an addon for you.** Brief summary of an article. You can use it to create fiches cards (e.g. in Anki).

### What is component composition?

**Component composition** is a technique that allows you to create more complex components by composing smaller, logical sub-components.

Example:

```tsx
<Panel title="Panel">
  <PanelHeader>
    <h3>Header</h3>
  </PanelHeader>
  <PanelBody>
    <p>Body</p>
  </PanelBody>
</Panel>
```
