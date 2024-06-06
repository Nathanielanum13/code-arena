const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Samantha Lee" },
  { id: 5, name: "Alex Chen" },
  { id: 6, name: "Emily Wang" },
  { id: 7, name: "William Wu" },
  { id: 8, name: "Grace Li" },
  { id: 9, name: "Michael Zhang" },
  { id: 10, name: "Lucy Liu" },
];

// Comments array
const comments = [
  { id: 1, userId: 2, content: "Great job!" },
  { id: 2, userId: 3, content: "I agree!" },
  { id: 3, userId: 5, content: "This is really helpful." },
  { id: 4, userId: 1, content: "Thanks for sharing." },
  { id: 5, userId: 1, content: "Well done!" },
  { id: 6, userId: 7, content: "This is awesome." },
  { id: 7, userId: 9, content: "I learned a lot." },
  { id: 8, userId: 10, content: "Keep up the good work." },
  { id: 9, userId: 6, content: "This is amazing." },
  { id: 10, userId: 8, content: "I really enjoyed this." },
];

const replies = [
  { id: 1, user_id: 1, comment_text: "This is a great article!" },
  { id: 2, user_id: 1, comment_text: "I disagree with the author's points." },
  { id: 3, user_id: 1, comment_text: "Thanks for sharing your insights!" },
  { id: 4, user_id: 1, comment_text: "I found this article really helpful." },
  { id: 5, user_id: 1, comment_text: "I think you missed an important point." },
  { id: 6, user_id: 1, comment_text: "Great article. Keep up the good work!" },
  { id: 7, user_id: 1, comment_text: "I'm not sure I completely agree." },
  { id: 8, user_id: 1, comment_text: "Thanks for the useful information." },
  { id: 9, user_id: 1, comment_text: "Always better" },
];

const pool = [
  {
    label: "user",
    data: users,
  },
  {
    label: "comments",
    data: comments,
  },
  {
    label: "replies",
    data: replies,
  },
];

const condition = ["user?.id === comment?.userId"];

const output = [
  {
    user: { id: 1, name: "John Doe" },
    comment: [
      { id: 4, userId: 1, content: "Thanks for sharing." },
      { id: 5, userId: 1, content: "Well done!" },
    ],
  },
  {
    user: { id: 2, name: "Jane Smith" },
    comment: [{ id: 1, userId: 2, content: "Great job!" }],
  },
  {
    user: { id: 3, name: "Bob Johnson" },
    comment: [{ id: 2, userId: 3, content: "I agree!" }],
  },
  {
    user: { id: 4, name: "Samantha Lee" },
    comment: [],
  },
  {
    user: { id: 5, name: "Alex Chen" },
    comment: [{ id: 3, userId: 5, content: "This is really helpful." }],
  },
  {
    user: { id: 6, name: "Emily Wang" },
    comment: [{ id: 9, userId: 6, content: "This is amazing." }],
  },
  {
    user: { id: 7, name: "William Wu" },
    comment: [{ id: 6, userId: 7, content: "This is awesome." }],
  },
  {
    user: { id: 8, name: "Grace Li" },
    comment: [],
  },
  {
    user: { id: 9, name: "Michael Zhang" },
    comment: [{ id: 7, userId: 9, content: "I learned a lot." }],
  },
  {
    user: { id: 10, name: "Lucy Liu" },
    comment: [{ id: 8, userId: 10, content: "Keep up the good work." }],
  },
];

function joinData(pool, condition) {
  const [leftLabel, leftData] =
    pool[0].label < pool[1].label
      ? [pool[0].label, pool[0].data]
      : [pool[1].label, pool[1].data];
  const [rightLabel, rightData] =
    pool[0].label < pool[1].label
      ? [pool[1].label, pool[1].data]
      : [pool[0].label, pool[0].data];

  return leftData.reduce((acc, leftItem) => {
    const matchedRightItems = rightData.filter((rightItem) => {
      const evalStr = condition[0]
        .replaceAll(leftLabel, "leftItem")
        .replaceAll(rightLabel, "rightItem");
      return eval(evalStr);
    });

    const outputItem = {
      [leftLabel]: leftItem,
      [rightLabel]: matchedRightItems,
    };

    acc.push(outputItem);
    return acc;
  }, []);
}

function filterData(pool = [], condition) {
  const result = [];

  const labels = pool.map((item) => item?.label);
  const [master, ...slaves] = pool.map((item) => item?.data);

  const output = master.map((data) => {
    let out = { ...data };
    let targets = [];

    slaves?.forEach((slave) => {
      targets = [
        ...targets,
        slave.filter((item) => {
            let formattedCondition = condition.replaceAll(`$1`, 'data').replaceAll(`$2`, 'item')
            return eval(formattedCondition)
        }),
      ];
    });

    targets.forEach((target, index) => {
      out[`${labels[index + 1]}`] = target;
    });
    return out;
  });

  return output;
}

const condition1 = "$1?.id === $2?.userId";

const output1 = filterData(pool, condition1);

const output2 = filterData([
    {
        label: 'user',
        data: output1 
    },
    {
        label: 'replies',
        data: replies
    }
], "$1?.id === $2?.user_id")
console.log(output2);
