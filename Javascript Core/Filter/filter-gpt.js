// function fylter(pool, options, conditions) {
//   // Set default options if not provided
//   options.criteria = options.criteria || "AND";
//   options.nullable = options.nullable || false;
//   options.flat = options.flat || false;
//   options.label = options.label || pool.map((_, i) => `POOL{${i}}`);

//   // Set default conditions if not provided
//   if (conditions.length === 0) {
//     conditions = pool
//       .slice(1)
//       .map(
//         (_, i) =>
//           `${options.label[0]}['id'] === ${options.label[i + 1]}['user']`
//       );
//   }

//   // Initialize output array
//   let output = [];

//   // Loop through first pool
//   for (let i = 0; i < pool[0].length; i++) {
//     let obj = {};
//     let matched = true;

//     // Loop through remaining pools
//     for (let j = 1; j < pool.length; j++) {
//       // Check if conditions are met
//       if (
//         !eval(
//           conditions[j - 1].replace(
//             /POOL(\d+)/g,
//             (match, p1) => `pool[${p1}][${i}]`
//           )
//         )
//       ) {
//         matched = false;
//         break;
//       }
//     }

//     // Add object to output if conditions are met
//     if (matched) {
//       // Add properties from each pool to object
//       for (let j = 0; j < pool.length; j++) {
//         obj[options.label[j]] = pool[j][i];
//       }

//       // Filter properties based on outputShape
//       if (options.outputShape.length > 0) {
//         for (let key in obj) {
//           if (!options.outputShape.includes(key)) {
//             delete obj[key];
//           }
//         }
//       }

//       // Convert null values to empty string if nullable is false
//       if (!options.nullable) {
//         for (let key in obj) {
//           if (obj[key] === null) {
//             obj[key] = "";
//           }
//         }
//       }

//       output.push(obj);
//     }
//   }

//   // Flatten object if flat is true
//   if (options.flat) {
//     output = output.map((obj) => {
//       let flatObj = {};
//       for (let key in obj) {
//         if (typeof obj[key] === "object" && obj[key] !== null) {
//           for (let subKey in obj[key]) {
//             flatObj[`${key}.${subKey}`] = obj[key][subKey];
//           }
//         } else {
//           flatObj[key] = obj[key];
//         }
//       }
//       return flatObj;
//     });
//   }

//   return output;
// }

function fylter2(pool, options, conditions) {
  const {
    criteria = "AND",
    nullable = false,
    outputShape = [],
    flat = false,
    label = [],
  } = options;
  const len = pool.length;

  const getShape = (item) => {
    const obj = {};
    for (const key in item) {
      obj[key] = nullable && item[key] == null ? null : "";
    }
    return obj;
  };

  const getPoolItem = (index) => {
    const obj = {};
    for (let i = 0; i < len; i++) {
      const key = label[i] || `POOL${i}`;
      obj[key] = pool[i][index] || getShape(outputShape[i]);
    }
    return obj;
  };

  const evalExpression = (index) => {
    const scope = {};
    for (let i = 0; i < len; i++) {
      const key = label[i] || `POOL${i}`;
      scope[key] = pool[i][index];
    }
    try {
      return eval(conditions[0]);
    } catch (e) {
      console.error(
        `Failed to evaluate condition "${conditions[0]}" for index ${index}`,
        e
      );
      return false;
    }
  };

  const results = [];
  for (let i = 0; i < pool[0].length; i++) {
    const item = getPoolItem(i);
    if (evalExpression(i)) {
      results.push(item);
    }
  }

  return flat
    ? results.map((r) => Object.assign({}, ...Object.values(r)))
    : results;
}

function fylter(pool, options, conditions) {
  // set default options
  options.criteria = options.criteria || "AND";
  options.nullable = options.nullable || false;
  options.flat = options.flat || false;
  options.label = options.label || [];

  // initialize output array
  var output = [];

  // loop through each object in the first array in the pool
  for (var i = 0; i < pool[0].length; i++) {
    var match = true;
    var obj = {};

    // evaluate the conditions for each object in the pool
    for (var j = 0; j < conditions.length; j++) {
      var expression = conditions[j];

      // replace POOL{n} with the corresponding label
      for (var k = 0; k < options.label.length; k++) {
        var label = options.label[k];
        expression = expression.replace(new RegExp("POOL" + k, "g"), label);
      }

      console.log(expression, "Exprassion");

      // evaluate the expression with the current object in each pool
      try {
        var result = eval(expression);
      } catch (e) {
        console.error("Invalid condition: " + expression);
        return;
      }

      // apply the criteria to the result
      if (options.criteria === "AND") {
        match = match && result;
      } else if (options.criteria === "OR") {
        match = match || result;
      } else if (options.criteria === "XOR") {
        match = match ^ result;
      } else if (options.criteria === "NOT") {
        match = !result;
      }
    }

    // add the matching objects to the output
    if (match) {
      for (var k = 0; k < pool.length; k++) {
        var label = options.label[k] || "POOL" + k;
        obj[label] = {};

        for (var key in pool[k][i]) {
          var value = pool[k][i][key];

          // convert null values to empty strings if nullable is false
          if (!options.nullable && value === null) {
            value = "";
          }

          obj[label][key] = value;
        }
      }

      // flatten the output if flat is true
      if (options.flat) {
        var flattenedObj = {};
        for (var key in obj) {
          for (var subKey in obj[key]) {
            flattenedObj[subKey] = obj[key][subKey];
          }
        }
        output.push(flattenedObj);
      } else {
        output.push(obj);
      }
    }
  }

  return output;
}

