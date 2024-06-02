# 74 - Jira

<div class="note" label="Questions">

- What tickets are in our current sprint?

</div>

## Accounts
```js
const jira = FileAttachment("data/jira/issues-in-current-sprint.json").json();
```

```js
display(jira)
```

```js
display(Object.keys(jira.issues[0].fields).sort().filter((f)=> !f.startsWith("customfield")))
```

```js
display(jira.issues[3].fields.summary)
```

<div class="tip" label="FYI">
Generally Jira and Confluence are more useful together for reporting on Jira issues.

The ability to use Jira with these notebooks is better demonstrated when combined with other systems.
</div>