function mergeData(users, comments, replies) {
  return users.map((user) => {
    const userComments = comments.filter(
      (comment) => comment.userId === user.id
    );
    const userReplies = replies.filter((reply) => reply.user_id === user.id);
    return {
      ...user,
      comments: userComments,
      replies: userReplies,
    };
  });
}

function mergeData2(...data) {
  const [users, ...restData] = data;

  const mergedData = users.map((user) => {
    const filteredData = restData.map((arr) =>
      arr.filter((item) => item.userId === user.id || item.user_id === user.id)
    );
    const mergedObj = Object.assign({}, ...filteredData);
    return {
      ...user,
      ...mergedObj,
    };
  });

  return mergedData;
}

const objectLookup = (
  propsStr,
  conditions,
  arr,
  options = { criteria: "AND" }
) => {
  // Split the properties string into an array.
  const propsArr = propsStr.split(",").map((prop) => prop.trim());

  // Filter the array based on the search criteria.
  const result = arr.filter((obj) => {
    const conditionsMet = Object.keys(conditions).every((key) => {
      const condition = conditions[key];
      const value = obj[key];

      // If the condition is not valid, assume it's true.
      if (!condition) {
        return true;
      }

      // Evaluate the condition using eval().
      // We use a try-catch block to handle any errors that might occur.
      try {
        return eval(condition);
      } catch (err) {
        console.error(`Invalid condition: ${condition}`);
        return true;
      }
    });

    // Combine the conditions using the criteria specified in options.
    switch (options.criteria) {
      case "OR":
        return conditionsMet;
      case "XOR":
        return conditionsMet ? !result : result;
      case "NOT":
        return !conditionsMet;
      default:
        return conditionsMet;
    }
  });

  // Map the results to contain only the specified properties.
  const mappedResult = result.map((obj) => {
    const newObj = {};
    propsArr.forEach((prop) => {
      newObj[prop] = obj[prop] ?? null;
    });
    return newObj;
  });

  return mappedResult;
};
/**

  Filters an array of objects based on conditions, and returns a new array of objects with the desired properties
  @param {string} properties - A string of object properties separated with a comma. E.g "name, id, phone"
  @param {array} conditions - An array of conditions to filter objects by. E.g ["name === 'Nathaniel'", "parseInt(age) > 18"]
  @param {array} objects - An array of objects to filter
  @param {object} options - An object with options to modify filter criteria. The criteria property can be one of OR, AND, XOR, NOT.
  @returns {array} - An array of objects with the desired properties that pass the specified conditions
  */

function filterObjects(properties, conditions, objects, options) {
  // Split the properties string into an array of individual property names
  const props = properties.split(",").map((prop) => prop.trim());

  // Apply the conditions and filter the objects array
  const filteredObjects = objects.filter((object) => {
    let match = [];
    // Evaluate each condition against the current object
    conditions.forEach((condition) => {
      condition = condition?.replaceAll("$", "object");
      if (eval(condition)) {
        match = [...match, true];
      } else {
        match = [...match, false];
      }
    });

    if (options.criteria === "AND") {
      return match.every((match) => match === true);
    }

    if (options.criteria === "OR") {
      return match.some((match) => match === true);
    }

    if (options.criteria === "XOR") {
      if (
        match.every((match) => match === true) ||
        match.every((match) => match === false)
      ) {
        return false;
      }
      return true;
    }

    if (options.criteria === "NOT") {
      if (match.every((match) => match === true)) {
        return false;
      } else if (match.every((match) => match === false)) {
        return true;
      }
      return false;
    }

    // Return false otherwise
    return false;
  });

  // Map the filtered objects to a new array with only the desired properties
  const result = filteredObjects.map((object) => {
    const newObj = {};
    props.forEach((prop) => {
      newObj[prop] = object[prop] || null;
    });
    return newObj;
  });

  return result;
}

function filterObjects2(objects, properties, conditions, options = {}) {
  const criteria = options.criteria || "AND";
  const filteredObjects = objects.filter((obj) => {
    const matchesCondition = conditions.some((condition) => {
      return eval(condition.replace(/(\w+)/g, "obj.$1"));
    });
    return criteria === "OR" ? matchesCondition : !matchesCondition;
  });
  return filteredObjects.map((obj) => {
    const newObj = {};
    properties.split(",").forEach((prop) => {
      newObj[prop] = obj[prop] || null;
    });
    return newObj;
  });
}

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
  { id: 1, user_id: 3, comment_text: "This is a great article!" },
  { id: 2, user_id: 1, comment_text: "I disagree with the author's points." },
  { id: 3, user_id: 6, comment_text: "Thanks for sharing your insights!" },
  { id: 4, user_id: 4, comment_text: "I found this article really helpful." },
  { id: 5, user_id: 2, comment_text: "I think you missed an important point." },
  { id: 6, user_id: 7, comment_text: "Great article. Keep up the good work!" },
  { id: 7, user_id: 5, comment_text: "I'm not sure I completely agree." },
  { id: 8, user_id: 9, comment_text: "Thanks for the useful information." },
  { id: 9, user_id: 8, comment_text: "Always better" },
];

const location2 = [{ id: 1, user_id: 3, location: "Tema" }];

const pool = [users, comments, replies];
const options = {
  criteria: "AND",
  nullable: true,
  flat: false,
  label: ["users", "comments", "replies"],
};
const conditions = [
  "(users['id'] === comments['userId']) && (users['id'] === replies['user_id']) && (comments['userId'] === replies['user_id'])",
];
// const merged = mergeData2(users, comments, replies, location2);

const final = filterObjects(
  "comment_text, id",
  ["$['id'] === 1", "$['comment_text'].includes('really')"],
  replies,
  { criteria: "NOT" }
);
// const final = filterObjects2(replies, 'comment_text', ["id === 1"], { criteria: 'AND' })

console.log(final, "Final Pool");
